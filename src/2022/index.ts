import { Day } from '../day'
import { Day1 } from './day1'
import { Day2 } from './day2'
import { Day3 } from './day3'
import { Day4 } from './day4'
import { Day5 } from './day5'
import { Day6 } from './day6'
import { Day7 } from './day7'
import { Day8 } from './day8'
import { Day9 } from './day9'
import { Day10 } from './day10'
import { Day11 } from './day11'
import { Day12 } from './day12'

const days: Day[] = [
  new Day1(),
  new Day2(),
  new Day3(),
  new Day4(),
  new Day5(),
  new Day6(),
  new Day7(),
  new Day8(),
  new Day9(),
  new Day10(),
  new Day11(),
  new Day12(),
]

async function run() {
  for (const day of days.reverse()) {
    await Promise.all([day.partOne(), day.partTwo()]).then((result) => {
      console.log(`--- Day ${day.id} ---`)
      console.log(`Part 1 : ${result[0]}`)
      console.log(`Part 2 : ${result[1]}`)
    })
  }
}

run()
