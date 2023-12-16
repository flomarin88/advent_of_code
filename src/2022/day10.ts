import { Day } from '../day'

class Device {
  private _cycle: number = 0
  private _signal: number = 1
  private _crt: string = ''

  constructor() {}

  incrementCycle() {
    this.draw()
    this._cycle += 1
  }
  
  noop() {
    this.incrementCycle()
  }

  add(value: number) {
    this.incrementCycle()
    this.incrementCycle()
    this._signal += value
  }

  public get signal(): number {
    return this._signal
  }

  public get cycle(): number {
    return this._cycle
  }
  
  public get crt(): string {
    const result = this._crt.match(/.{1,40}/g)
    if (result) {
      return result?.join('\n')
    }
    return ''
  }

  spritePositions(): [number, number, number] {
    return [this._signal - 1, this._signal, this._signal + 1]
  }
  
  draw()  {
    if (this.spritePositions().includes(this._cycle % 40)) {
      this._crt += '#'
    }
    else {
      this._crt += '.'
    }
  }
}

export class Day10 extends Day {
  constructor() {
    super(2022, 10)
  }

  solveForPartOne(input: string): number {
    const moments = [20, 60, 100, 140, 180, 220]
    const device = new Device()
    const lines = input.split('\n')

    return lines.reduce((strengths, line) => {
      if (line === 'noop') {
        strengths += this.snapshot(device, moments, 1)
        device.noop()
      } else {
        const split = line.split(' ')
        strengths += this.snapshot(device, moments, 2)
        device.add(Number(split[1]))
      }
      return strengths
    }, 0)
  }

  solveForPartTwo(input: string): string {
    const device = new Device()
    const lines = input.split('\n')
    lines.forEach(line => {
      if (line === 'noop') {
        device.noop()
      } else {
        const split = line.split(' ')
        device.add(Number(split[1]))
      }
    })
    return device.crt
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
