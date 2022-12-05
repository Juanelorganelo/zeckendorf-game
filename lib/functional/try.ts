import { type Variant } from './variant'

export interface Success<A> extends Variant<'Success'> {
  readonly value: A
}

export interface Failure<E> extends Variant<'Failure'> {
  readonly error: E
}

export type Try<E extends Error, A> = Success<A> | Failure<E>

export function ok<E extends Error, A>(value: A): Try<E, A> {
  return { variant: 'Success', value }
}

export function err<E extends Error, A>(value: E): Try<E, A> {
  return { variant: 'Failure', error: value }
}

export function tryCatch<E extends Error, A>(
  f: () => A,
  onError: <F extends Error>(e: F) => E,
): Try<E, A> {
  try {
    return ok(f())
  } catch (e) {
    if (e instanceof Error) {
      return err(onError(e))
    }
    throw new Error(
      `An error was thrown that is not an instance of Error: ${String(e)}`,
    )
  }
}

export function isSuccess<E extends Error, A>(
  result: Try<E, A>,
): result is Success<A> {
  return result.variant === 'Success'
}

export function isFailure<E extends Error, A>(
  result: Try<E, A>,
): result is Failure<E> {
  return result.variant === 'Failure'
}

const _map =
  <E extends Error, A, B>(f: (a: A) => B) =>
  (result: Try<E, A>): Try<E, B> =>
    isSuccess(result) ? ok(f(result.value)) : result
export function map<E extends Error, A, B>(
  f: (a: A) => B,
  result: Try<E, A>,
): Try<E, B>
export function map<E extends Error, A, B>(
  f: (a: A) => B,
): (result: Try<E, A>) => Try<E, B>
export function map<E extends Error, A, B>(f: (a: A) => B, result?: Try<E, A>) {
  return result === undefined ? _map(f) : _map(f)(result)
}

const _flatMap =
  <E extends Error, A, B>(f: (a: A) => Try<E, B>) =>
  (result: Try<E, A>): Try<E, B> =>
    isSuccess(result) ? f(result.value) : result
export function flatMap<E extends Error, A, B>(
  f: (a: A) => Try<E, B>,
  result: Try<E, A>,
): Try<E, B>
export function flatMap<E extends Error, A, B>(
  f: (a: A) => Try<E, B>,
): (result: Try<E, A>) => Try<E, B>
export function flatMap<E extends Error, A, B>(
  f: (a: A) => Try<E, B>,
  result?: Try<E, A>,
) {
  return result === undefined ? _flatMap(f) : _flatMap(f)(result)
}

const _fold =
  <E extends Error, A, B>(f: (e: E) => B, g: (a: A) => B) =>
  (result: Try<E, A>): B =>
    isSuccess(result) ? g(result.value) : f(result.error)
export function fold<E extends Error, A, B>(
  f: (e: E) => B,
  g: (a: A) => B,
  result: Try<E, A>,
): B
export function fold<E extends Error, A, B>(
  f: (e: E) => B,
  g: (a: A) => B,
): (result: Try<E, A>) => B
export function fold<E extends Error, A, B>(
  f: (e: E) => B,
  g: (a: A) => B,
  result?: Try<E, A>,
) {
  return result === undefined ? _fold(f, g) : _fold(f, g)(result)
}

const _mapError =
  <E extends Error, F extends Error, A>(f: (e: E) => F) =>
  (result: Try<E, A>): Try<F, A> =>
    isSuccess(result) ? result : err(f(result.error))
export function mapError<E extends Error, F extends Error, A>(
  f: (e: E) => F,
  result: Try<E, A>,
): Try<F, A>
export function mapError<E extends Error, F extends Error, A>(
  f: (e: E) => F,
): (result: Try<E, A>) => Try<F, A>
export function mapError<E extends Error, F extends Error, A>(
  f: (e: E) => F,
  result?: Try<E, A>,
) {
  return result === undefined ? _mapError(f) : _mapError(f)(result)
}

const _orElse =
  <E extends Error, F extends Error, A>(f: (e: E) => Try<F, A>) =>
  (result: Try<E, A>): Try<F, A> =>
    isSuccess(result) ? result : f(result.error)
export function orElse<E extends Error, F extends Error, A>(
  f: (e: E) => Try<F, A>,
  result: Try<E, A>,
): Try<F, A>
export function orElse<E extends Error, F extends Error, A>(
  f: (e: E) => Try<F, A>,
): (result: Try<E, A>) => Try<F, A>
export function orElse<E extends Error, F extends Error, A>(
  f: (e: E) => Try<F, A>,
  result?: Try<E, A>,
) {
  return result === undefined ? _orElse(f) : _orElse(f)(result)
}

const _filter =
  <E extends Error, A>(f: (a: A) => boolean, error: E) =>
  (result: Try<E, A>): Try<E, A> =>
    isSuccess(result) && f(result.value) ? result : err(error)
export function filter<E extends Error, A>(
  f: (a: A) => boolean,
  error: E,
  result: Try<E, A>,
): Try<E, A>
export function filter<E extends Error, A>(
  f: (a: A) => boolean,
  error: E,
): (result: Try<E, A>) => Try<E, A>
export function filter<E extends Error, A>(
  f: (a: A) => boolean,
  error: E,
  result?: Try<E, A>,
) {
  return result === undefined ? _filter(f, error) : _filter(f, error)(result)
}

const _reject =
  <E extends Error, A>(f: (a: A) => boolean, error: E) =>
  (result: Try<E, A>): Try<E, A> =>
    isSuccess(result) && !f(result.value) ? result : err(error)
export function reject<E extends Error, A>(
  f: (a: A) => boolean,
  error: E,
  result: Try<E, A>,
): Try<E, A>
export function reject<E extends Error, A>(
  f: (a: A) => boolean,
  error: E,
): (result: Try<E, A>) => Try<E, A>
export function reject<E extends Error, A>(
  f: (a: A) => boolean,
  error: E,
  result?: Try<E, A>,
) {
  return result === undefined ? _reject(f, error) : _reject(f, error)(result)
}
