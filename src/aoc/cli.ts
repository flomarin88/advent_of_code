import { spawnSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { pathToFileURL } from 'url'
import { fetchInput, fetchPuzzle, postAnswer } from './client'
import { DEFAULT_YEAR, paths, unlockTime } from './config'
import { parsePuzzle, parseSubmit, Puzzle } from './html'
import { Answer, readInput } from './input'
import { DayState, loadState, Part, rejectReason, saveState } from './state'
import { exampleTest, PART2_MARKER, solutionFile, testFile } from './templates'

interface Args {
  command: string
  year: number
  day?: number
  part?: Part
  force: boolean
}

function parseArgs(argv: string[]): Args {
  const [command = 'help', ...rest] = argv
  const args: Args = { command, year: DEFAULT_YEAR, force: false }
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i]
    if (arg === '--force') args.force = true
    else if (arg === '--year') args.year = Number(rest[++i])
    else if (/^a$/i.test(arg)) args.part = 1
    else if (/^b$/i.test(arg)) args.part = 2
    else if (/^\d+$/.test(arg)) args.day = Number(arg)
    else throw new Error(`argument inconnu : ${arg}`)
  }
  return args
}

/** Par défaut : le dernier jour qui a déjà un fichier de solution. */
function resolveDay(args: Args): number {
  if (args.day !== undefined) return args.day
  const dir = `src/${args.year}`
  const days = existsSync(dir)
    ? readdirSync(dir)
        .map((f) => f.match(/^day(\d+)\.ts$/)?.[1])
        .filter((d): d is string => d !== undefined)
        .map(Number)
    : []
  if (days.length === 0) throw new Error('précise le jour, ex. : pnpm new 1')
  return Math.max(...days)
}

