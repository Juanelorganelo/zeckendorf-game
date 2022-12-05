import { fromArray } from 'lib/functional/list'
import * as O from 'lib/functional/option'

import { type Result, ok, err } from 'lib/functional/result'

import { range } from 'remeda'
import { zeckendorf, uniqueFibonaccisLessThan } from './fibonacci'

export type Table = readonly number[]

class TableOutOfBoundsError extends Error {
  constructor(readonly index: number) {
    super(`Table index ${index} out of bounds`)
  }
}

class TableAlreadyFilledError extends Error {
  constructor(readonly index: number) {
    super(`Table index ${index} already filled`)
  }
}
export type BoardError = TableOutOfBoundsError | TableAlreadyFilledError

export function table(max: number, index: number): Result<BoardError, Table> {
  const fibs = uniqueFibonaccisLessThan(max)
  const current = list(fibs).get(index)

  return current.match({
    None: () => err(new TableOutOfBoundsError(index)),
    Some: (n) => ok(range(n, max).filter((x) => zeckendorf(n).includes(x))),
  })
}

export function zeckendorfSum(tables: readonly Table[]): number {
  return list(tables).fold(0, (a, b) =>
    list(b)
      .head()
      .match({
        None: () => a,
        Some: (x) => a + x,
      }),
  )
}

interface BoardState {
  readonly tables: readonly Table[]
}
