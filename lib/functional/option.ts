class None {
  static readonly value = new this()
  static [Symbol.hasInstance](value: unknown): value is None {
    return value === this.value
  }

  readonly value!: never

  private constructor() {}
}

class Some<A> {
  constructor(readonly value: A) {}
}

export { type Some, type None }

export type Option<A> = Some<A> | None

export function some<A>(value: A): Option<A> {
  return new Some(value)
}

export function none<A>(): Option<A> {
  return None.value
}

export function isNone<A>(option: Option<A>): option is None {
  return option === None.value
}

export function isSome<A>(option: Option<A>): option is Some<A> {
  return !isNone(option)
}

function _map<A, B>(f: (a: A) => B, option: Option<A>): Option<B> {
  return isNone(option) ? None.value : new Some(f(option.value))
}
export function map<A, B>(option: Option<A>, f: (a: A) => B): Option<B>
export function map<A, B>(f: (a: A) => B): (option: Option<A>) => Option<B>
export function map<A, B>(
  fOrOption: ((a: A) => B) | Option<A>,
  f?: (a: A) => B,
): Option<B> | ((option: Option<A>) => Option<B>) {
  return f
    ? _map(f, fOrOption as Option<A>)
    : (option: Option<A>) => _map(fOrOption as (a: A) => B, option)
}

function _flatMap<A, B>(f: (a: A) => Option<B>, option: Option<A>): Option<B> {
  return isNone(option) ? None.value : f(option.value)
}
export function flatMap<A, B>(
  option: Option<A>,
  f: (a: A) => Option<B>,
): Option<B>
export function flatMap<A, B>(
  f: (a: A) => Option<B>,
): (option: Option<A>) => Option<B>
export function flatMap<A, B>(
  fOrOption: ((a: A) => Option<B>) | Option<A>,
  f?: (a: A) => Option<B>,
): Option<B> | ((option: Option<A>) => Option<B>) {
  return f
    ? _flatMap(f, fOrOption as Option<A>)
    : (option: Option<A>) => _flatMap(fOrOption as (a: A) => Option<B>, option)
}

function _filter<A>(
  predicate: (a: A) => boolean,
  option: Option<A>,
): Option<A> {
  return isNone(option)
    ? None.value
    : predicate(option.value)
    ? option
    : None.value
}
export function filter<A>(
  option: Option<A>,
  predicate: (a: A) => boolean,
): Option<A>
export function filter<A>(
  predicate: (a: A) => boolean,
): (option: Option<A>) => Option<A>
export function filter<A>(
  predicateOrOption: ((a: A) => boolean) | Option<A>,
  predicate?: (a: A) => boolean,
): Option<A> | ((option: Option<A>) => Option<A>) {
  return predicate
    ? _filter(predicate, predicateOrOption as Option<A>)
    : (option: Option<A>) =>
        _filter(predicateOrOption as (a: A) => boolean, option)
}

function _getOrElse<A>(defaultValue: A, option: Option<A>): A {
  return isNone(option) ? defaultValue : option.value
}
export function getOrElse<A>(option: Option<A>, defaultValue: A): A
export function getOrElse<A>(defaultValue: A): (option: Option<A>) => A
export function getOrElse<A>(
  defaultValueOrOption: A | Option<A>,
  defaultValue?: A,
): A | ((option: Option<A>) => A) {
  return defaultValue
    ? _getOrElse(defaultValue, defaultValueOrOption as Option<A>)
    : (option: Option<A>) => _getOrElse(defaultValueOrOption as A, option)
}

function _apply<A, B>(f: Option<(a: A) => B>, option: Option<A>): Option<B> {
  return isNone(f) || isNone(option)
    ? None.value
    : new Some(f.value(option.value))
}
export function apply<A, B>(
  option: Option<A>,
  f: Option<(a: A) => B>,
): Option<B>
export function apply<A, B>(
  f: Option<(a: A) => B>,
): (option: Option<A>) => Option<B>
export function apply<A, B>(
  fOrOption: Option<(a: A) => B> | Option<A>,
  f?: Option<(a: A) => B>,
): Option<B> | ((option: Option<A>) => Option<B>) {
  return f
    ? _apply(f, fOrOption as Option<A>)
    : (option: Option<A>) => _apply(fOrOption as Option<(a: A) => B>, option)
}

export function orElse<A>(
  option: Option<A>,
  alternative: Option<A>,
): Option<A> {
  return isNone(option) ? alternative : option
}

function _fold<A, B>(f: () => B, g: (a: A) => B, option: Option<A>): B {
  return isNone(option) ? f() : g(option.value)
}
export function fold<A, B>(option: Option<A>, f: () => B, g: (a: A) => B): B
export function fold<A, B>(f: () => B, g: (a: A) => B): (option: Option<A>) => B
export function fold<A, B>(
  fOrOption: (() => B) | Option<A>,
  f: (() => B) | ((a: A) => B),
  g?: (a: A) => B,
): B | ((option: Option<A>) => B) {
  return g
    ? _fold(f as () => B, g, fOrOption as Option<A>)
    : (option: Option<A>) =>
        _fold(fOrOption as () => B, f as (a: A) => B, option)
}
