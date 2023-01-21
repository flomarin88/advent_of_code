import { Day4 } from '../../src/2022/day4'
import * as assert from 'assert'

describe('2022 - Day 4', () => {
  const day = new Day4()
  describe('Part 1', () => {
    it('counts fully included ranges', () => {
      const input =
        '2-4,6-8\n' +
        '2-3,4-5\n' +
        '5-7,7-9\n' +
        '2-8,3-7\n' +
        '6-6,4-6\n' +
        '2-6,4-8\n'

      const result = day.solveForPartOne(input)

      assert.equal(result, 2)
    })
  })
})
