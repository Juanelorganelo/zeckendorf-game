import { type Ordering } from './ordering'
import { type Option, none, some } from './option'

export type List<A> = readonly A[]

export const append =
  <A>(a: A) =>
  (as: List<A>): List<A> =>
    [...as, a]

export const prepend =
  <A>(a: A) =>
  (as: List<A>): List<A> =>
    [a, ...as]

export const concat =
  <A>(as: List<A>) =>
  (bs: List<A>): List<A> =>
    [...as, ...bs]

export const map =
  <A, B>(f: (a: A) => B) =>
  (as: List<A>): readonly B[] =>
    as.map(f)

export const flatMap =
  <A, B>(f: (a: A) => readonly B[]) =>
  (as: List<A>): readonly B[] =>
    as.flatMap(f)

export const filter =
  <A>(f: (a: A) => boolean) =>
  (as: List<A>): List<A> =>
    as.filter(f)

export const reject =
  <A>(f: (a: A) => boolean) =>
  (as: List<A>): List<A> =>
    as.filter((a) => !f(a))

export const foldLeft =
  <A, B>(f: (b: B, a: A) => B) =>
  (b: B) =>
  (as: List<A>): B =>
    as.reduce(f, b)

export const foldRight =
  <A, B>(f: (b: B, a: A) => B) =>
  (b: B) =>
  (as: List<A>): B =>
    as.reduceRight(f, b)

export const find =
  <A>(f: (a: A) => boolean) =>
  (as: List<A>): Option<A> => {
    const a = as.find(f)
    return a ? some(a) : none
  }

export const indexOf =
  <A>(a: A) =>
  (as: List<A>): Option<number> => {
    const i = as.indexOf(a)
    return i >= 0 ? some(i) : none
  }

export const findIndex =
  <A>(f: (a: A) => boolean) =>
  (as: List<A>): Option<number> => {
    const i = as.findIndex(f)
    return i >= 0 ? some(i) : none
  }

export const head = <A>(as: List<A>): Option<A> => {
  const a = as[0]
  return a ? some(a) : none
}

export const last = <A>(as: List<A>): Option<A> => {
  const a = as[as.length - 1]
  return a ? some(a) : none
}

export const tail = <A>(as: List<A>): Option<List<A>> => {
  const a = as[0]
  return a ? some(as.slice(1)) : none
}

export const init = <A>(as: List<A>): Option<List<A>> => {
  const a = as[as.length - 1]
  return a ? some(as.slice(0, -1)) : none
}

export const uncons = <A>(as: List<A>): Option<[A, List<A>]> => {
  const a = as[0]
  return a ? some([a, as.slice(1)]) : none
}

export const take =
  (n: number) =>
  <A>(as: List<A>): List<A> =>
    as.slice(0, n)

export const drop =
  (n: number) =>
  <A>(as: List<A>): List<A> =>
    as.slice(n)

export const sort =
  <A>(f: (a: A, b: A) => Ordering) =>
  (as: List<A>): List<A> =>
    [...as].sort(f)

export const takeWhile =
  <A>(f: (a: A) => boolean) =>
  (as: List<A>): List<A> => {
    const i = as.findIndex((a) => !f(a))
    return i >= 0 ? as.slice(0, i) : as
  }

export const dropWhile =
  <A>(f: (a: A) => boolean) =>
  (as: List<A>): List<A> => {
    const i = as.findIndex((a) => !f(a))
    return i >= 0 ? as.slice(i) : []
  }

export const reverse = <A>(as: List<A>): List<A> => [...as].reverse()

export const zipWith =
  <A, B, C>(f: (a: A, b: B) => C) =>
  (as: List<A>) =>
  (bs: readonly B[]): readonly C[] => {
    const cs = []
    const len = Math.min(as.length, bs.length)
    for (let i = 0; i < len; i++) {
      cs.push(f(as[i], bs[i]))
    }
    return cs
  }

export const zip =
  <A, B>(as: List<A>) =>
  (bs: readonly B[]) =>
    zipWith((a, b) => [a, b] as const)(as)(bs)
