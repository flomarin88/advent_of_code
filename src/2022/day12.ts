import { Day } from '../day'

type Point = {
  x: number,
  y: number
}
type Direction = [number, number]

type PointWithDistance = Point & { distance: number }

const directions: Direction[] = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
]

export class Day12 extends Day {
  constructor() {
    super(12)
  }

  solveForPartOne(input: string): number {
    const matrix = input
      .split('\n')
      .filter((l) => l !== '')
      .map((line) => Array.from(line))

    const start = this.getPosition(matrix, 'S')
    const end = this.getPosition(matrix, 'E')
    
    return this.bfs(matrix, start, end)
  }

  solveForPartTwo(input: string): number | string {
    const matrix = input
      .split('\n')
      .filter((l) => l !== '')
      .map((line) => Array.from(line))
  
    // const start = this.getPosition(matrix, 'S')
    const starts = this.findAllStartingPoints(matrix)
    const end = this.getPosition(matrix, 'E')
  
    let distance: number = 0
    starts.forEach(start => {
      const result = this.bfs(matrix, start, end)
      if (result < distance) {
        distance = result
      }
    })
    return distance
  }

  private getPosition(matrix: string[][], element: string): Point {
    let resultRow = -1
    let resultCol = -1
    matrix.forEach((row, rowIndex) => {
      const colIndex = row.findIndex((value) => {
        return value === element
      })
      if (colIndex !== -1) {
        resultRow = rowIndex
        resultCol = colIndex
        return
      }
    })
    if (resultRow !== -1 && resultCol !== -1) {
      return { x: resultRow, y: resultCol }
    }
    throw new Error(`Element ${element} not found`)
  }
  
  private bfs(matrix: string[][], start: Point, end: Point): number {
    const queue: PointWithDistance[] = [{...start, distance: 0}] 
    const visited: Point[] = [start]
    
    let distance = 0
    let current = queue.shift()
    while (current) {
      const letter = matrix[current.x][current.y] === 'S' ? 'a' : matrix[current.x][current.y]
      directions.forEach(direction => {
        if (current) {
          const nextPoint = { x: current.x + direction[0], y: current.y + direction[1], distance: current.distance + 1 }
          if (nextPoint.x >= 0 && nextPoint.x < matrix.length && nextPoint.y >= 0 && nextPoint.y < matrix[0].length) {
            if (!this.isVisited(visited, nextPoint)) {
              if (matrix[nextPoint.x][nextPoint.y].charCodeAt(0) - letter.charCodeAt(0) <= 1) {
                visited.push(nextPoint)
                queue.push(nextPoint)
              }
            }
            if (nextPoint.x === end.x && nextPoint.y === end.y) {
              distance = nextPoint.distance
              console.log(distance)
            }
          }
        }
      })
      current = queue.shift()
    }
    return distance
  }
  
  private isVisited(visited: Point[], point: Point): boolean {
    return visited.find(v => {
      return v.x === point.x && v.y === point.y
    }) !== undefined
  }
  
  private findAllStartingPoints(matrix: string[][]): Point[] {
    
    return []
  }
}
