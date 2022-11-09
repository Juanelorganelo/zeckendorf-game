import invariant from 'invariant'
import { zeckendorf, uniqueFibonaccisLessThan } from './fibonacci'

export type Table = number[]

export interface Board {
  next(): Table | null
  guess(): number
  choose(): void
  readonly length: number
}

export function createBoard(max: number): Board {
  let index = 0
  const chosen = new Set<number>()
  const factors: number[] = []
  const fibonaccis = uniqueFibonaccisLessThan(max)

  function next(): Table | null {
    if (index > fibonaccis.length) {
      return null
    }

    const fib = fibonaccis[index]
    const table = [fib]

    for (let i = fib + 1; i <= max; i++) {
      const zs = zeckendorf(i)

      if (zs.includes(fib)) {
        table.push(i)
      }
    }

    index++
    factors.push(fib)
    return table
  }

  function guess(): number {
    const indices = Array.from(chosen)
    return indices.reduce((sum, index) => {
      const factor = factors[index]
      return sum + factor
    }, 0)
  }

  function choose(): void {
    invariant(
      index > 0,
      `Attempted to choose a table from an empty board. Did you forget to call next()?`,
    )

    chosen.add(index - 1)
  }

  return {
    next,
    guess,
    choose,
    length: index,
  }
}
