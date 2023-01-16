import { readFile } from 'fs/promises'

abstract class Day {
  id: number

  protected constructor(id: number) {
    this.id = id
  }

  private async getInputFile(): Promise<Buffer> {
    return await readFile(`./resources/2022/day${this.id}.txt`)
  }

  async partOne(): Promise<number> {
    const content = await this.getInputFile()
    return this.solveForPartOne(content.toString())
  }

  abstract solveForPartOne(input: string): number

  async partTwo(): Promise<number> {
    const content = await this.getInputFile()
    return this.solveForPartTwo(content.toString())
  }

  abstract solveForPartTwo(input: string): number
}

export { Day }
