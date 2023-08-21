import { Day12 } from '../../src/2022/day12'
import * as assert from 'assert'

describe('2022 - Day 12', () => {
  const day = new Day12()

  const input = 'Sabqponm\n' + 'abcryxxl\n' + 'accszExk\n' + 'acctuvwj\n' + 'abdefghi'

  describe('Part 1', () => {
    it('sums the number of items investigated by the top 2 monkeys', () => {
      const result = day.solveForPartOne(input)

      assert.equal(result, 31)
    })
  })

  // describe('Part 2', () => {
  //   it('sums the number of items investigated by the top 2 monkeys', () => {
  //     const result = day.solveForPartTwo(input)
  //
  //     assert.equal(result, 2713310158)
  //   })
  // })
})
