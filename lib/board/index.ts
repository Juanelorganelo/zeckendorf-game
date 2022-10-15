import LinkedList from 'mnemonist/linked-list'
import { zeckendorf, uniqueFibonaccisLessThan } from './fibonacci'

export type Table = number[]

export interface Board {
  next(): Table | null
  guess(): number
  choose(index: number): void
  readonly length: number
}

export function createBoard(max: number): Board {
  let cursor = 0
  let length = 0
  const chosen = new LinkedList<number>()
  const factors: number[] = []
  const fibonaccis = uniqueFibonaccisLessThan(max)

  function next(): Table | null {
    const fib = fibonaccis[cursor]
    const table = [fib]

    for (let i = fib + 1; i <= max; i++) {
      const zs = zeckendorf(i)

      if (zs.includes(fib)) {
        table.push(i)
      }
    }

    cursor++
    length++
    factors.push(fib)
    return cursor > fibonaccis.length ? null : table
  }

  function guess(): number {
    const indices = chosen.toArray()
    return indices.reduce((sum, index) => {
      const factor = factors[index]
      return sum + factor
    }, 0)
  }

  function choose(index: number): void {
    const prev = chosen.last()

    if (cursor === 0) {
      throw new Error(
        `Attempted to choose a table from an empty board. Did you forget to call next()?`,
      )
    }

    if (prev && index < prev) {
      throw new Error(
        `Invalid selection order. Board tables must be chosen in increasing index order`,
      )
    }

    if (index >= length) {
      throw new Error(
        `Index out of bounds. Attempted to choose table ${index} for a board of length ${length}`,
      )
    }

    chosen.push(index)
  }

  return {
    next,
    guess,
    choose,
    length,
  }
}
