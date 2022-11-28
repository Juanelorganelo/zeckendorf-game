import { Option, some, none } from './option'

export type AnyArray = readonly any[]

export function head<A>(as: readonly A[]): Option<A> {
  return _get(as, 0)
}
export function tail<A>(as: readonly A[]): Option<readonly A[]> {
  return _remove(as, 0)
}

function _get<A>(as: readonly A[], index: number): Option<A> {
  return index < 0 || index >= as.length ? none() : some(as[index])
}
export function get<A>(as: readonly A[], index: number): Option<A>
export function get<A>(index: number): (as: readonly A[]) => Option<A>
export function get<A>(
  indexOrAs: number | readonly A[],
  index?: number,
): Option<A> | ((as: readonly A[]) => Option<A>) {
  return index === undefined
    ? (as: readonly A[]) => _get(as, indexOrAs as number)
    : _get(indexOrAs as readonly A[], index)
}

function _insert<A>(as: readonly A[], index: number, a: A): readonly A[] {
  return index < 0 || index >= as.length
    ? as
    : [...as.slice(0, index), a, ...as.slice(index + 1)]
}
export function insert<A>(as: readonly A[], index: number, a: A): readonly A[]
export function insert<A>(
  index: number,
  a: A,
): (as: readonly A[]) => readonly A[]
export function insert<A>(
  indexOrAs: number | readonly A[],
  indexOrA: number | A,
  a?: A,
): readonly A[] | ((as: readonly A[]) => readonly A[]) {
  return a === undefined
    ? (as: readonly A[]) => _insert(as, indexOrAs as number, indexOrA as A)
    : _insert(indexOrAs as readonly A[], indexOrA as number, a)
}

function _modify<A>(
  as: readonly A[],
  index: number,
  f: (a: A) => A,
): readonly A[] {
  return index < 0 || index >= as.length
    ? as
    : [...as.slice(0, index), f(as[index]), ...as.slice(index + 1)]
}
export function modify<A>(
  as: readonly A[],
  index: number,
  f: (a: A) => A,
): readonly A[]
export function modify<A>(
  index: number,
  f: (a: A) => A,
): (as: readonly A[]) => readonly A[]
export function modify<A>(
  indexOrAs: number | readonly A[],
  indexOrF: number | ((a: A) => A),
  f?: (a: A) => A,
): readonly A[] | ((as: readonly A[]) => readonly A[]) {
  return f === undefined
    ? (as: readonly A[]) =>
        _modify(as, indexOrAs as number, indexOrF as (a: A) => A)
    : _modify(indexOrAs as readonly A[], indexOrF as number, f)
}

function _remove<A>(as: readonly A[], index: number): Option<readonly A[]> {
  return index < 0 || index >= as.length
    ? none()
    : some([...as.slice(0, index), ...as.slice(index + 1)])
}
export function remove<A>(as: readonly A[], index: number): Option<readonly A[]>
export function remove<A>(
  index: number,
): (as: readonly A[]) => Option<readonly A[]>
export function remove<A>(
  indexOrAs: number | readonly A[],
  index?: number,
): Option<readonly A[]> | ((as: readonly A[]) => Option<readonly A[]>) {
  return index === undefined
    ? (as: readonly A[]) => _remove(as, indexOrAs as number)
    : _remove(indexOrAs as readonly A[], index)
}

function _fold<A, B>(as: readonly A[], b: B, f: (b: B, a: A) => B): B {
  return as.reduce(f, b)
}
export function fold<A, B>(as: readonly A[], b: B, f: (b: B, a: A) => B): B
export function fold<A, B>(b: B, f: (b: B, a: A) => B): (as: readonly A[]) => B
export function fold<A, B>(
  bOrAs: B | readonly A[],
  bOrF: B | ((b: B, a: A) => B),
  f?: (b: B, a: A) => B,
): B | ((as: readonly A[]) => B) {
  return f === undefined
    ? (as: readonly A[]) => _fold(as, bOrAs as B, bOrF as (b: B, a: A) => B)
    : _fold(bOrAs as readonly A[], bOrF as B, f)
}

// methods
export function includes<A>(as: readonly A[], a: A): boolean
export function includes<A>(a: A): (as: readonly A[]) => boolean
export function includes<A>(
  aOrAs: A | readonly A[],
  a?: A,
): boolean | ((as: readonly A[]) => boolean) {
  return a === undefined
    ? (as: readonly A[]) => as.includes(aOrAs as A)
    : (aOrAs as readonly A[]).includes(a)
}
