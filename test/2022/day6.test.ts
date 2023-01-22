import { Day6 } from '../../src/2022/day6'
import * as assert from 'assert'

describe('2022 - Day 6', () => {
  const day = new Day6()

  describe('Part 1 and 2', () => {
    const inputs = [
      {
        input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
        resultPart1: 7,
        resultPart2: 19,
      },
      {
        input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
        resultPart1: 5,
        resultPart2: 23,
      },
      {
        input: 'nppdvjthqldpwncqszvftbrmjlhg',
        resultPart1: 6,
        resultPart2: 23,
      },
      {
        input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
        resultPart1: 10,
        resultPart2: 29,
      },
      {
        input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
        resultPart1: 11,
        resultPart2: 26,
      },
    ]

    inputs.forEach((i) => {
      it(`${i.input} => ${i.resultPart1} - ${i.resultPart2}`, () => {
        assert.equal(day.solveForPartOne(i.input), i.resultPart1)
        assert.equal(day.solveForPartTwo(i.input), i.resultPart2)
      })
    })
  })
})
