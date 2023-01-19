import { Day } from './day'
import { Day1 } from './2022/day1'
import { Day2 } from './2022/day2'
import { Day3 } from './2022/day3'

const days: Day[] = [new Day1(), new Day2(), new Day3()]


days.forEach((day) => {
  Promise.all([day.partOne(), day.partTwo()]).then((result) => {
    console.log(`--- Day ${day.id} ---`)
    console.log(`Part 1 : ${result[0]}`)
    console.log(`Part 2 : ${result[1]}`)
  })
})
