import { Day } from '../day'

interface ThrowOptions {
  divisibleBy: number
  true: number
  false: number
}

interface Thrown {
  monkeyId: number
  item: number
}

class Monkey {
  public id: number = 0
  public items: number[] = []
  public operation: (old: number) => number
  public throwOptions: ThrowOptions
  public inspectionCounter: number = 0
  public allDivisors: number = 1

  constructor() {
    this.operation = (old) => {
      return old
    }
    this.throwOptions = { divisibleBy: 1, true: 0, false: 0 }
  }

  round(relief: boolean): Thrown[] {
    const result = this.items.map((item) => {
      this.inspectionCounter++
      return this.inspectAndThrow(item, relief)
    })
    this.items = []
    return result
  }

  private inspectAndThrow(item: number, relief: boolean): Thrown {
    const afterOperation = this.operation(item)
    const newWorryLevel = relief ? Monkey.getsBored(afterOperation) : afterOperation % this.allDivisors
    return {
      monkeyId:
        newWorryLevel % this.throwOptions.divisibleBy === 0
          ? this.throwOptions.true
          : this.throwOptions.false,
      item: newWorryLevel,
    }
  }

  private static getsBored(item: number): number {
    return Math.floor(item / 3)
  }

  public received(item: number) {
    this.items.push(item)
  }
  
  toString(): string {
    return `Monkey ${this.id}: ${this.items.join(', ')}`
  }
}

function plus(value: number): (old: number) => number {
  return (old) => {
    return old + value
  }
}

function multiply(value: number): (old: number) => number {
  return (old) => {
    return old * value
  }
}

function square(): (old: number) => number {
  return (old) => {
    return old * old
  }
}

export class Day11 extends Day {
  constructor() {
    super(11)
  }

  initMonkeys(input: string): Monkey[] {
    const monkeyLines = input.split('\n\n')
    const monkeys = monkeyLines.reduce((monkeys, lines) => {
      const monkey = lines.split('\n').reduce((monkey, line) => {
        const id = line.match(/Monkey (\d+):/)
        if (id) {
          monkey.id = Number(id[1])
        }
        const items = line.match(/Starting items: ((\d+(, )*)*)/)
        if (items) {
          monkey.items = items[1].split(', ').map(Number)
        }
        if (line.includes('Operation')) {
          const rawOperation = line.split(' = ')[1].split('old ')[1].split(' ')
          if (rawOperation[0] === '+' && rawOperation[1]) {
            monkey.operation = plus(Number(rawOperation[1]))
          }
          if (rawOperation[0] === '*' && rawOperation[1]) {
            if (rawOperation[1] === 'old') {
              monkey.operation = square()
            } else {
              monkey.operation = multiply(Number(rawOperation[1]))
            }
          }
        }
        if (line.includes('Test')) {
          monkey.throwOptions.divisibleBy = Number(
            line.split('  Test: divisible by ')[1],
          )
        }
        if (line.includes('If true')) {
          monkey.throwOptions.true = Number(
            line.split('    If true: throw to monkey')[1],
          )
        }
        if (line.includes('If false')) {
          monkey.throwOptions.false = Number(
            line.split('    If false: throw to monkey')[1],
          )
        }
        return monkey
      }, new Monkey())
      monkeys.push(monkey)
      return monkeys
    }, new Array<Monkey>())
    
    const allDivisors = monkeys.reduce((modulo, monkey) => modulo * monkey.throwOptions.divisibleBy, 1)
    monkeys.forEach(monkey => monkey.allDivisors = allDivisors)
    return monkeys
  }

  private solve(input: string, rounds: number, relief: boolean) {
    const monkeys = this.initMonkeys(input)
    for (let round = 1; round <= rounds; round++) {
      for (const monkey of monkeys) {
        const throws = monkey.round(relief)
        for (const throwItem of throws) {
          monkeys[throwItem.monkeyId].received(throwItem.item)
        }
      }
    }
    const bestTwoInspectors = monkeys
      .map(monkey => monkey.inspectionCounter)
      .sort((a, b) => b - a)
      .slice(0, 2)
    return bestTwoInspectors[0] * bestTwoInspectors[1]
  }
  
  solveForPartOne(input: string): number {
    return this.solve(input, 20, true)
  }

  solveForPartTwo(input: string): number {
    return this.solve(input, 10000, false)
  }
  
  toString(monkeys: Monkey[]): string {
    return monkeys.map(monkey => monkey.toString()).join('\n')
  }
}
