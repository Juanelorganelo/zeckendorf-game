import { type Variant } from './variant'
export interface Ok<A> extends Variant<'Ok'> {
  readonly value: A
}

export interface Err<E> extends Variant<'Err'> {
  readonly error: E
}

export type Result<A, E> = Ok<A> | Err<E>

export const ok = <A>(a: A): Ok<A> => ({ variant: 'Ok', value: a })

export const err = <E>(e: E): Err<E> => ({ variant: 'Err', error: e })

export const isOk = <A, E>(result: Result<A, E>): result is Ok<A> =>
  result.variant === 'Ok'

export const isErr = <A, E>(result: Result<A, E>): result is Err<E> =>
  result.variant === 'Err'

const _map =
  <A, B, E>(f: (a: A) => B) =>
  (result: Result<A, E>): Result<B, E> =>
    isOk(result) ? ok(f(result.value)) : result
export function map<A, B, E>(f: (a: A) => B, result: Result<A, E>): Result<B, E>
export function map<A, B, E>(
  f: (a: A) => B,
): (result: Result<A, E>) => Result<B, E>
export function map<A, B, E>(f: (a: A) => B, result?: Result<A, E>) {
  return result === undefined ? _map(f) : _map(f)(result)
}

const _flatMap =
  <A, B, E>(f: (a: A) => Result<B, E>) =>
  (result: Result<A, E>): Result<B, E> =>
    isOk(result) ? f(result.value) : result
export function flatMap<A, B, E>(
  f: (a: A) => Result<B, E>,
  result: Result<A, E>,
): Result<B, E>
export function flatMap<A, B, E>(
  f: (a: A) => Result<B, E>,
): (result: Result<A, E>) => Result<B, E>
export function flatMap<A, B, E>(
  f: (a: A) => Result<B, E>,
  result?: Result<A, E>,
) {
  return result === undefined ? _flatMap(f) : _flatMap(f)(result)
}

const _mapErr =
  <A, E, F>(f: (e: E) => F) =>
  (result: Result<A, E>): Result<A, F> =>
    isErr(result) ? err(f(result.error)) : result
export function mapErr<A, E, F>(
  f: (e: E) => F,
  result: Result<A, E>,
): Result<A, F>
export function mapErr<A, E, F>(
  f: (e: E) => F,
): (result: Result<A, E>) => Result<A, F>
export function mapErr<A, E, F>(f: (e: E) => F, result?: Result<A, E>) {
  return result === undefined ? _mapErr(f) : _mapErr(f)(result)
}

const _mapBoth =
  <A, B, E, F>(f: (a: A) => B, g: (e: E) => F) =>
  (result: Result<A, E>): Result<B, F> =>
    isOk(result) ? ok(f(result.value)) : err(g(result.error))
export function mapBoth<A, B, E, F>(
  f: (a: A) => B,
  g: (e: E) => F,
  result: Result<A, E>,
): Result<B, F>
export function mapBoth<A, B, E, F>(
  f: (a: A) => B,
  g: (e: E) => F,
): (result: Result<A, E>) => Result<B, F>
export function mapBoth<A, B, E, F>(
  f: (a: A) => B,
  g: (e: E) => F,
  result?: Result<A, E>,
) {
  return result === undefined ? _mapBoth(f, g) : _mapBoth(f, g)(result)
}

const _filter =
  <A, E>(f: (a: A) => boolean, e: E) =>
  (result: Result<A, E>) =>
    isOk(result) && f(result.value) ? result : err(e)
export function filter<A, E>(
  f: (a: A) => boolean,
  e: E,
  result: Result<A, E>,
): Result<A, E>
export function filter<A, E>(
  f: (a: A) => boolean,
  e: E,
): (result: Result<A, E>) => Result<A, E>
export function filter<A, E>(
  f: (a: A) => boolean,
  e: E,
  result?: Result<A, E>,
) {
  return result === undefined ? _filter(f, e) : _filter(f, e)(result)
}

const _reject =
  <A, E>(f: (a: A) => boolean, e: E) =>
  (result: Result<A, E>) =>
    isOk(result) && !f(result.value) ? result : err(e)
export function reject<A, E>(
  f: (a: A) => boolean,
  e: E,
  result: Result<A, E>,
): Result<A, E>
export function reject<A, E>(
  f: (a: A) => boolean,
  e: E,
): (result: Result<A, E>) => Result<A, E>
export function reject<A, E>(
  f: (a: A) => boolean,
  e: E,
  result?: Result<A, E>,
) {
  return result === undefined ? _reject(f, e) : _reject(f, e)(result)
}
