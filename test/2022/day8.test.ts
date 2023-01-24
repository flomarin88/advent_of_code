import { Day8 } from '../../src/2022/day8'
import * as assert from "assert";

describe('2022 - Day 8', () => {
  const day = new Day8()

  const input = 
    '30373\n' +
    '25512\n' +
    '65332\n' +
    '33549\n' +
    '35390'

  describe('Part 1', () => {
    it('counts visible trees', () => {
      const result = day.solveForPartOne(input)
      
      assert.equal(result, 21)
    })
  })
  
  describe('Part 2', () => {
    it('return the best scenic score', () => {
      const result = day.solveForPartTwo(input)
      
      assert.equal(result, 8)
    })
  })
})
