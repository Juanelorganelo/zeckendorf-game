import { ReadonlyRecord } from './record'

export interface AnyRow extends ReadonlyRecord<string, unknown> {}

export type Row<A extends AnyRow, B extends AnyRow> = A & B

export function row<A extends AnyRow, B extends AnyRow>(a: A, b: B): Row<A, B> {
  return { ...a, ...b }
}

function _insert<A extends AnyRow, K extends string, V>(
  a: A,
  key: K,
  value: V,
): Row<A, { [P in K]: V }> {
  return { ...a, [key]: value }
}
export function insert<A extends AnyRow, K extends string, V>(
  a: A,
  key: K,
  value: V,
): Row<A, { [P in K]: V }>
export function insert<A extends AnyRow, K extends string, V>(
  key: K,
  value: V,
): (a: A) => Row<A, { [P in K]: V }>
export function insert<A extends AnyRow, K extends string, V>(
  keyOrA: K | A,
  value?: V,
) {
  return value
    ? _insert(keyOrA as A, keyOrA as K, value)
    : (a: A) => _insert(a, keyOrA as K, value)
}
