import * as assert from 'assert'
import { Day1 } from '../../src/2023/day1'

describe('2023 - Day 01', () => {
  const day = new Day1()

  it('concatenates first and last digit of each line and sums them', () => {
    const one = 
      '1abc2\n' +
      'pqr3stu8vwx\n' +
      'a1b2c3d4e5f\n' +
      'treb7uchet\n'

    const first: number = day.solveForPartOne(one)

    assert.equal(first, 142)
  })
  
  it('concatenates first and last number (words or digits) of each line and sums them', () => {
    const two = 
      'two1nine\n' +
      'eightwothree\n' +
      'abcone2threexyz\n' +
      'xtwone3four\n' +
      '4nineeightseven2\n' +
      'zoneight234\n' +
      '7pqrstsixteen\n'
    
    const result = day.solveForPartTwo(two)
    
    assert.equal(result, 281)
  })
})
