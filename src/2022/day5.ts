import { Day } from '../day'

interface CratesPlan {
  [stack: number]: string[]
}

interface MoveDescription {
  count: number,
  from: number,
  to: number
}

export class Day5 extends Day {
  constructor() {
    super(5)
  }

  solveForPartOne(input: string): string {
    const puzzle = input.split('\n\n')
    const cratesPlan = this.parseCratesPlan(puzzle[0])
    const procedures = puzzle[1].split('\n')
    procedures.forEach(procedure => {
      if (procedure !== '') {
        this.doMove(cratesPlan, this.getMove(procedure))
      }
    })
    return this.heads(cratesPlan)
  }

  solveForPartTwo(input: string): string {
    return ''
  }
  
  parseCratesPlan(input: string): CratesPlan {
    const lines = input.split('\n')
    const chars = lines.map(line => Array.from(line))
    const rotation = chars[0].map((val, index) => chars.map(row => row[index]).reverse())
    return rotation.reduce((plan, line) => {
      if (line[0] !== ' ') {
        plan[Number(line.shift())] = line.filter(l => l !== ' ')
      }
      return plan
    }, {} as CratesPlan)
  }
  
  // move 2 from 2 to 1
  getMove(input: string): MoveDescription {
    const split = input.split(' ')
    return {
      count: Number(split[1]),
      from: Number(split[3]),
      to: Number(split[5])
    }
  }
  
  doMove(cratesPlan: CratesPlan, desc: MoveDescription) {
    for (let i = 0; i < desc.count; i++) {
      const crate = cratesPlan[desc.from].pop()
      if (crate) {
        cratesPlan[desc.to].push(crate)
      }
    }
  }
  
  heads(cratesPlan: CratesPlan): string {
    return Object.keys(cratesPlan).map(key => {
      return cratesPlan[Number(key)].pop()
    }).join('')
  }
}
