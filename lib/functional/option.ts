import { type Variant } from './variant'

export interface Some<T> extends Variant<'Some'> {
  readonly value: T
}

export const some = <T>(value: T): Option<T> => ({
  value,
  variant: 'Some',
})

export interface None extends Variant<'None'> {}

// prettier-ignore
export const none: Option<never> = {
  variant: 'None',
}

export type Option<T> = Some<T> | None

export const map =
  <T, U>(f: (t: T) => U) =>
  (o: Option<T>): Option<U> =>
    o.variant === 'Some' ? some(f(o.value)) : none

export const flatMap =
  <T, U>(f: (t: T) => Option<U>) =>
  (o: Option<T>): Option<U> =>
    o.variant === 'Some' ? f(o.value) : none

export const getOrElse =
  <T>(defaultValue: () => T) =>
  (o: Option<T>): T =>
    o.variant === 'Some' ? o.value : defaultValue()

export const filter =
  <T>(predicate: (t: T) => boolean) =>
  (o: Option<T>): Option<T> =>
    o.variant === 'Some' ? (predicate(o.value) ? o : none) : none

export const reject =
  <T>(predicate: (t: T) => boolean) =>
  (o: Option<T>): Option<T> =>
    o.variant === 'Some' ? (predicate(o.value) ? none : o) : none

type Cases<T, R> = { readonly Some: (t: T) => R; readonly None: () => R }

const _match =
  <T, R>(cases: Cases<T, R>) =>
  (o: Option<T>): R =>
    o.variant === 'Some' ? cases.Some(o.value) : cases.None()
export function match<T, R>(o: Option<T>, cases: Cases<T, R>): R
export function match<T, R>(cases: Cases<T, R>): (o: Option<T>) => R
export function match<T, R>(o: Option<T> | Cases<T, R>, cases?: Cases<T, R>) {
  return cases ? _match(cases)(o as Option<T>) : _match(o as Cases<T, R>)
}

export const isSome = <T>(o: Option<T>): o is Some<T> => o.variant === 'Some'
export const isNone = <T>(o: Option<T>): o is None => o.variant === 'None'
