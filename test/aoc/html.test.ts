import { describe, expect, it } from 'vitest'
import { parsePuzzle, parseSubmit } from '../../src/aoc/html'
import { rejectReason } from '../../src/aoc/state'
import * as f from './fixtures'

describe('aoc - parsing du puzzle', () => {
  it('extrait titre, exemple et réponse attendue de la partie 1', () => {
    const p = parsePuzzle(f.part1Page)
    expect(p.title).toBe('Day 1: Trebuchet?!')
    expect(p.parts).toHaveLength(1)
    expect(p.parts[0].example).toBe('1abc2\npqr3stu8vwx\na<1b2c3d4e5f\ntreb7uchet\n')
    expect(p.parts[0].expected).toBe('142')
    expect(p.solved).toEqual([])
  })

  it('extrait la partie 2 et les réponses déjà validées', () => {
    const p = parsePuzzle(f.part2Page)
    expect(p.parts[1].example).toBe('two1nine\neightwothree\n')
    expect(p.parts[1].expected).toBe('281')
    expect(p.solved).toEqual(['54630'])
  })
})

describe('aoc - réponse de soumission', () => {
  it.each([
    [f.correct, { kind: 'correct' }],
    [f.wrongHigh, { kind: 'wrong', hint: 'high', waitSeconds: 60 }],
    [f.wrong5min, { kind: 'wrong', hint: undefined, waitSeconds: 300 }],
    [f.tooSoon, { kind: 'tooSoon', waitSeconds: 63 }],
    [f.done, { kind: 'alreadyDone' }],
  ])('%#', (html, expected) => {
    expect(parseSubmit(html)).toEqual(expected)
  })
})

describe('aoc - garde-fous de soumission', () => {
  const part = { wrong: ['10'], tooHigh: 100, tooLow: 5 }
  it.each([
    ['10', 'déjà été refusée'],
    ['100', 'too high'],
    ['150', 'too high'],
    ['5', 'too low'],
  ])('refuse %s', (answer, reason) => {
    expect(rejectReason(part, answer)).toContain(reason)
  })
  it('accepte une réponse plausible', () => {
    expect(rejectReason(part, '42')).toBeUndefined()
  })
  it('refuse une partie déjà validée', () => {
    expect(rejectReason({ wrong: [], correct: '7' }, '8')).toContain('déjà validée avec 7')
  })
})
