import { Day } from '../day'

export class Day3 extends Day {
  constructor() {
    super(3)
  }

  solveForPartOne(input: string): number {
    const lines = input.split('\n')
    return lines.reduce((sum, currentLine) => {
      if (currentLine !== '') {
        sum += this.toNumber(this.letter(currentLine))
      }
      return sum
    }, 0)
  }

  solveForPartTwo(input: string): number {
    return 0
  }
  
  sliceIntoEqualParts(input: string): string[] {
    return [input.slice(0, input.length / 2), input.slice(input.length / 2)]
  }
  
  letter(input: string): string {
    const parts = this.sliceIntoEqualParts(input)
    
    const firstPartLettersMap = Array.from(parts[0]).reduce((acc, current) => {
      acc.set(current, true)
      return acc
    }, new Map<string, boolean>())
    
    const result = Array.from(parts[1]).find(char => firstPartLettersMap.has(char))
    if (result) {
      return result
    }
    throw new Error(`No letter found on line => ${input}`)
  }
  
  toNumber(letter: string): number {
    const rawCode = letter.charCodeAt(0)
    if (letter === letter.toUpperCase()) {
      return rawCode - 38
    }
    else {
      return rawCode - 96
    }
  }
}
