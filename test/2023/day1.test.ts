import * as assert from 'assert'
import { Day1 } from '../../src/2022/day1'

describe('2023 - Day 01', () => {
  const day = new Day1()

  it('', () => {
    const oneElf = 
      '1abc2\n' +
      'pqr3stu8vwx\n' +
      'a1b2c3d4e5f\n' +
      'treb7uchet'

    const first: number = day.solveForPartOne(oneElf)

    assert.equal(first, 142)
  })
})
