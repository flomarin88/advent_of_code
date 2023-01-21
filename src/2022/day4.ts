import { Day } from '../day'

interface Pair {
  left: Range,
  right: Range
}

interface Range {
  from: number,
  to: number
}

export class Day4 extends Day {
  constructor() {
    super(4)
  }

  solveForPartOne(input: string): number {
    return input.split('\n').reduce((counter, line) => {
      if (line !== '') {
        const pair = this.extractPair(line)
        counter += this.isPairIncluded(pair) ? 1 : 0
      }
      return counter
    }, 0)
  }

  solveForPartTwo(input: string): number {
    return input.split('\n').reduce((counter, line) => {
      if (line !== '') {
        const pair = this.extractPair(line)
        counter += this.isPairOverlap(pair) ? 1 : 0
      }
      return counter
    }, 0)
  
  }
  
  // 5-6,4-8
  extractPair(line: string): Pair {
    const ranges = line.split(',')
    return {
      left: this.extractRange(ranges[0]),
      right: this.extractRange(ranges[1]),
    }
  }
  
  extractRange(range: string): Range {
    const elements = range.split('-')
    return {
      from: Number(elements[0]),
      to: Number(elements[1])
    }
  }
  
  isFullyIncluded(a: Range, b: Range): boolean {
    return a.from >= b.from && a.to <= b.to
  }
  
  isOverlap(a: Range, b: Range): boolean {
    return a.to >= b.from && a.from <= b.to
  }
  
  isPairIncluded(pair: Pair): boolean {
    return this.isFullyIncluded(pair.left, pair.right) || this.isFullyIncluded(pair.right, pair.left)
  }
  
  isPairOverlap(pair: Pair): boolean {
    return this.isOverlap(pair.left, pair.right) || this.isOverlap(pair.right, pair.left)
  }
}
