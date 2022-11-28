export type Key = string | number | symbol

export type ReadonlyRecord<K extends Key, V> = {
  readonly [P in K]: V
}

export type AnyReadonlyRecord = ReadonlyRecord<string, unknown>

export function isReadonlyRecord<K extends Key, A>(
  value: unknown,
): value is ReadonlyRecord<K, A> {
  return typeof value === 'object' && value !== null
}

export function entries<K extends string | number | symbol, V>(
  record: ReadonlyRecord<K, V>,
): readonly [K, V][] {
  return Object.entries(record) as unknown as readonly [K, V][]
}

function _map<K extends string | number | symbol, V, W>(
  f: (value: V) => W,
  record: ReadonlyRecord<K, V>,
): ReadonlyRecord<K, W> {
  return Object.fromEntries(
    entries(record).map(([key, value]) => [key, f(value)]),
  ) as ReadonlyRecord<K, W>
}
export function map<K extends string | number | symbol, V, W>(
  record: ReadonlyRecord<K, V>,
  f: (value: V) => W,
): ReadonlyRecord<K, W>
export function map<K extends string | number | symbol, V, W>(
  f: (value: V) => W,
): (record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, W>
export function map<K extends string | number | symbol, V, W>(
  fOrRecord: ((value: V) => W) | ReadonlyRecord<K, V>,
  f?: (value: V) => W,
):
  | ReadonlyRecord<K, W>
  | ((record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, W>) {
  return f
    ? _map(f, fOrRecord as ReadonlyRecord<K, V>)
    : (record: ReadonlyRecord<K, V>) =>
        _map(fOrRecord as (value: V) => W, record)
}
