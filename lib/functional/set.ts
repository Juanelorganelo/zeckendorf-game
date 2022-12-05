/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
const _append =
  <A>(a: A) =>
  (as: ReadonlySet<A>): ReadonlySet<A> =>
    new Set([...as, a])
export function append<A>(as: ReadonlySet<A>, a: A): ReadonlySet<A>
export function append<A>(a: A): (as: ReadonlySet<A>) => ReadonlySet<A>
export function append<A>(
  a: ReadonlySet<A> | A,
  as?: A,
): ReadonlySet<A> | ((as: ReadonlySet<A>) => ReadonlySet<A>) {
  return as ? _append(as)(a as ReadonlySet<NonNullable<A>>) : _append(a as A)
}

const _remove =
  <A>(a: A) =>
  (set: ReadonlySet<A>): ReadonlySet<A> => {
    const copy = new Set(set)
    copy.delete(a)
    return copy
  }
export function remove<A>(a: A, set: ReadonlySet<A>): ReadonlySet<A>
export function remove<A>(a: A): (set: ReadonlySet<A>) => ReadonlySet<A>
export function remove<A>(
  a: A,
  set?: ReadonlySet<A>,
): ReadonlySet<A> | ((set: ReadonlySet<A>) => ReadonlySet<A>) {
  return set === undefined ? _remove(a) : _remove(a)(set)
}

const _union =
  <A>(other: ReadonlySet<A>) =>
  (set: ReadonlySet<A>) =>
    new Set([...set, ...other])
export function union<A>(
  other: ReadonlySet<A>,
  set: ReadonlySet<A>,
): ReadonlySet<A>
export function union<A>(
  other: ReadonlySet<A>,
): (set: ReadonlySet<A>) => ReadonlySet<A>
export function union<A>(
  other: ReadonlySet<A>,
  set?: ReadonlySet<A>,
): ReadonlySet<A> | ((set: ReadonlySet<A>) => ReadonlySet<A>) {
  return set === undefined ? _union(other) : _union(other)(set)
}

const _range = (start: number, end: number): ReadonlySet<number> => {
  const set = new Set<number>()
  for (let i = start; i <= end; i++) {
    set.add(i)
  }
  return set
}
export function range(start: number, end: number): ReadonlySet<number>
export function range(start: number): (end: number) => ReadonlySet<number>
export function range(
  start: number,
  end?: number,
): ReadonlySet<number> | ((end: number) => ReadonlySet<number>) {
  return end === undefined
    ? (end: number) => _range(start, end)
    : _range(start, end)
}

const _fold = <A, B>(f: (b: B, a: A) => B, b: B, set: ReadonlySet<A>): B => {
  let acc = b
  for (const a of set) {
    acc = f(acc, a)
  }
  return acc
}
export function fold<A, B>(f: (b: B, a: A) => B, b: B, set: ReadonlySet<A>): B
export function fold<A, B>(
  f: (b: B, a: A) => B,
  b: B,
): (set: ReadonlySet<A>) => B
export function fold<A, B>(
  f: (b: B, a: A) => B,
  b: B,
  set?: ReadonlySet<A>,
): B | ((set: ReadonlySet<A>) => B) {
  return set === undefined
    ? (set: ReadonlySet<A>) => _fold(f, b, set)
    : _fold(f, b, set)
}

export function intersection<A>(
  set: ReadonlySet<A>,
  other: ReadonlySet<A>,
): ReadonlySet<A> {
  return new Set([...set].filter((a) => other.has(a)))
}

export function difference<A>(
  set: ReadonlySet<A>,
  other: ReadonlySet<A>,
): ReadonlySet<A> {
  return new Set([...set].filter((a) => !other.has(a)))
}

export function symmetricDifference<A>(
  set: ReadonlySet<A>,
  other: ReadonlySet<A>,
): ReadonlySet<A> {
  return new Set(
    [...set]
      .filter((a) => !other.has(a))
      .concat([...other].filter((a) => !set.has(a))),
  )
}

export function isSubset<A>(
  set: ReadonlySet<A>,
  other: ReadonlySet<A>,
): boolean {
  return [...set].every((a) => other.has(a))
}

export function isSuperset<A>(
  set: ReadonlySet<A>,
  other: ReadonlySet<A>,
): boolean {
  return isSubset(other, set)
}

export function isProperSubset<A>(
  set: ReadonlySet<A>,
  other: ReadonlySet<A>,
): boolean {
  return set.size < other.size && isSubset(set, other)
}

export function isProperSuperset<A>(
  set: ReadonlySet<A>,
  other: ReadonlySet<A>,
): boolean {
  return isProperSubset(other, set)
}
