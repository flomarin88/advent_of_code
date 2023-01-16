import { readFile } from './2022/file/fileReader'
import { rockPaperScissorsTotal } from './2022/02/rock_paper_scissors'

readFile('2022_02_1_input.txt').then((input) => {
  const result = rockPaperScissorsTotal(input)
  console.log('Result => ', result)
})
