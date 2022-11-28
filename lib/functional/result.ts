import { isSome, type Option } from './option'

class Ok<A> {
  constructor(readonly value: A) {}
}

class Err<E> {
  constructor(readonly value: E) {}
}

export { type Ok, type Err }

export type Result<E, A> = Ok<A> | Err<E>

export function ok<E, A>(value: A): Result<E, A> {
  return new Ok(value)
}

export function err<E, A>(value: E): Result<E, A> {
  return new Err(value)
}

export function isOk<E, A>(result: Result<E, A>): result is Ok<A> {
  return result instanceof Ok
}

export function isErr<E, A>(result: Result<E, A>): result is Err<E> {
  return result instanceof Err
}

export function fromOption<E, A>(option: Option<A>, error: E): Result<E, A> {
  return isSome(option) ? ok(option.value) : err(error)
}

function _map<E, A, B>(f: (a: A) => B, result: Result<E, A>): Result<E, B> {
  return isOk(result) ? new Ok(f(result.value)) : result
}
export function map<E, A, B>(result: Result<E, A>, f: (a: A) => B): Result<E, B>
export function map<E, A, B>(
  f: (a: A) => B,
): (result: Result<E, A>) => Result<E, B>
export function map<E, A, B>(
  fOrResult: ((a: A) => B) | Result<E, A>,
  f?: (a: A) => B,
): Result<E, B> | ((result: Result<E, A>) => Result<E, B>) {
  return f
    ? _map(f, fOrResult as Result<E, A>)
    : (result: Result<E, A>) => _map(fOrResult as (a: A) => B, result)
}

function _flatMap<E, A, B>(
  f: (a: A) => Result<E, B>,
  result: Result<E, A>,
): Result<E, B> {
  return isOk(result) ? f(result.value) : result
}
export function flatMap<E, A, B>(
  result: Result<E, A>,
  f: (a: A) => Result<E, B>,
): Result<E, B>
export function flatMap<E, A, B>(
  f: (a: A) => Result<E, B>,
): (result: Result<E, A>) => Result<E, B>
export function flatMap<E, A, B>(
  fOrResult: ((a: A) => Result<E, B>) | Result<E, A>,
  f?: (a: A) => Result<E, B>,
): Result<E, B> | ((result: Result<E, A>) => Result<E, B>) {
  return f
    ? _flatMap(f, fOrResult as Result<E, A>)
    : (result: Result<E, A>) =>
        _flatMap(fOrResult as (a: A) => Result<E, B>, result)
}

function _filter<E, A>(
  f: (a: A) => boolean,
  result: Result<E, A>,
): Result<E, A> {
  return isOk(result) && f(result.value) ? result : result
}
export function filter<E, A>(
  result: Result<E, A>,
  f: (a: A) => boolean,
): Result<E, A>
export function filter<E, A>(
  f: (a: A) => boolean,
): (result: Result<E, A>) => Result<E, A>
export function filter<E, A>(
  fOrResult: ((a: A) => boolean) | Result<E, A>,
  f?: (a: A) => boolean,
): Result<E, A> | ((result: Result<E, A>) => Result<E, A>) {
  return f
    ? _filter(f, fOrResult as Result<E, A>)
    : (result: Result<E, A>) => _filter(fOrResult as (a: A) => boolean, result)
}

function _fold<E, A, B>(
  f: (e: E) => B,
  g: (a: A) => B,
  result: Result<E, A>,
): B {
  return isOk(result) ? g(result.value) : f(result.value)
}
export function fold<E, A, B>(
  result: Result<E, A>,
  f: (e: E) => B,
  g: (a: A) => B,
): B
export function fold<E, A, B>(
  f: (e: E) => B,
  g: (a: A) => B,
): (result: Result<E, A>) => B
export function fold<E, A, B>(
  fOrResult: ((e: E) => B) | Result<E, A>,
  f: ((a: A) => B) | ((e: E) => B),
  g?: (a: A) => B,
): B | ((result: Result<E, A>) => B) {
  return g
    ? _fold(f as (e: E) => B, g, fOrResult as Result<E, A>)
    : (result: Result<E, A>) =>
        _fold(fOrResult as (e: E) => B, f as (a: A) => B, result)
}

function _getOrElse<E, A>(f: (e: E) => A, result: Result<E, A>): A {
  return isOk(result) ? result.value : f(result.value)
}
export function getOrElse<E, A>(result: Result<E, A>, f: (e: E) => A): A
export function getOrElse<E, A>(f: (e: E) => A): (result: Result<E, A>) => A
export function getOrElse<E, A>(
  fOrResult: ((e: E) => A) | Result<E, A>,
  f?: (e: E) => A,
): A | ((result: Result<E, A>) => A) {
  return f
    ? _getOrElse(f, fOrResult as Result<E, A>)
    : (result: Result<E, A>) => _getOrElse(fOrResult as (e: E) => A, result)
}

function _orElse<E, A, F>(
  f: (e: E) => Result<F, A>,
  result: Result<E, A>,
): Result<F, A> {
  return isOk(result) ? result : f(result.value)
}
export function orElse<E, A, F>(
  result: Result<E, A>,
  f: (e: E) => Result<F, A>,
): Result<F, A>
export function orElse<E, A, F>(
  f: (e: E) => Result<F, A>,
): (result: Result<E, A>) => Result<F, A>
export function orElse<E, A, F>(
  fOrResult: ((e: E) => Result<F, A>) | Result<E, A>,
  f?: (e: E) => Result<F, A>,
): Result<F, A> | ((result: Result<E, A>) => Result<F, A>) {
  return f
    ? _orElse(f, fOrResult as Result<E, A>)
    : (result: Result<E, A>) =>
        _orElse(fOrResult as (e: E) => Result<F, A>, result)
}
