import { existsSync } from 'fs'

if (existsSync('.env')) process.loadEnvFile('.env')

export const DEFAULT_YEAR = Number(process.env.AOC_YEAR ?? 2025)

export function session(): string {
  const value = process.env.AOC_SESSION
  if (!value) {
    throw new Error(
      'AOC_SESSION manquant : copie le cookie "session" de adventofcode.com dans .env (voir .env.example)',
    )
  }
  return value
}

// AoC demande un User-Agent permettant de contacter l'auteur du script.
export const USER_AGENT =
  process.env.AOC_USER_AGENT ?? 'personal advent-of-code TS runner'

export const paths = {
  solution: (year: number, day: number) => `src/${year}/day${day}.ts`,
  test: (year: number, day: number) => `test/${year}/day${day}.test.ts`,
  input: (year: number, day: number) => `resources/${year}/day${day}.txt`,
  state: (year: number, day: number) =>
    `resources/${year}/day${day}.state.json`,
}

/** Les puzzles sortent à minuit heure de New York (UTC-5). */
export function unlockTime(year: number, day: number): Date {
  return new Date(Date.UTC(year, 11, day, 5, 0, 0))
}
