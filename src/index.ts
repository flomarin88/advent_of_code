import { Day } from './day'
import { Day1 } from './2022/day1'
import { Day2 } from './2022/day2'
import { Day3 } from './2022/day3'
import { Day4 } from './2022/day4'
import { Day5 } from './2022/day5'
import { Day6 } from './2022/day6'
import { Day7 } from './2022/day7'
import { Day8 } from './2022/day8'
import { Day9 } from './2022/day9'

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
