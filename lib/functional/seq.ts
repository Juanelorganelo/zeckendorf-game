import * as list from './list'
import * as option from './option'
import { Pair } from './pair'
import { type Variant } from './variant'

export interface Nil extends Variant<'Nil'> {}

export interface Cons<A> extends Variant<'Cons'> {
  readonly head: A
  readonly tail: () => Seq<A>
}

export type Seq<A> = Nil | Cons<A>

export const nil = <A>(): Seq<A> => ({ variant: 'Nil' })
export const cons = <A>(head: A, tail: () => Seq<A>): Cons<A> => ({
  head,
  tail,
  variant: 'Cons',
})

export const empty = nil

export const unfold = <A, B>(
  f: (b: B) => option.Option<Pair<A, B>>,
  b: B,
): Seq<A> => {
  const o = f(b)
  return option.isSome(o)
    ? cons(o.value[0], () => unfold(f, o.value[1]))
    : nil()
}

export const fromList = <A>(l: list.List<A>): Seq<A> => {
  const parts = list.uncons(l)
  return option.match(parts, {
    // eslint-disable-next-line functional/prefer-tacit
    None: () => nil<A>(),
    Some: ([head, tail]: Pair<A, list.List<A>>) =>
      cons(head, () => fromList(tail)),
  })
}

export function range(end: number): Seq<number>
export function range(start: number, end: number): Seq<number>
export function range(
  start: number,
  end?: number,
): Seq<number> | ((end: number) => Seq<number>) {
  const s = end ? start : 0
  const e = end || start
  return s < e ? cons(s, () => range(s + 1, e)) : nil()
}

export function iterate<A>(f: (a: A) => A, initial: A): Seq<A> {
  return cons(initial, () => iterate(f, f(initial)))
}

export const isCons = <A>(seq: Seq<A>): seq is Cons<A> => seq.variant === 'Cons'
export const isEmpty = <A>(seq: Seq<A>): seq is Nil => seq.variant === 'Nil'

const _index = <A>(seq: Seq<A>, n: number): option.Option<A> =>
  n < 0
    ? option.none
    : isCons(seq)
    ? n === 0
      ? option.some(seq.head)
      : _index(seq.tail(), n - 1)
    : option.none
export function index<A>(seq: Seq<A>, n: number): option.Option<A>
export function index<A>(n: number): (seq: Seq<A>) => option.Option<A>
export function index<A>(
  seq: Seq<A> | number,
  n?: number,
): option.Option<A> | ((seq: Seq<A>) => option.Option<A>) {
  return n ? _index(seq as Seq<A>, n) : (n: Seq<A>) => _index(n, seq as number)
}

const _concat =
  <A>(seq: Seq<A>) =>
  (other: Seq<A>): Seq<A> =>
    isEmpty(seq) ? other : cons(seq.head, () => _concat(seq.tail())(other))
export function concat<A>(seq: Seq<A>, other: Seq<A>): Seq<A>
export function concat<A>(seq: Seq<A>): (other: Seq<A>) => Seq<A>
export function concat<A>(seq: Seq<A>, other?: Seq<A>) {
  return other === undefined ? _concat(seq) : _concat(seq)(other)
}

const _map =
  <A, B>(f: (a: A) => B) =>
  (seq: Seq<A>): Seq<B> =>
    isCons(seq) ? cons(f(seq.head), () => _map(f)(seq.tail())) : seq
export function map<A, B>(seq: Seq<A>, f: (a: A) => B): Seq<B>
export function map<A, B>(f: (a: A) => B): (seq: Seq<A>) => Seq<B>
export function map<A, B>(seq: Seq<A> | ((a: A) => B), f?: (a: A) => B) {
  return f ? _map(f)(seq as Seq<A>) : _map(seq as (a: A) => B)
}

const _flatMap =
  <A, B>(f: (a: A) => Seq<B>) =>
  (seq: Seq<A>): Seq<B> =>
    isCons(seq) ? concat(f(seq.head), _flatMap(f)(seq.tail())) : seq
export function flatMap<A, B>(f: (a: A) => Seq<B>, seq: Seq<A>): Seq<B>
export function flatMap<A, B>(f: (a: A) => Seq<B>): (seq: Seq<A>) => Seq<B>
export function flatMap<A, B>(f: (a: A) => Seq<B>, seq?: Seq<A>) {
  return seq === undefined ? _flatMap(f) : _flatMap(f)(seq)
}

const _filter =
  <A>(f: (a: A) => boolean) =>
  (seq: Seq<A>): Seq<A> =>
    isCons(seq)
      ? f(seq.head)
        ? cons(seq.head, () => _filter(f)(seq.tail()))
        : _filter(f)(seq.tail())
      : seq
export function filter<A>(f: (a: A) => boolean, seq: Seq<A>): Seq<A>
export function filter<A>(f: (a: A) => boolean): (seq: Seq<A>) => Seq<A>
export function filter<A>(f: (a: A) => boolean, seq?: Seq<A>) {
  return seq === undefined ? _filter(f) : _filter(f)(seq)
}

const _reject =
  <A>(f: (a: A) => boolean) =>
  (seq: Seq<A>): Seq<A> =>
    isCons(seq)
      ? f(seq.head)
        ? _reject(f)(seq.tail())
        : cons(seq.head, () => _reject(f)(seq.tail()))
      : seq
export function reject<A>(f: (a: A) => boolean, seq: Seq<A>): Seq<A>
export function reject<A>(f: (a: A) => boolean): (seq: Seq<A>) => Seq<A>
export function reject<A>(f: (a: A) => boolean, seq?: Seq<A>) {
  return seq === undefined ? _reject(f) : _reject(f)(seq)
}

const _fold =
  <A, B>(f: (acc: B, a: A) => B) =>
  (initial: B) =>
  (seq: Seq<A>): B =>
    isCons(seq) ? _fold(f)(f(initial, seq.head))(seq.tail()) : initial
export function fold<A, B>(seq: Seq<A>, f: (acc: B, a: A) => B, initial: B): B
export function fold<A, B>(
  f: (acc: B, a: A) => B,
  initial: B,
): (seq: Seq<A>) => B
export function fold<A, B>(
  seqOrF: Seq<A> | ((acc: B, a: A) => B),
  fOrInitial?: ((acc: B, a: A) => B) | B,
  initial?: B,
) {
  return fOrInitial === undefined
    ? (seq: Seq<A>) => _fold(seqOrF as (acc: B, a: A) => B)(initial as B)(seq)
    : _fold(seqOrF as (acc: B, a: A) => B)(fOrInitial as B)(initial as Seq<A>)
}

const _foldRight =
  <A, B>(f: (a: A, acc: B) => B, initial: B) =>
  (seq: Seq<A>): B =>
    isEmpty(seq) ? initial : f(seq.head, _foldRight(f, initial)(seq.tail()))
export function foldRight<A, B>(
  seq: Seq<A>,
  f: (a: A, acc: B) => B,
  initial: B,
): B
export function foldRight<A, B>(
  f: (a: A, acc: B) => B,
  initial: B,
): (seq: Seq<A>) => B
export function foldRight<A, B>(
  seqOrF: Seq<A> | ((a: A, acc: B) => B),
  fOrInitial: ((a: A, acc: B) => B) | B,
  initial?: B,
) {
  return initial
    ? _foldRight(fOrInitial as (a: A, acc: B) => B, initial)(seqOrF as Seq<A>)
    : (seq: Seq<A>) =>
        _foldRight(seqOrF as (a: A, acc: B) => B, fOrInitial as B)(seq)
}
