import { readFile } from 'fs/promises'

abstract class Day {
  year: number
  id: number

  protected constructor(year: number, id: number) {
    this.year = year
    this.id = id
  }

  private async getInputFile(): Promise<string> {
    const data = await readFile(`./resources/${this.year}/day${this.id}.txt`)
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
