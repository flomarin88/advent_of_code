import { Day } from '../day'

interface CratesPlan {
  [stack: number]: string[]
}

interface MoveDescription {
  count: number
  from: number
  to: number
}

export class Day5 extends Day {
  constructor() {
    super(2022, 5)
  }

  solveForPartOne(input: string): string {
    return this.solve(input, this.doSingleMoves)
  }

  solveForPartTwo(input: string): string {
    return this.solve(input, this.doComplexMoves)
  }

  solve(
    input: string,
    move: (cratesPlan: CratesPlan, desc: MoveDescription) => void,
  ) {
    const puzzle = input.split('\n\n')
    const cratesPlan = this.getInitialPlan(puzzle[0])
    const procedures = puzzle[1].split('\n')
    procedures.forEach((procedure) => {
      if (procedure !== '') {
        move(cratesPlan, this.getMoveDescription(procedure))
      }
    })
    return this.heads(cratesPlan)
  }

  getInitialPlan(input: string): CratesPlan {
    const lines = input.split('\n')
    const chars = lines.map((line) => Array.from(line))
    const rotation = chars[0].map((val, index) =>
      chars.map((row) => row[index]).reverse(),
    )
    return rotation.reduce((plan, line) => {
      if (line[0] !== ' ') {
        plan[Number(line.shift())] = line.filter((l) => l !== ' ')
      }
      return plan
    }, {} as CratesPlan)
  }

  // move 2 from 2 to 1
  getMoveDescription(input: string): MoveDescription {
    const split = input.split(' ')
    return {
      count: Number(split[1]),
      from: Number(split[3]),
      to: Number(split[5]),
    }
  }

  doSingleMoves(cratesPlan: CratesPlan, desc: MoveDescription) {
    for (let i = 0; i < desc.count; i++) {
      const crate = cratesPlan[desc.from].pop()
      if (crate) {
        cratesPlan[desc.to].push(crate)
      }
    }
  }

  doComplexMoves(cratesPlan: CratesPlan, desc: MoveDescription) {
    const fromStack = cratesPlan[desc.from]
    const cratesToMove = fromStack.splice(fromStack.length - desc.count)
    if (cratesToMove) {
      cratesPlan[desc.to].push(...cratesToMove)
    }
  }

  heads(cratesPlan: CratesPlan): string {
    return Object.keys(cratesPlan)
      .map((key) => {
        return cratesPlan[Number(key)].pop()
      })
      .join('')
  }
}
