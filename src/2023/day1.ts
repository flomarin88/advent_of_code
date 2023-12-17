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
    const regex = /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g
    
    let counter: number = 0
    const lines = input.split('\n')
    lines.forEach((line) => {
      if (line !== '') {
        const matches = Array.from(line.matchAll(regex))
        if (matches.length > 0) {
          counter += this.toNumber(matches[0][1]) * 10 + this.toNumber(matches[matches.length - 1][1])
        }
      }
    })
    return counter
  }
  
  toNumber(word: string): number {
    const mapping: { [key: string]: number} = {
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
    }
    return mapping[word]
  }
}
