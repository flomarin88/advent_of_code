import { USER_AGENT, session } from './config'

const BASE = 'https://adventofcode.com'

async function request(path: string, init: RequestInit = {}): Promise<string> {
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Cookie: `session=${session()}`,
      'User-Agent': USER_AGENT,
      ...init.headers,
    },
  })
  const body = await response.text()
  if (!response.ok) {
    const hint = /log in/i.test(body)
      ? ' (cookie de session expiré ? mets à jour AOC_SESSION dans .env)'
      : ''
    throw new Error(
      `${init.method ?? 'GET'} ${path} -> ${response.status}${hint}\n${body
        .trim()
        .slice(0, 300)}`,
    )
  }
  return body
}

export const fetchPuzzle = (year: number, day: number) =>
  request(`/${year}/day/${day}`)

export const fetchInput = (year: number, day: number) =>
  request(`/${year}/day/${day}/input`)

export const postAnswer = (
  year: number,
  day: number,
  level: 1 | 2,
  answer: string,
) =>
  request(`/${year}/day/${day}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ level: String(level), answer }).toString(),
  })
