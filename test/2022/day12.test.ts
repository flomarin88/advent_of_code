import { Day12 } from '../../src/2022/day12'
import * as assert from 'assert'

describe('2022 - Day 12', () => {
  const day = new Day12()

  const input = 
    'Sabqponm\n' + 
    'abcryxxl\n' + 
    'accszExk\n' + 
    'acctuvwj\n' + 
    'abdefghi'

  describe('Part 1', () => {
    it('finds the shortest path from S to E', () => {
      const result = day.solveForPartOne(input)

      assert.equal(result, 31)
    })
  })

  describe('Part 2', () => {
    it('finds the shortest path from a to E', () => {
      const result = day.solveForPartTwo(input)
    
      assert.equal(result, 29)
    })  })
})
