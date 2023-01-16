import {
  rockPaperScissorsTotal,
} from '../../../src/2022/02/rock_paper_scissors'
import * as assert from 'assert'

describe('2022 - Day 02', () => {
  describe('Rock Paper Scissors', () => {

    it('calculates a score', () => {
      const input = 'A Y\n' + 'B X\n' + 'C Z'

      const result = rockPaperScissorsTotal(input)

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
      
      
      const result = rockPaperScissorsTotal(input)
    
      assert.equal(result, 34)
    })
  })
})
