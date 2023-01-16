import {
  part1, part2,
} from '../../../src/2022/02/rock_paper_scissors'
import * as assert from 'assert'

describe('2022 - Day 02', () => {
  describe('part 1', () => {

    it('calculates a score', () => {
      const input = 'A Y\n' + 'B X\n' + 'C Z'

      const result = part1(input)

      assert.equal(result, 15)
    })
  
    it('calculates another score', () => {
      const input = 'A Z\n' + 'B X\n' + 'C Z\n' + 'C X\n' + 'B Z\n' + 'A Y'
      // A Z = 3
      // B X = 1
      // C Z = 6
      // C X = 7
      // B Z = 9
      // A Y = 8
      
      
      const result = part1(input)
    
      assert.equal(result, 34)
    })
  })
  
  describe('part 2', () => {
    
    it('calculates a score', () => {
      const input = 'A Y\n' + 'B X\n' + 'C Z'
      
      const result = part2(input)
      
      assert.equal(result, 12)
    })
  
    it('calculates another score', () => {
      const input = 'A Z\n' + 'B X\n' + 'C Z\n' + 'C X\n' + 'B Z\n' + 'A Y'
      // A Z = 6 + 2 = 8
      // B X = 0 + 1 = 1
      // C Z = 6 + 1 = 7
      // C X = 0 + 2 = 2
      // B Z = 6 + 3 = 9
      // A Y = 3 + 1 = 4
    
    
      const result = part2(input)
    
      assert.equal(result, 31)
    })
  })
})
