import { Day } from '../day'

export class Day1 extends Day {
  constructor() {
    super(2023, 1)
  }

  solveForPartOne(input: string): number {
    let counter: number = 0

    const lines = input.split('\n')
    lines.forEach((line) => {
      if (line !== '') {
        let first: number | null = null
        let last: number | null = null
        Array.from(line).forEach((char) => {
          const value: number = Number(char)
          if (Number.isInteger(value)) {
            if (!first) {
              first = value
            }
            last = value
          }
        })
        counter += Number(`${first}${last}`)
      }
    })
    return counter
  }

  solveForPartTwo(input: string): number | string {
    return 0
  }
}
