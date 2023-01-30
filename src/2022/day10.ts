import { Day } from '../day'

class Device {
  private _cycle: number
  private _signal: number

  constructor() {
    this._cycle = 0
    this._signal = 1
  }

  noop() {
    this._cycle += 1
  }

  add(value: number) {
    this._cycle += 2
    this._signal += value
  }

  public get signal(): number {
    return this._signal
  }
  
  public get cycle(): number {
    return this._cycle
  }
}

export class Day10 extends Day {
  constructor() {
    super(10)
  }

  solveForPartOne(input: string): number {
    const moments = [20, 60, 100, 140, 180, 220]
    const device = new Device()
    const lines = input.split('\n')

    return lines.reduce((strenghts, line) => {
      if (line === 'noop') {
        strenghts += this.snapshot(device, moments, 1)
        device.noop()
      } else {
        const split = line.split(' ')
        strenghts += this.snapshot(device, moments, 2)
        device.add(Number(split[1]))
      }
      return strenghts
    }, 0)
  }

  solveForPartTwo(input: string): number {
    return 0
  }
  
  snapshot(device: Device, moments: number[], operation: number): number {
    if (moments.length > 0) {
      if (device.cycle + operation >= moments[0]) {
        const moment = moments.shift()
        if (moment) {
          return moment * device.signal
        }
      }
    }
    return 0
  }
  
}
