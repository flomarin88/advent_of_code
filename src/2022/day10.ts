import { Day } from '../day'

class Device {
  private cycle: number
  private signal: number
  public snapshots: Map<number, number>
  
  constructor(private snapshotMoments: number[]) {
    this.cycle = 0
    this.signal = 1
    this.snapshots = new Map<number, number>
  }
  
  snapshot(operation: number) {
    if (this.snapshotMoments.length > 0) {
      if (this.cycle + operation >= this.snapshotMoments[0]) {
        const moment = this.snapshotMoments.shift()
        if (moment) {
          this.snapshots.set(moment, this.signal)
        }
      }
    }
  }
  
  noop() {
    this.snapshot(1)
    this.cycle += 1
  }
  
  add(value: number) {
    this.snapshot(2)
    this.cycle += 2
    this.signal += value
  }
  
  getSignalStrengths(): number {
    let result = 0
    this.snapshots.forEach((value: number, key: number) => {
      result += value * key
    });
    return result
  }
}

export class Day10 extends Day {
  constructor() {
    super(10)
  }

  solveForPartOne(input: string): number {
    const device = new Device([20, 60, 100, 140, 180, 220])
    const lines = input.split('\n')
    lines.forEach(line => {
      if (line === 'noop') {
        device.noop()
      } else {
        const split = line.split(' ')
        device.add(Number(split[1]))
      }
    })

    return device.getSignalStrengths()
  }

  solveForPartTwo(input: string): number {
    return 0
  }
}
