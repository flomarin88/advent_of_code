import { readFile } from './2022/file/fileReader'
import { part1, part2 } from './2022/02/rock_paper_scissors'

readFile('2022_02_1_input.txt').then((input) => {
  console.log(`Part 1 => ${part1(input)}`)
  console.log(`Part 2 => ${part2(input)}`)
})
