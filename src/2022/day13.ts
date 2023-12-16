import { Day } from '../day'

enum Order {
  OK,
  KO,
  NEXT
}

export class Day13 extends Day {
  constructor() {
    super(2022, 13)
  }
  
  solveForPartOne(input: string): number {
    return 0;
  }
  
  solveForPartTwo(input: string): number {
    return 0;
  }
  
  compare(left: number, right: number): Order {
    return Order.OK
  }
    
}
