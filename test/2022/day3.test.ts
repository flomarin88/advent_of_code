import * as assert from 'assert'
import { Day3 } from '../../src/2022/day3'

describe('2022 - Day 03', () => {
  const day = new Day3()

  describe('part 1', () => {
    it ('splices into 2 equal parts', () => {
      const input = 'vJrwpWtwJgWrhcsFMMfFFhFp'
  
      const result = day.sliceIntoEqualParts(input)
  
      assert.deepEqual(result, ['vJrwpWtwJgWr','hcsFMMfFFhFp'])
    })
    it('gives a letter', () => {
      const input = 'vJrwpWtwJgWrhcsFMMfFFhFp'
      
      const result = day.letter(input)
      
      assert.deepEqual(result, 'p')
    })
    
    it('toNumber', () => {
      const result = ['a','z','A','Z'].map(letter => {
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
})
