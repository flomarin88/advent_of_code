export const PART2_MARKER = '// aoc:part2'

function templateLiteral(text: string): string {
  const escaped = text
    .replace(/\n+$/, '')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
  return '`\n' + escaped + '\n`'
}

function valueLiteral(expected: string | undefined): string {
  if (expected === undefined) return 'undefined /* TODO réponse attendue */'
  if (/^-?\d+$/.test(expected) && Number.isSafeInteger(Number(expected)))
    return expected
  return JSON.stringify(expected)
}

export function exampleTest(
  part: 1 | 2,
  example: string | undefined,
  expected: string | undefined,
): string {
  const input = example
    ? templateLiteral(example)
    : '`\n` /* TODO coller l’exemple */'
  return [
    `  it('part ${part} example', () => {`,
    `    const input = example(${input})`,
    `    expect(part${part}(input)).toEqual(${valueLiteral(expected)})`,
    `  })`,
  ].join('\n')
}

export function solutionFile(): string {
  return `import { Answer } from '../aoc/input'

export function part1(input: string): Answer {
  const lines = input.split('\\n')
  return lines.length
}

export function part2(input: string): Answer {
  return undefined
}
`
}

export function testFile(
  year: number,
  day: number,
  title: string,
  part1Example: string,
): string {
  return `import { describe, expect, it } from 'vitest'
import { part1, part2 } from '../../src/${year}/day${day}'
import { example, realInput } from '../aoc'

describe(${JSON.stringify(`${year} - ${title}`)}, () => {
${part1Example}

  ${PART2_MARKER} — \`pnpm new ${day} b\` insère ici l'exemple de la partie 2

  realInput(${year}, ${day}, { part1, part2 })
})
`
}
