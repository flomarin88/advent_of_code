import * as assert from 'assert'
import { Day3 } from '../../src/2022/day3'

describe('2022 - Day 03', () => {
  const day = new Day3()

  describe('part 1', () => {
    it('splices into 2 equal parts', () => {
      const input = 'vJrwpWtwJgWrhcsFMMfFFhFp'

      const result = day.sliceIntoEqualParts(input)

      assert.deepEqual(result, ['vJrwpWtwJgWr', 'hcsFMMfFFhFp'])
    })
    it('gives a letter', () => {
      const input = 'vJrwpWtwJgWrhcsFMMfFFhFp'

      const result = day.letter(input)

      assert.deepEqual(result, 'p')
    })

    it('toNumber', () => {
      const result = ['a', 'z', 'A', 'Z'].map((letter) => {
        return day.toNumber(letter)
      })

      assert.deepEqual(result, [1, 26, 27, 52])
    })

    it('calculates a score', () => {
      const input =
        'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
        'PmmdzqPrVvPwwTWBwg\n' +
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
        'ttgJtRGJQctTZtZT\n' +
        'CrZsJsPPZsGzwwsLwLmpwMDw'

      const result = day.solveForPartOne(input)

      assert.equal(result, 157)
    })
  })

  describe('part 2', () => {
    it('finds the common letter between 3 lines', () => {
      const input =
        'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
        'PmmdzqPrVvPwwTWBwg'
    
      const result = day.solveForPartTwo(input)
    
      assert.deepEqual(result, 18)
    })
    
    it('finds the common letter between 3 lines', () => {
      const input =
        'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
        'PmmdzqPrVvPwwTWBwg\n' +
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
        'ttgJtRGJQctTZtZT\n' +
        'CrZsJsPPZsGzwwsLwLmpwMDw\n'

      const result = day.solveForPartTwo(input)

      assert.deepEqual(result, 70)
    })
    
    it('returns the common letter in chunks', () => {
      const input = [
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg'
      ]
      
      const result = day.letterInChunk(input)
      
      assert.equal(result, 'r')
    })
  })
})
