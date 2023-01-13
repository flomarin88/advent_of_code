import {count, top3} from "../../../src/2022/01/calorie_counter";
import * as assert from "assert";

describe('2022 - Day 01', () => {
  it('counts calories by summing each line', () => {
    const oneElf = '1000\n2000\n3000'
    
    const first: number = count(oneElf)
    
    assert.equal(first, 6000)
  })
  
  it('returns the 4th Elf and the top 3', () => {
    const basic =
      '1000\n' +
      '2000\n' +
      '3000\n' +
      '\n' +
      '4000\n' +
      '\n' +
      '5000\n' +
      '6000\n' +
      '\n' +
      '7000\n' +
      '8000\n' +
      '9000\n' +
      '\n' +
      '10000\n'
    
    const first: number = count(basic)
    const top3Result: number = top3(basic)
    
    assert.equal(first, 24000)
    assert.equal(top3Result, 45000)
  })
})
