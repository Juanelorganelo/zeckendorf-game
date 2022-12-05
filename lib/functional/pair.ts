export type Pair<A, B> = readonly [A, B]

export const of = <A, B>(a: A, b: B): Pair<A, B> => [a, b] as const

export const swap = <A, B>([a, b]: Pair<A, B>): Pair<B, A> => of(b, a)

export const first = <A, B>(a: Pair<A, B>): A => a[0]

export const second = <A, B>(a: Pair<A, B>): B => a[1]

const _map =
  <A, B, C>(f: (b: B) => C) =>
  ([a, b]: Pair<A, B>): Pair<A, C> =>
    of(a, f(b))
export function map<A, B, C>(f: (b: B) => C): (pair: Pair<A, B>) => Pair<A, C>
export function map<A, B, C>(f: (b: B) => C, pair: Pair<A, B>): Pair<A, C>
export function map<A, B, C>(f: (b: B) => C, pair?: Pair<A, B>) {
  return pair ? _map(f)(pair) : _map(f)
}

export const mapFirst =
  <A, B, C>(f: (a: A) => C) =>
  ([a, b]: Pair<A, B>): Pair<C, B> =>
    of(f(a), b)

export const mapSecond =
  <A, B, C>(f: (b: B) => C) =>
  ([a, b]: Pair<A, B>): Pair<A, C> =>
    of(a, f(b))

export const flatMapFirst =
  <A, B, C>(f: (a: A) => Pair<C, B>) =>
  ([a]: Pair<A, B>): Pair<C, B> => {
    const [c, d] = f(a)
    return of(c, d)
  }

export const flatMapSecond =
  <A, B, C>(f: (b: B) => Pair<A, C>) =>
  ([, b]: Pair<A, B>): Pair<A, C> => {
    const [c, d] = f(b)
    return of(c, d)
  }
