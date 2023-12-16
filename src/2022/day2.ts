import { Day } from '../day'

class Day2 extends Day {
  constructor() {
    super(2022, 2)
  }

  solveForPartOne(input: string): number {
    return input.split('\n').reduce((sum, current) => {
      try {
        const choices = current.split(' ')
        const myChoice = toChoice(choices[1])
        sum +=
          matchResultPart1(toChoice(choices[0]), myChoice) + myChoice.valueOf()
      } catch (_error) {}
      return sum
    }, 0)
  }

  solveForPartTwo(input: string): number {
    return input.split('\n').reduce((sum, current) => {
      try {
        const choices = current.split(' ')
        const roundOutcome = toRoundOutcome(choices[1])
        const myChoice: CHOICE = matchResultPart2(
          toChoice(choices[0]),
          toRoundOutcome(choices[1]),
        )
        sum += roundOutcome + myChoice.valueOf()
      } catch (_error) {}
      return sum
    }, 0)
  }
}

export { Day2 }

export enum CHOICE {
  ROCK = 1, // A - X
  PAPER = 2, // B - Y
  SCISSORS = 3, // C - Z
}

export enum RoundOutcome {
  DEFEAT = 0,
  DRAW = 3,
  WIN = 6,
}

function toChoice(value: string): CHOICE {
  if (['A', 'X'].includes(value)) {
    return CHOICE.ROCK
  }
  if (['B', 'Y'].includes(value)) {
    return CHOICE.PAPER
  }
  if (['C', 'Z'].includes(value)) {
    return CHOICE.SCISSORS
  }
  throw new Error()
}

function toRoundOutcome(value: string): RoundOutcome {
  switch (value) {
    case 'X':
      return RoundOutcome.DEFEAT
    case 'Y':
      return RoundOutcome.DRAW
    case 'Z':
      return RoundOutcome.WIN
    default:
      throw new Error()
  }
}

function matchResultPart1(them: CHOICE, me: CHOICE): RoundOutcome {
  const input = {
    [CHOICE.ROCK]: {
      [CHOICE.ROCK]: RoundOutcome.DRAW,
      [CHOICE.PAPER]: RoundOutcome.WIN,
      [CHOICE.SCISSORS]: RoundOutcome.DEFEAT,
    },
    [CHOICE.PAPER]: {
      [CHOICE.ROCK]: RoundOutcome.DEFEAT,
      [CHOICE.PAPER]: RoundOutcome.DRAW,
      [CHOICE.SCISSORS]: RoundOutcome.WIN,
    },
    [CHOICE.SCISSORS]: {
      [CHOICE.ROCK]: RoundOutcome.WIN,
      [CHOICE.PAPER]: RoundOutcome.DEFEAT,
      [CHOICE.SCISSORS]: RoundOutcome.DRAW,
    },
  }
  return input[them][me]
}

function matchResultPart2(them: CHOICE, me: RoundOutcome): CHOICE {
  const input = {
    [CHOICE.ROCK]: {
      [RoundOutcome.DEFEAT]: CHOICE.SCISSORS,
      [RoundOutcome.DRAW]: CHOICE.ROCK,
      [RoundOutcome.WIN]: CHOICE.PAPER,
    },
    [CHOICE.PAPER]: {
      [RoundOutcome.DEFEAT]: CHOICE.ROCK,
      [RoundOutcome.DRAW]: CHOICE.PAPER,
      [RoundOutcome.WIN]: CHOICE.SCISSORS,
    },
    [CHOICE.SCISSORS]: {
      [RoundOutcome.WIN]: CHOICE.ROCK,
      [RoundOutcome.DEFEAT]: CHOICE.PAPER,
      [RoundOutcome.DRAW]: CHOICE.SCISSORS,
    },
  }
  return input[them][me]
}
