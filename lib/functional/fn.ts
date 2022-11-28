import { type Unit } from './unit'
import { isReadonlyRecord, type ReadonlyRecord } from './record'
import { fold } from './array'

export { pipe } from 'remeda'

export function tap<A>(fn: (a: A) => Unit): (a: A) => A {
  return (a) => {
    fn(a)
    return a
  }
}

export type AnyObject = ReadonlyRecord<string, unknown>

function _memoize<F extends (...args: readonly unknown[]) => unknown>(
  fn: (...args: readonly unknown[]) => unknown,
): (...args: readonly unknown[]) => unknown {
  const refSyms = new WeakMap<AnyObject, symbol>()
  const cache = new Map<symbol, unknown>()

  return (...args) => {
    const key = fold(args, Symbol(''), (acc, arg) => {
      if (isReadonlyRecord(arg)) {
        if (refSyms.has(arg)) {
          return concat(acc, refSyms.get(arg) as symbol)
        }
        const sym = refSyms.set(arg, Symbol())
        return acc + sym
      }
      return acc + arg
    })
  }
}

export function memoize<A, B>(fn: (a: A) => B): (a: A) => B
export function memoize<A, B, C>(fn: (a: A, b: B) => C): (a: A, b: B) => C
export function memoize<A, B, C>(
  fn: (b: B) => (a: A) => C,
): (a: A) => (b: B) => C
export function memoize<A, B, C, D>(
  fn: (a: A, b: B, c: C) => D,
): (a: A, b: B, c: C) => D
export function memoize<A, B, C, D>(
  fn: (b: B, c: C) => (a: A) => D,
): (a: A) => (b: B, c: C) => D
export function memoize<A, B, C, D, E>(
  fn: (a: A, b: B, c: C, d: D) => E,
): (a: A, b: B, c: C, d: D) => E
export function memoize<A, B, C, D, E>(
  fn: (b: B, c: C, d: D) => (a: A) => E,
): (a: A) => (b: B, c: C, d: D) => E
export function memoize<A, B, C, D, E, F>(
  fn: (a: A, b: B, c: C, d: D, e: E) => F,
): (a: A, b: B, c: C, d: D, e: E) => F
export function memoize<A, B, C, D, E, F>(
  fn: (b: B, c: C, d: D, e: E) => (a: A) => F,
): (a: A) => (b: B, c: C, d: D, e: E) => F
export function memoize<A, B, C, D, E, F, G>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
): (a: A, b: B, c: C, d: D, e: E, f: F) => G
export function memoize<A, B, C, D, E, F, G>(
  fn: (b: B, c: C, d: D, e: E, f: F) => (a: A) => G,
): (a: A) => (b: B, c: C, d: D, e: E, f: F) => G
