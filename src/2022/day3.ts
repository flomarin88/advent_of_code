import { Day } from '../day'

export class Day3 extends Day {
  constructor() {
    super(2022, 3)
  }

  solveForPartOne(input: string): number {
    const lines = input.split('\n')
    return lines.reduce((sum, currentLine) => {
      sum += this.toNumber(this.letter(currentLine))
      return sum
    }, 0)
  }

  solveForPartTwo(input: string): number {
    const lines = input.split('\n')
    const chunks = this.chunks(lines, 3)
    
    return chunks.reduce((sum, chunk) => {
      sum += this.toNumber(this.letterInChunk(chunk))
      return sum
    }, 0)
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
  
  chunks(input: string[], linesPerChunk: number): string[][] {
    return input.reduce((acc: string[][], currentLine, index) => {
      const chunkIndex = Math.floor(index / linesPerChunk)
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []
      }
      acc[chunkIndex].push(currentLine)
      return acc
    }, [])
  }
  
  letterInChunk(input: string[]): string {
    const firstLineMap = Array.from(input[0]).reduce((acc, current) => {
      acc.set(current, true)
      return acc
    }, new Map<string, boolean>())
    
    const secondLineMap = Array.from(input[1]).reduce((acc, current) => {
      if (firstLineMap.has(current)) {
        acc.set(current, true)
      }
      return acc
    }, new Map<string, boolean>())
    
    const result = Array.from(input[2]).find(char => secondLineMap.has(char))
    if (result) {
      return result
    }
    throw new Error(`No letter found on line => ${input}`)
  }
}
