import { Day } from '../day'

class Folder {
  name: string
  folders: Folder[]
  files: File[]
  parent?: Folder

  constructor(name: string, parent?: Folder) {
    this.name = name
    this.parent = parent
    this.folders = []
    this.files = []
  }

  addFolder(name: string) {
    this.folders.push(new Folder(name, this))
  }

  addFile(name: string, size: number) {
    this.files.push(new File(name, size))
  }

  size(): number {
    const filesSize = this.files.reduce((sum, file) => {
      sum += file.size
      return sum
    }, 0)
    const foldersSize = this.folders.reduce((sum, folder) => {
      sum += folder.size()
      return sum
    }, 0)
    return filesSize + foldersSize
  }

  private static prefix(index: number) {
    let result = ''
    for (let i = 0; i < index; i++) {
      result += '   '
    }
    return result
  }

  toString(index: number = 0): string {
    const name = `- ${this.name} (dir)`
    const files = this.files
      .map((f) => Folder.prefix(index + 1) + f.toString())
      .join('\n')
    let folders = null
    if (this.folders.length > 0) {
      folders = this.folders
        .map((f) => Folder.prefix(index + 1) + f.toString(index + 1))
        .join('\n')
    }
    return [name, files, folders].join('\n')
  }
}

class File {
  name: string
  size: number
  constructor(name: string, size: number) {
    this.name = name
    this.size = size
  }

  toString() {
    return `- ${this.name} (file, size=${this.size})`
  }
}

export class Day7 extends Day {
  private root: Folder = new Folder('/')
  private currentFolder: Folder = this.root

  constructor() {
    super(7)
  }

  solveForPartOne(input: string): number {
    const lines = input.split('\n')
    lines.forEach((line) => {
      if (line !== '') {
        if (this.isCommand(line)) {
          const command = line.split(' ')
          if (command[1] === 'cd') {
            this.cd(command[2])
          }
        } else {
          if (line.startsWith('dir')) {
            const folderName = line.split('dir ')[1]
            this.currentFolder.addFolder(folderName)
          } else {
            const [size, name] = line.split(' ')
            this.currentFolder.addFile(name, Number(size))
          }
        }
      }
    })
    return this.calculate(this.root, 0)
  }

  solveForPartTwo(input: string): number {
    this.solveForPartOne(input)

    const totalSizeAvailable = 70000000
    const diskSpaceNeeded = 30000000
    const diskSpaceUsed = this.root.size()
    const diskSpaceFree = totalSizeAvailable - diskSpaceUsed

    const diskSpaceToFree = diskSpaceNeeded - diskSpaceFree
    const folderSizes = this.getSizesWithAcc(this.root, []).sort((a, b) => b - a)
    return this.findMin(folderSizes, diskSpaceToFree)
  }

  isCommand(line: string): boolean {
    return line.startsWith('$')
  }

  cd(newFolderName: string) {
    switch (newFolderName) {
      case '/':
        this.currentFolder = this.root
        break
      case '..':
        this.currentFolder = this.currentFolder.parent ?? this.root
        break
      default:
        const newFolder = this.currentFolder.folders.find(
          (f) => f.name === newFolderName,
        )
        if (newFolder) {
          this.currentFolder = newFolder
        } else {
          console.warn(
            `Folder ${newFolder} not found. Here is Folder ${this.currentFolder.name}`,
          )
        }
        break
    }
  }

  calculateNext(currentFolder: Folder, accumulator: number) {
    return currentFolder.folders.reduce((acc, f) => {
      acc += this.calculate(f, accumulator)
      return acc
    }, 0)
  }

  calculate(folder: Folder, accumulator: number): number {
    const limit = 100000
    const folderSize = folder.size()
    accumulator += this.calculateNext(folder, accumulator)
    if (folderSize < limit) {
      accumulator += folderSize
    }
    return accumulator
  }

  findMin(sortedSizesByDesc: number[], diskSpaceToFree: number) {
    let index = 0
    while (sortedSizesByDesc[index] > diskSpaceToFree) {
      index++
    }
    return sortedSizesByDesc[index - 1]
  }

  getSizesWithAcc(folder: Folder, accu: number[]): number[] {
    accu.push(folder.size())
    folder.folders.forEach((f) => {
      accu.push(...this.getSizesWithAcc(f, []))
    })
    return accu
  }
}
