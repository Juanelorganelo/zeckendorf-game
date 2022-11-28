class Ok<A> {
  constructor(readonly value: A) {}
}

class Err<E extends Error> {
  constructor(readonly value: E) {}
}

export { type Ok, type Err }

export type Try<A, E extends Error> = Ok<A> | Err<E>

export function ok<A>(value: A): Try<A, never> {
  return new Ok(value)
}

export function err<E extends Error>(value: E): Try<never, E> {
  return new Err(value)
}

export function raise<A, E extends Error>(t: Try<A, E>): never | A {
  if (isErr(t)) {
    throw t.value
  }
  return t.value
}

export function tryCatch<A, E extends Error>(
  f: () => A,
  onError: <F extends Error>(e: F) => E,
): Try<A, E> {
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

export function isOk<A, E extends Error>(result: Try<A, E>): result is Ok<A> {
  return result instanceof Ok
}

export function isErr<A, E extends Error>(result: Try<A, E>): result is Err<E> {
  return result instanceof Err
}

function _map<A, E extends Error, B>(
  f: (a: A) => B,
  result: Try<A, E>,
): Try<B, E> {
  return isOk(result) ? new Ok(f(result.value)) : result
}
export function map<A, E extends Error, B>(
  result: Try<A, E>,
  f: (a: A) => B,
): Try<B, E>
export function map<A, E extends Error, B>(
  f: (a: A) => B,
): (result: Try<A, E>) => Try<B, E>
export function map<A, E extends Error, B>(
  fOrResult: ((a: A) => B) | Try<A, E>,
  f?: (a: A) => B,
): Try<B, E> | ((result: Try<A, E>) => Try<B, E>) {
  return f
    ? _map(f, fOrResult as Try<A, E>)
    : (result: Try<A, E>) => _map(fOrResult as (a: A) => B, result)
}

function _flatMap<A, E extends Error, B>(
  f: (a: A) => Try<B, E>,
  result: Try<A, E>,
): Try<B, E> {
  return isOk(result) ? f(result.value) : result
}
export function flatMap<A, E extends Error, B>(
  result: Try<A, E>,
  f: (a: A) => Try<B, E>,
): Try<B, E>
export function flatMap<A, E extends Error, B>(
  f: (a: A) => Try<B, E>,
): (result: Try<A, E>) => Try<B, E>
export function flatMap<A, E extends Error, B>(
  fOrResult: ((a: A) => Try<B, E>) | Try<A, E>,
  f?: (a: A) => Try<B, E>,
): Try<B, E> | ((result: Try<A, E>) => Try<B, E>) {
  return f
    ? _flatMap(f, fOrResult as Try<A, E>)
    : (result: Try<A, E>) => _flatMap(fOrResult as (a: A) => Try<B, E>, result)
}
