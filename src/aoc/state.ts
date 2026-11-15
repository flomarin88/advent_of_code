import { existsSync, readFileSync, writeFileSync } from 'fs'
import { paths } from './config'

export type Part = 1 | 2

export interface PartState {
  correct?: string
  wrong: string[]
  /** Plus petite réponse déclarée « too high ». */
  tooHigh?: number
  /** Plus grande réponse déclarée « too low ». */
  tooLow?: number
}

export interface DayState {
  parts: Record<Part, PartState>
  /** Timestamp (ms) avant lequel AoC refusera toute soumission. */
  waitUntil?: number
}

const empty = (): DayState => ({
  parts: { 1: { wrong: [] }, 2: { wrong: [] } },
})

export function loadState(year: number, day: number): DayState {
  const file = paths.state(year, day)
  if (!existsSync(file)) return empty()
  return { ...empty(), ...JSON.parse(readFileSync(file, 'utf8')) }
}

export function saveState(year: number, day: number, state: DayState): void {
  writeFileSync(paths.state(year, day), JSON.stringify(state, null, 2) + '\n')
}

/** Raison de refuser la soumission de `answer`, ou undefined si elle est envoyable. */
export function rejectReason(
  part: PartState,
  answer: string,
): string | undefined {
  if (part.correct !== undefined) {
    return part.correct === answer
      ? `déjà validée (${answer})`
      : `déjà validée avec ${part.correct}, ta solution donne ${answer}`
  }
  if (part.wrong.includes(answer)) return `${answer} a déjà été refusée`
  const n = Number(answer)
  if (/^-?\d+$/.test(answer)) {
    if (part.tooHigh !== undefined && n >= part.tooHigh)
      return `${answer} ≥ ${part.tooHigh}, déjà déclaré « too high »`
    if (part.tooLow !== undefined && n <= part.tooLow)
      return `${answer} ≤ ${part.tooLow}, déjà déclaré « too low »`
  }
  return undefined
}
