import { Day } from '../day'
import { Day1 } from './day1'

const days: Day[] = [new Day1()]

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
