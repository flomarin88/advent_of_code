import { Day9 } from '../../src/2022/day9'
import * as assert from 'assert'

describe('2022 - Day 9', () => {
  const day = new Day9()

  describe('Part 1', () => {
    it('counts the number of unique locations where Tail was', () => {
      const input =
        'R 4\n' +
        'U 4\n' +
        'L 3\n' +
        'D 1\n' +
        'R 4\n' +
        'D 1\n' +
        'L 5\n' +
        'R 2'
  
      const result = day.solveForPartOne(input)

      assert.equal(result, 13)
    })
  })

  describe('Part 2', () => {
    it('counts the number of unique locations where 9-Tail was (tiny example)', () => {
      const input =
        'R 4\n' +
        'U 4\n' +
        'L 3\n' +
        'D 1\n' +
        'R 4\n' +
        'D 1\n' +
        'L 5\n' +
        'R 2'
    
      const result = day.solveForPartTwo(input)
    
      assert.equal(result, 1)
    })
  
    it('counts the number of unique locations where 9-Tail was (larger)', () => {
      const input =
        'R 5\n' +
        'U 8\n' +
        'L 8\n' +
        'D 3\n' +
        'R 17\n' +
        'D 10\n' +
        'L 25\n' +
        'U 20'

      const result = day.solveForPartTwo(input)

      assert.equal(result, 36)
    })
  })
})
