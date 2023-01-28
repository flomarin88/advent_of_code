import { readFile } from 'fs/promises'

abstract class Day {
  id: number

  protected constructor(id: number) {
    this.id = id
  }

  private async getInputFile(): Promise<string> {
    const data = await readFile(`./resources/2022/day${this.id}.txt`)
    const lines = data.toString().split('\n')
    const lastLine = lines.pop()
    if (lastLine === '') {
      return lines.join('\n')
    }
    return data.toString()
  }

  async partOne(): Promise<number | string> {
    const content = await this.getInputFile()
    return this.solveForPartOne(content)
  }

  abstract solveForPartOne(input: string): number | string

  async partTwo(): Promise<number | string> {
    const content = await this.getInputFile()
    return this.solveForPartTwo(content)
  }

  abstract solveForPartTwo(input: string): number | string
}

export { Day }
