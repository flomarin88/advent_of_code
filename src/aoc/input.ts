import { readFileSync } from 'fs'
import { paths } from './config'

export type Answer = number | bigint | string | undefined | void

/** Retire le saut de ligne d'ouverture d'un template literal et les sauts de ligne finaux. */
export function normalize(raw: string): string {
  return raw.replace(/^\r?\n/, '').replace(/\r/g, '').replace(/\n+$/, '')
}

export function readInput(year: number, day: number): string {
  return normalize(readFileSync(paths.input(year, day), 'utf8'))
}
