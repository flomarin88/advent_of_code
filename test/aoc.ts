import { existsSync } from 'fs'
import { describe, expect, it } from 'vitest'
import { paths } from '../src/aoc/config'
import { Answer, normalize, readInput } from '../src/aoc/input'
import { loadState } from '../src/aoc/state'

/** Normalise un exemple écrit en template literal (saut de ligne initial/final). */
export const example = normalize

type Solver = (input: string) => Answer

/**
 * Exécute chaque partie sur l'input réel et affiche la réponse.
 * Si une réponse a déjà été validée par AoC, elle sert de test de non-régression.
 */
export function realInput(
  year: number,
  day: number,
  parts: { part1: Solver; part2: Solver },
): void {
  describe('real input', () => {
    for (const part of [1, 2] as const) {
      it(`part ${part} answer`, (ctx) => {
        if (!existsSync(paths.input(year, day))) return ctx.skip()
        const input = readInput(year, day)
        const start = performance.now()
        const result = parts[`part${part}`](input)
        const ms = (performance.now() - start).toFixed(1)
        if (result === undefined) return ctx.skip()
        const known = loadState(year, day).parts[part].correct
        console.log(
          `⭐ ${year} day ${day} part ${part}: ${result}  (${ms} ms)${
            known !== undefined ? '  [déjà validée]' : ''
          }`,
        )
        if (known !== undefined) expect(String(result)).toBe(known)
      })
    }
  })
}
