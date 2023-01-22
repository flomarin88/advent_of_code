import { Day7 } from '../../src/2022/day7'
import * as assert from 'assert'

describe('2022 - Day 7', () => {
  const day = new Day7()

  describe('Part 1', () => {
    it('returns big folders with their summed size', () => {
      const input = '$ cd /\n' +
        '$ ls\n' +
        'dir a\n' +
        '14848514 b.txt\n' +
        '8504156 c.dat\n' +
        'dir d\n' +
        '$ cd a\n' +
        '$ ls\n' +
        'dir e\n' +
        '29116 f\n' +
        '2557 g\n' +
        '62596 h.lst\n' +
        '$ cd e\n' +
        '$ ls\n' +
        '584 i\n' +
        '$ cd ..\n' +
        '$ cd ..\n' +
        '$ cd d\n' +
        '$ ls\n' +
        '4060174 j\n' +
        '8033020 d.log\n' +
        '5626152 d.ext\n' +
        '7214296 k\n'

      const result = day.solveForPartOne(input)

      // - / (dir)
      //   - a (dir)
      //     - e (dir)
      //       - i (file, size=584)
      //     - f (file, size=29116)
      //     - g (file, size=2557)
      //     - h.lst (file, size=62596)
      //   - b.txt (file, size=14848514)
      //   - c.dat (file, size=8504156)
      //   - d (dir)
      //     - j (file, size=4060174)
      //     - d.log (file, size=8033020)
      //     - d.ext (file, size=5626152)
      //     - k (file, size=7214296)
      
      assert.equal(result, 95437)
    })
  })
})
