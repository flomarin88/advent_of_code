// Extraction heuristique depuis le HTML de adventofcode.com (pas de dépendance).

function decode(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

export interface PuzzlePart {
  /** Premier bloc <pre><code> de l'énoncé de la partie. */
  example?: string
  /** Dernier <code><em>…</em></code> : en général la réponse de l'exemple. */
  expected?: string
}

export interface Puzzle {
  title: string
  parts: PuzzlePart[]
  /** Réponses déjà validées (« Your puzzle answer was … »). */
  solved: string[]
}

export function parsePuzzle(html: string): Puzzle {
  const title =
    decode(html.match(/<h2>--- (.*?) ---<\/h2>/)?.[1] ?? '').trim() || '?'
  const articles = [
    ...html.matchAll(/<article class="day-desc">([\s\S]*?)<\/article>/g),
  ].map((m) => m[1])
  const parts = articles.map((article): PuzzlePart => {
    const pre = article.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/)
    const answers = [
      ...article.matchAll(
        /<code><em>([^<]*)<\/em><\/code>|<em><code>([^<]*)<\/code><\/em>/g,
      ),
    ]
    const last = answers[answers.length - 1]
    return {
      example: pre ? decode(pre[1]) : undefined,
      expected: last ? decode(last[1] ?? last[2]) : undefined,
    }
  })
  const solved = [
    ...html.matchAll(/Your puzzle answer was <code>([^<]*)<\/code>/g),
  ].map((m) => decode(m[1]))
  return { title, parts, solved }
}

export type SubmitResult =
  | { kind: 'correct' }
  | { kind: 'wrong'; hint?: 'high' | 'low'; waitSeconds: number }
  | { kind: 'tooSoon'; waitSeconds: number }
  | { kind: 'alreadyDone' }
  | { kind: 'unknown'; text: string }

function parseWait(text: string): number {
  const min = text.match(/(\d+)m/)?.[1] ?? text.match(/(\d+) minutes?/)?.[1]
  const sec = text.match(/(\d+)s/)?.[1]
  if (min || sec) return Number(min ?? 0) * 60 + Number(sec ?? 0)
  if (/one minute/.test(text)) return 60
  return 60
}

export function parseSubmit(html: string): SubmitResult {
  const text = decode(html.match(/<article>([\s\S]*?)<\/article>/)?.[1] ?? html)
    .replace(/\s+/g, ' ')
    .trim()
  if (/That's the right answer/.test(text)) return { kind: 'correct' }
  if (/You gave an answer too recently/.test(text)) {
    const left = text.match(/You have (.*?) left to wait/)?.[1] ?? ''
    return { kind: 'tooSoon', waitSeconds: parseWait(left) }
  }
  if (/That's not the right answer/.test(text)) {
    const hint = /too high/.test(text)
      ? 'high'
      : /too low/.test(text)
      ? 'low'
      : undefined
    const wait = text.match(/please wait (.*?) before/i)?.[1] ?? ''
    return { kind: 'wrong', hint, waitSeconds: parseWait(wait) }
  }
  if (/You don't seem to be solving the right level/.test(text))
    return { kind: 'alreadyDone' }
  return { kind: 'unknown', text }
}
