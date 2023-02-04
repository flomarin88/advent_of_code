import { Day11 } from '../../src/2022/day11'
import * as assert from 'assert'

describe('2022 - Day 11', () => {
  const day = new Day11()
  
  const input =
    'Monkey 0:\n' +
    '  Starting items: 79, 98\n' +
    '  Operation: new = old * 19\n' +
    '  Test: divisible by 23\n' +
    '    If true: throw to monkey 2\n' +
    '    If false: throw to monkey 3\n' +
    '\n' +
    'Monkey 1:\n' +
    '  Starting items: 54, 65, 75, 74\n' +
    '  Operation: new = old + 6\n' +
    '  Test: divisible by 19\n' +
    '    If true: throw to monkey 2\n' +
    '    If false: throw to monkey 0\n' +
    '\n' +
    'Monkey 2:\n' +
    '  Starting items: 79, 60, 97\n' +
    '  Operation: new = old * old\n' +
    '  Test: divisible by 13\n' +
    '    If true: throw to monkey 1\n' +
    '    If false: throw to monkey 3\n' +
    '\n' +
    'Monkey 3:\n' +
    '  Starting items: 74\n' +
    '  Operation: new = old + 3\n' +
    '  Test: divisible by 17\n' +
    '    If true: throw to monkey 0\n' +
    '    If false: throw to monkey 1'

  describe('Part 1', () => {
    it('sums the number of items investigated by the top 2 monkeys', () => {
      const result = day.solveForPartOne(input)

      assert.equal(result, 10605)
    })
  })
  
  describe('Part 2', () => {
    it('sums the number of items investigated by the top 2 monkeys', () => {
      const result = day.solveForPartTwo(input)
      
      assert.equal(result, 2713310158)
    })
  })
})