function write(file: string, content: string): void {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

async function waitForUnlock(year: number, day: number): Promise<void> {
  const unlock = unlockTime(year, day).getTime() + 1000
  if (Date.now() >= unlock) return
  while (Date.now() < unlock) {
    const s = Math.ceil((unlock - Date.now()) / 1000)
    const hms = new Date(s * 1000).toISOString().slice(11, 19)
    process.stdout.write(`\r⏳ day ${day} se débloque dans ${hms} `)
    await new Promise((r) => setTimeout(r, Math.min(1000, unlock - Date.now())))
  }
  process.stdout.write('\r\x1b[K')
}

function syncSolved(state: DayState, puzzle: Puzzle): void {
  puzzle.solved.forEach((answer, i) => {
    state.parts[(i + 1) as Part].correct = answer
  })
}

async function loadPuzzle(year: number, day: number): Promise<Puzzle> {
  const puzzle = parsePuzzle(await fetchPuzzle(year, day))
  const state = loadState(year, day)
  syncSolved(state, puzzle)
  saveState(year, day, state)
  return puzzle
}

function addPart2(year: number, day: number, puzzle: Puzzle): void {
  const file = paths.test(year, day)
  const part2 = puzzle.parts[1]
  if (!part2) {
    throw new Error('la partie 2 n’est pas encore visible : valide la partie 1')
  }
  const content = readFileSync(file, 'utf8')
  if (content.includes("'part 2 example'")) {
    console.log(`ℹ️  ${file} contient déjà l'exemple de la partie 2`)
    return
  }
  const snippet = exampleTest(
    2,
    part2.example ?? puzzle.parts[0].example,
    part2.expected,
  )
  const lines = content.split('\n')
  const at = lines.findIndex((l) => l.includes(PART2_MARKER))
  if (at === -1) {
    console.log(`⚠️  marqueur ${PART2_MARKER} introuvable, à coller :\n${snippet}`)
    return
  }
  lines.splice(at, 1, snippet)
  writeFileSync(file, lines.join('\n'))
  console.log(
    `✏️  exemple partie 2 ajouté dans ${file}${
      part2.example ? '' : ' (repris de la partie 1)'
    } — attendu : ${part2.expected ?? '?'}`,
  )
}

async function cmdNew(year: number, day: number, part: Part): Promise<void> {
  await waitForUnlock(year, day)

  const inputFile = paths.input(year, day)
  if (!existsSync(inputFile)) {
    write(inputFile, await fetchInput(year, day))
    console.log(`📥 ${inputFile}`)
  }

  const puzzle = await loadPuzzle(year, day)
  console.log(`🎄 ${year} — ${puzzle.title}`)

  if (part === 2) return addPart2(year, day, puzzle)

  const solution = paths.solution(year, day)
  if (!existsSync(solution)) {
    write(solution, solutionFile())
    console.log(`✏️  ${solution}`)
  }
  const test = paths.test(year, day)
  if (existsSync(test)) {
    console.log(`ℹ️  ${test} existe déjà, inchangé`)
  } else {
    const p1 = puzzle.parts[0]
    write(test, testFile(year, day, puzzle.title, exampleTest(1, p1?.example, p1?.expected)))
    console.log(`✏️  ${test} — attendu : ${p1?.expected ?? '?'} (vérifie l'heuristique)`)
  }
  console.log(`\n▶  pnpm dev ${day}      puis   pnpm submit ${day}`)
}

function cmdDev(year: number, day: number): void {
  const test = paths.test(year, day)
  if (!existsSync(test)) throw new Error(`${test} absent : lance pnpm new ${day}`)
  spawnSync('vitest', ['--watch', test], { stdio: 'inherit' })
}

function examplesPass(year: number, day: number, part: Part): boolean {
  const test = paths.test(year, day)
  const name = `part ${part} example`
  if (!existsSync(test) || !readFileSync(test, 'utf8').includes(name)) {
    console.log(`⚠️  aucun test « ${name} », vérification sautée`)
    return true
  }
  const run = spawnSync('vitest', ['run', test, '-t', name], {
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
  })
  if (run.error) throw new Error(`impossible de lancer vitest : ${run.error.message}`)
  if (run.status !== 0) console.log(run.stdout + run.stderr)
  return run.status === 0
}

async function cmdSubmit(args: Args, day: number): Promise<void> {
  const { year } = args
  const state = loadState(year, day)
  const part: Part = args.part ?? (state.parts[1].correct === undefined ? 1 : 2)

  const mod = await import(pathToFileURL(resolve(paths.solution(year, day))).href)
  const solve: (input: string) => Answer = mod[`part${part}`] ?? mod.default?.[`part${part}`]
  const start = performance.now()
  const result = solve(readInput(year, day))
  const ms = (performance.now() - start).toFixed(1)
  if (result === undefined || result === '') {
    throw new Error(`part${part} ne renvoie rien`)
  }
  const answer = String(result)
  console.log(`🧮 ${year} day ${day} part ${part} : ${answer}  (${ms} ms)`)

  const reason = rejectReason(state.parts[part], answer)
  if (reason) {
    console.log(`🛑 non envoyée : ${reason}`)
    return
  }
  if (!args.force && !examplesPass(year, day, part)) {
    console.log('🛑 non envoyée : l’exemple échoue (ajoute --force pour passer outre)')
    process.exitCode = 1
    return
  }
  if (state.waitUntil && Date.now() < state.waitUntil) {
    const s = Math.ceil((state.waitUntil - Date.now()) / 1000)
    console.log(`🛑 non envoyée : AoC impose d’attendre encore ${s}s`)
    process.exitCode = 1
    return
  }

  const outcome = parseSubmit(await postAnswer(year, day, part, answer))
  const ps = state.parts[part]
  switch (outcome.kind) {
    case 'correct':
      ps.correct = answer
      console.log(`✅ bonne réponse ! ⭐`)
      break
    case 'wrong': {
      ps.wrong.push(answer)
      const n = Number(answer)
      if (outcome.hint === 'high') ps.tooHigh = Math.min(ps.tooHigh ?? Infinity, n)
      if (outcome.hint === 'low') ps.tooLow = Math.max(ps.tooLow ?? -Infinity, n)
      state.waitUntil = Date.now() + outcome.waitSeconds * 1000
      const hint = outcome.hint ? ` (trop ${outcome.hint === 'high' ? 'haut' : 'bas'})` : ''
      console.log(`❌ mauvaise réponse${hint} — attente ${outcome.waitSeconds}s`)
      process.exitCode = 1
      break
    }
    case 'tooSoon':
      state.waitUntil = Date.now() + outcome.waitSeconds * 1000
      console.log(`⏳ trop tôt, réessaie dans ${outcome.waitSeconds}s`)
      process.exitCode = 1
      break
    case 'alreadyDone':
      console.log('ℹ️  partie déjà résolue côté AoC, synchronisation…')
      break
    case 'unknown':
      console.log(`❓ réponse AoC non reconnue :\n${outcome.text}`)
      process.exitCode = 1
  }
  saveState(year, day, state)

  if (outcome.kind === 'correct' || outcome.kind === 'alreadyDone') {
    const puzzle = await loadPuzzle(year, day)
    if (part === 1 && existsSync(paths.test(year, day))) addPart2(year, day, puzzle)
  }
}

const HELP = `Usage :
  pnpm new <jour> [a|b]      a : input + solution + test avec l'exemple partie 1
                             b : ajoute l'exemple partie 2 au test
  pnpm dev [jour]            tests en watch (exemples + réponses sur l'input réel)
  pnpm submit [jour] [a|b]   calcule et soumet (partie non résolue par défaut)
Options : --year <aaaa> (défaut AOC_YEAR ou 2025), --force (submit malgré un exemple KO)`

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  switch (args.command) {
    case 'new':
      if (args.day === undefined) throw new Error('précise le jour : pnpm new <jour> [a|b]')
      return cmdNew(args.year, args.day, args.part ?? 1)
    case 'dev':
      return cmdDev(args.year, resolveDay(args))
    case 'submit':
      return cmdSubmit(args, resolveDay(args))
    default:
      console.log(HELP)
  }
}

main().catch((error: Error) => {
  console.error(`💥 ${error.message}`)
  process.exitCode = 1
})
