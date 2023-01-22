import { Day } from '../day'

export class Day6 extends Day {
  constructor() {
    super(6)
  }

  solve(input: string, size: number): number {
    let index = size
    for (const window of this.window(Array.from(input), size)) {
      if (this.allDifferent(window)) {
        break
      }
      index++
    }
    return index
  }

  solveForPartOne(input: string): number {
    return this.solve(input, 4)
  }

  solveForPartTwo(input: string): number {
    return this.solve(input, 14)
  }

  *window(input: string[], size: number) {
    let index = size
    for (index; index < input.length; index++) {
      yield input.slice(index - size, index)
    }
    return index
  }

  allDifferent(input: string[]): boolean {
    return (
      input.reduce((acc, char) => {
        acc.add(char)
        return acc
      }, new Set<string>()).size === input.length
    )
  }
}
