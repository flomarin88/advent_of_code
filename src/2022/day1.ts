import { Day } from '../day'

class Day1 extends Day {
  constructor() {
    super(1)
  }

  solveForPartOne(input: string): number {
    let max = 0
    const lastResult = input
      .split('\n')
      .reduce((sum: number, current: string) => {
        sum += Number(current)
        if (current === '') {
          if (sum > max) {
            max = sum
          }
          sum = 0
        }
        return sum
      }, 0)
    return max === 0 ? lastResult : max
  }

  solveForPartTwo(input: string): number {
    const result = input.split('\n').reduce(
      (sums: number[], current: string) => {
        if (current === '') {
          sums[sums.length] = 0
        } else {
          sums[sums.length - 1] += Number(current)
        }
        return sums
      },
      [0],
    )
    return result
      .sort((a, b) => b - a)
      .splice(0, 3)
      .reduce((sum, current) => sum + current, 0)
  }
}

export { Day1 }
