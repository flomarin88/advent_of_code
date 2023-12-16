import { Day } from '../day'

type Point = [number, number]
interface Direction {
  [key: string]: [number, number]
}
const directions: Direction = {
  U: [0, 1],
  L: [-1, 0],
  D: [0, -1],
  R: [1, 0],
}

class RopeGame {
  knots: Point[]
  tailLocations: Set<string>

  constructor(private ropeSize: number) {
    this.knots = []
    for (let i = 0; i < ropeSize; i++) {
      this.knots.push([0, 0])
    }
    this.tailLocations = new Set<string>()
    this.tailLocations.add('0,0')
  }

  move(direction: number[]) {
    this.knots[0] = [
      this.knots[0][0] + direction[0],
      this.knots[0][1] + direction[1],
    ]
    for (let i = 1; i < this.ropeSize; i++) {
      if (!this.areAdjacents(this.knots[i - 1], this.knots[i])) {
        const next = this.next(this.knots[i - 1], this.knots[i])
        this.knots[i] = [this.knots[i][0] + next[0], this.knots[i][1] + next[1]]
        if (i === this.ropeSize - 1) {
          this.tailLocations.add(
            `${this.knots[this.ropeSize - 1][0]},${
              this.knots[this.ropeSize - 1][1]
            }`,
          )
        }
      }
    }
  }

  next(a: Point, b: Point): [number, number] {
    const xDiff = a[0] - b[0]
    const yDiff = a[1] - b[1]
    let x = xDiff
    let y = yDiff

    if (Math.abs(yDiff) === 2) {
      y = yDiff / 2
    }
    if (Math.abs(xDiff) === 2) {
      x = xDiff / 2
    }
    return [x, y]
  }

  // [0,0] => [-1,0] / [-1, 1] / [0, 1] / [1, 1] / [1, 0] / [1, -1] / [0, -1]
  areAdjacents(a: Point, b: Point): boolean {
    return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1
  }
}

export class Day9 extends Day {
  constructor() {
    super(2022, 9)
  }

  solveForPartOne(input: string): number {
    const puzzle = new RopeGame(2)

    return this.solve(input, puzzle)
  }

  solveForPartTwo(input: string): number {
    const puzzle = new RopeGame(10)
    return this.solve(input, puzzle)
  }

  solve(input: string, ropeGame: RopeGame) {
    const lines = input.split('\n')
    for (const line of lines) {
      const [direction, times] = line.split(' ')
      for (let i = 0; i < Number(times); i++) {
        ropeGame.move(directions[direction])
      }
    }
    return ropeGame.tailLocations.size
  }

  display(puzzle: RopeGame) {
    let result: string = ''
    for (let y = 7; y >= -5; y--) {
      for (let x = -11; x <= 11; x++) {
        const locationIndex = puzzle.knots.findIndex((value) => {
          return value[0] === x && value[1] === y
        })
        if (locationIndex !== -1) {
          if (locationIndex === 0) {
            result += 'H'
          } else {
            result += `${locationIndex}`
          }
        } else {
          result += '.'
        }
      }
      result += '\n'
    }
    console.log(`${result}`)
  }

  displayTailPositions(puzzle: RopeGame) {
    let result: string = ''
    const locations = Array.from(puzzle.tailLocations)
      .map((value) => {
        const split = value.split(',')
        return [Number(split[0]), Number(split[1])]
      })
      .sort((a, b) => {
        return a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1]
      })

    for (let y = 7; y >= -5; y--) {
      for (let x = -11; x <= 11; x++) {
        const location = locations.find((value) => {
          return value[0] === x && value[1] === y
        })
        if (location) {
          result += '#'
        } else {
          result += '.'
        }
      }
      result += '\n'
    }
    console.log(`${result}`)
  }
}
