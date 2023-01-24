import { Day } from '../day'

export class Day8 extends Day {
  constructor() {
    super(8)
  }
  
  solveForPartOne(input: string): number {
    const matrix = input.split('\n').filter(l => l !== '').map(line => Array.from(line).map(i => Number(i)))
    
    return matrix.reduce((total, row, rowIndex) => {
      total += row.reduce((rowCount, current, colIndex) => {
        const top = this.areLower(this.extractTop(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        const down = this.areLower(this.extractDown(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        const right = this.areLower(this.extractRight(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        const left = this.areLower(this.extractLeft(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        rowCount += top || down || right || left ? 1 : 0
        return rowCount
      }, 0)
      return total
    }, 0)
  }
  
  solveForPartTwo(input: string): number {
    const matrix = input.split('\n').filter(l => l !== '').map(line => Array.from(line).map(i => Number(i)))
  
    return matrix.reduce((bestScenicScore, row, rowIndex) => {
      const viewDistance = row.reduce((rowBestScenicScore, current, colIndex) => {
        const top = this.viewingDistance(this.extractTop(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        const down = this.viewingDistance(this.extractDown(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        const right = this.viewingDistance(this.extractRight(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        const left = this.viewingDistance(this.extractLeft(matrix, rowIndex, colIndex), matrix[rowIndex][colIndex])
        const viewingDistance = top * down * right * left
        if (viewingDistance > rowBestScenicScore) {
          rowBestScenicScore = viewingDistance
        }
        return rowBestScenicScore
      }, 0)
      if (viewDistance > bestScenicScore) {
        bestScenicScore = viewDistance
      }
      return bestScenicScore
    }, 0)
  }
  
  areLower(numbers: number[], reference: number): boolean {
    if (numbers.length === 0) {
      return true
    }
    return numbers.every(n => n < reference)
  }
  
  viewingDistance(numbers: number[], reference: number): number {
    let viewingDistance = 0
    for (let number of numbers) {
      viewingDistance ++
      if (number >= reference) {
        break;
      }
    }
    return viewingDistance
  }
  
  extractTop(matrix: number[][], rowIndex: number, colIndex: number): number[] {
    if (rowIndex === 0) {
      return []
    }
    const result = []
    for (let i = rowIndex - 1; i >= 0; i--) {
      result.push(matrix[i][colIndex])
    }
    return result
  }
  
  extractDown(matrix: number[][], rowIndex: number, colIndex: number): number[] {
    if (rowIndex + 1 === matrix.length) {
      return []
    }
    const result = []
    for (let i = rowIndex + 1; i < matrix.length; i++) {
      result.push(matrix[i][colIndex])
    }
    return result
  }
  
  extractLeft(matrix: number[][], rowIndex: number, colIndex: number): number[] {
    if (colIndex === 0) {
      return []
    }
    const result = []
    for (let i = colIndex - 1; i >= 0; i--) {
      result.push(matrix[rowIndex][i])
    }
    return result
  }
  
  extractRight(matrix: number[][], rowIndex: number, colIndex: number): number[] {
    if (colIndex + 1 === matrix[rowIndex].length) {
      return []
    }
    const result = []
    for (let i = colIndex + 1; i < matrix[rowIndex].length; i++) {
      result.push(matrix[rowIndex][i])
    }
    return result
  }
}
