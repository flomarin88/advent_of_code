import { Day5 } from '../../src/2022/day5'
import * as assert from 'assert'

describe('2022 - Day 5', () => {
  const day = new Day5()

  describe('Part 1', () => {
    it('rearranges the crates', () => {
      const input =
        '    [D]    \n' +
        '[N] [C]    \n' +
        '[Z] [M] [P]\n' +
        ' 1   2   3 \n' +
        '\n' +
        'move 1 from 2 to 1\n' +
        'move 3 from 1 to 3\n' +
        'move 2 from 2 to 1\n' +
        'move 1 from 1 to 2\n'

      const result = day.solveForPartOne(input)

      assert.equal(result, 'CMZ')
    })

    it('parses the creates plan', () => {
      const input =
        '    [D]    \n' + '[N] [C]    \n' + '[Z] [M] [P]\n' + ' 1   2   3 '

      const result = day.getInitialPlan(input)

      assert.deepEqual(result, {
        1: ['Z', 'N'],
        2: ['M', 'C', 'D'],
        3: ['P'],
      })
    })
  })

  describe('Part 2', () => {
    it('rearranges the crates - multiple crates at a time', () => {
      const input =
        '    [D]    \n' +
        '[N] [C]    \n' +
        '[Z] [M] [P]\n' +
        ' 1   2   3 \n' +
        '\n' +
        'move 1 from 2 to 1\n' +
        'move 3 from 1 to 3\n' +
        'move 2 from 2 to 1\n' +
        'move 1 from 1 to 2\n'

      const result = day.solveForPartTwo(input)

      assert.equal(result, 'MCD')
    })
  })
})
