import { fold } from './array'
import { AnyReadonlyRecord } from './record'

export interface State<S, A> {
  (s: S): [A, S]
}

function _map<S, A, B>(f: (a: A) => B, state: State<S, A>): State<S, B> {
  return (s) => {
    const [a, s2] = state(s)
    return [f(a), s2]
  }
}
export function map<S, A, B>(state: State<S, A>, f: (a: A) => B): State<S, B>
export function map<S, A, B>(
  f: (a: A) => B,
): (state: State<S, A>) => State<S, B>
export function map<S, A, B>(
  fOrState: ((a: A) => B) | State<S, A>,
  f?: (a: A) => B,
): State<S, B> | ((state: State<S, A>) => State<S, B>) {
  return f
    ? _map(f, fOrState as State<S, A>)
    : (state: State<S, A>) => _map(fOrState as (a: A) => B, state)
}

function _flatMap<S, A, B>(
  f: (a: A) => State<S, B>,
  state: State<S, A>,
): State<S, B> {
  return (s) => {
    const [a, s2] = state(s)
    return f(a)(s2)
  }
}
export function flatMap<S, A, B>(
  state: State<S, A>,
  f: (a: A) => State<S, B>,
): State<S, B>
export function flatMap<S, A, B>(
  f: (a: A) => State<S, B>,
): (state: State<S, A>) => State<S, B>
export function flatMap<S, A, B>(
  fOrState: ((a: A) => State<S, B>) | State<S, A>,
  f?: (a: A) => State<S, B>,
): State<S, B> | ((state: State<S, A>) => State<S, B>) {
  return f
    ? _flatMap(f, fOrState as State<S, A>)
    : (state: State<S, A>) => _flatMap(fOrState as (a: A) => State<S, B>, state)
}

export function put<S>(s: S): State<S, void> {
  return () => [undefined, s]
}

export function get<S>(): State<S, S> {
  return (s) => [s, s]
}

export function modify<S>(f: (s: S) => S): State<S, void> {
  return (s) => [undefined, f(s)]
}

export function gets<S, A>(f: (s: S) => A): State<S, A> {
  return (s) => [f(s), s]
}

export function runState<S, A>(state: State<S, A>, s: S): [A, S] {
  return state(s)
}

export function selector<S, A>(state: State<S, A>): (s: S) => A
export function selector<S1, A, S2, B>(
  s1: State<S1, A>,
  s2: State<S2, B>,
): (s: S1) => B
export function selector<S1, A, S2, B, S3, C>(
  s1: State<S1, A>,
  s2: State<S2, B>,
  s3: State<S3, C>,
): (s: S1) => C
export function selector<S1, A, S2, B, S3, C, S4, D>(
  s1: State<S1, A>,
  s2: State<S2, B>,
  s3: State<S3, C>,
  s4: State<S4, D>,
): (s: S1) => D
export function selector<S1, A, S2, B, S3, C, S4, D, S5, E>(
  s1: State<S1, A>,
  s2: State<S2, B>,
  s3: State<S3, C>,
  s4: State<S4, D>,
  s5: State<S5, E>,
): (s: S1) => E
export function selector<S1, A, S2, B, S3, C, S4, D, S5, E, S6, F>(
  s1: State<S1, A>,
  s2: State<S2, B>,
  s3: State<S3, C>,
  s4: State<S4, D>,
  s5: State<S5, E>,
  s6: State<S6, F>,
): (s: S1) => F
export function selector<S1, A, S2, B, S3, C, S4, D, S5, E, S6, F, S7, G>(
  s1: State<S1, A>,
  s2: State<S2, B>,
  s3: State<S3, C>,
  s4: State<S4, D>,
  s5: State<S5, E>,
  s6: State<S6, F>,
  s7: State<S7, G>,
): (s: S1) => G
export function selector<
  S1,
  A,
  S2,
  B,
  S3,
  C,
  S4,
  D,
  S5,
  E,
  S6,
  F,
  S7,
  G,
  S8,
  H,
>(
  s1: State<S1, A>,
  s2: State<S2, B>,
  s3: State<S3, C>,
  s4: State<S4, D>,
  s5: State<S5, E>,
  s6: State<S6, F>,
  s7: State<S7, G>,
  s8: State<S8, H>,
): (s: S1) => H
export function selector<
  S1,
  A,
  S2,
  B,
  S3,
  C,
  S4,
  D,
  S5,
  E,
  S6,
  F,
  S7,
  G,
  S8,
  H,
  S9,
  I,
>(
  s1: State<S1, A>,
  s2: State<S2, B>,
  s3: State<S3, C>,
  s4: State<S4, D>,
  s5: State<S5, E>,
  s6: State<S6, F>,
  s7: State<S7, G>,
  s8: State<S8, H>,
  s9: State<S9, I>,
): (s: S1) => I
export function selector(
  ...states: readonly State<unknown, unknown>[]
): (s: unknown) => unknown {
  return (s) => {
    fold(states, s, (s, state) => {
      const [a] = state(s)
      return a
    })
  }
}

export const memoizedSelector = memoize(selector)
