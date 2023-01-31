import { Day } from '../day'

interface ThrowOptions {
  divisibleBy: number
  true: number
  false: number
}

class Monkey {
  public id: number = 0
  public items: number[] = []
  public operation: (old: number) => number
  public throwOptions: ThrowOptions

  constructor() {
    this.operation = (old => { return old })
    this.throwOptions = { divisibleBy: 1, true: 0, false: 0}
  }

  bored() {}

  public received(item: number) {
    this.items.push(item)
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

  initMonkeys(input: string): Map<number, Monkey> {
    const monkeyLines = input.split('\n\n')
    return monkeyLines.reduce((monkeys, lines) => {
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
          monkey.throwOptions.divisibleBy = Number(line.split('  Test: divisible by ')[1])
        }
        if (line.includes('If true')) {
          monkey.throwOptions.true = Number(line.split('    If true: throw to monkey')[1])
        }
        if (line.includes('If false')) {
          monkey.throwOptions.false = Number(line.split('    If false: throw to monkey')[1])
        }
        return monkey
      }, new Monkey())
      monkeys.set(monkey.id, monkey)
      return monkeys
    }, new Map<number, Monkey>())
  }

  solveForPartOne(input: string): number {
    const monkeys = this.initMonkeys(input)
    for (let round = 1; round <= 20; round++) {
      
    }
    return 0
  }

  solveForPartTwo(input: string): number {
    return 0
  }
}
