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

function matchResult(them: CHOICE, me: CHOICE): RoundOutcome {
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
    }
  }
  return input[them][me]
}

export function rockPaperScissorsTotal(input: string): number {
  return input.split('\n').reduce((sum, current) => {
    try {
      const choices = current.split(' ')
      sum += matchResult(toChoice(choices[0]), toChoice(choices[1])) + toChoice(choices[1]).valueOf()
    } catch (_error) {
    
    }
    return sum
  }, 0)
}
