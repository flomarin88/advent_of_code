import { Day13 } from '../../src/2022/day13'
import * as assert from "assert";

describe('2022 - Day 13', () => {
  const day = new Day13()
  
  describe('Part 1', () => {
    it('sums the indices of pairs of packets received in right order', () => {
      const input = 
        '[1,1,3,1,1]\n' +
        '[1,1,5,1,1]\n' +
        '\n' +
        '[[1],[2,3,4]]\n' +
        '[[1],4]\n' +
        '\n' +
        '[9]\n' +
        '[[8,7,6]]\n' +
        '\n' +
        '[[4,4],4,4]\n' +
        '[[4,4],4,4,4]\n' +
        '\n' +
        '[7,7,7,7]\n' +
        '[7,7,7]\n' +
        '\n' +
        '[]\n' +
        '[3]\n' +
        '\n' +
        '[[[]]]\n' +
        '[[]]\n' +
        '\n' +
        '[1,[2,[3,[4,[5,6,7]]]],8,9]\n' +
        '[1,[2,[3,[4,[5,6,0]]]],8,9]'
      
      const result = day.solveForPartOne(input)
      
      assert.equal(result, 13)
    })
  })
})
