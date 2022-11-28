import * as A from 'lib/functional/array'
import * as O from 'lib/functional/option'
import * as R from 'lib/functional/result'

import { type Result } from 'lib/functional/result'

import { filter, pipe, range } from 'remeda'
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

export function table(max: number, index: number): Result<Table, BoardError> {
  const fibs = uniqueFibonaccisLessThan(max)

  return pipe(
    A.get(fibs, index),
    O.fold(
      () => R.err(new TableOutOfBoundsError(index)),
      (n) => {
        const xs = range(n, max)
        return R.ok(filter(xs, (x) => A.includes(zeckendorf(x), n)))
      },
    ),
  )
}

export function zeckendorfSum(tables: readonly Table[]): number {
  return A.fold(tables, 0, (a, b) =>
    O.fold(
      A.head(b),
      () => a,
      (f) => a + f,
    ),
  )
}

interface BoardState {
  readonly tables: readonly Table[]
}
