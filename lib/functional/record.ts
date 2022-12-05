import * as pair from './pair'
import * as option from './option'

export type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>

export const entries = <K extends string, V>(
  record: ReadonlyRecord<K, V>,
): ReadonlyArray<pair.Pair<K, V>> => {
  const result: Array<pair.Pair<K, V>> = []
  for (const key in record) {
    result.push([key, record[key]] as const)
  }
  return result
}

export const fromEntries = <K extends string, V>(
  kvs: ReadonlyArray<pair.Pair<K, V>>,
): ReadonlyRecord<K, V> => {
  const result = {}
  for (const [k, v] of kvs) {
    ;(result as Record<K, V>)[k] = v
  }
  return result as ReadonlyRecord<K, V>
}

const _map =
  <K extends string, V, W>(f: (v: V) => W) =>
  (record: ReadonlyRecord<K, V>): ReadonlyRecord<K, W> => {
    const result = {}
    for (const key in record) {
      ;(result as Record<K, W>)[key] = f(record[key])
    }
    return result as ReadonlyRecord<K, W>
  }
export function map<K extends string, V, W>(
  f: (v: V) => W,
  record: ReadonlyRecord<K, V>,
): ReadonlyRecord<K, W>
export function map<K extends string, V, W>(
  f: (v: V) => W,
): (record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, W>
export function map<K extends string, V, W>(
  f: (v: V) => W,
  record?: ReadonlyRecord<K, V>,
) {
  if (record === undefined) {
    return (record: ReadonlyRecord<K, V>) => _map(f)(record)
  } else {
    return _map(f)(record)
  }
}

const _flatMap =
  <K extends string, V, W>(f: (v: V) => ReadonlyRecord<K, W>) =>
  (record: ReadonlyRecord<K, V>): ReadonlyRecord<K, W> => {
    const result = {}
    for (const key in record) {
      const r = f(record[key])
      for (const k in r) {
        ;(result as Record<K, W>)[k] = r[k]
      }
    }
    return result as ReadonlyRecord<K, W>
  }
export function flatMap<K extends string, V, W>(
  f: (v: V) => ReadonlyRecord<K, W>,
  record: ReadonlyRecord<K, V>,
): ReadonlyRecord<K, W>
export function flatMap<K extends string, V, W>(
  f: (v: V) => ReadonlyRecord<K, W>,
): (record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, W>
export function flatMap<K extends string, V, W>(
  f: (v: V) => ReadonlyRecord<K, W>,
  record?: ReadonlyRecord<K, V>,
) {
  if (record === undefined) {
    return (record: ReadonlyRecord<K, V>) => _flatMap(f)(record)
  } else {
    return _flatMap(f)(record)
  }
}

const _get =
  <K extends string, V>(key: K) =>
  (record: ReadonlyRecord<K, V>): option.Option<V> =>
    key in record ? option.some(record[key]) : option.none
export function get<K extends string, V>(
  key: K,
  record: ReadonlyRecord<K, V>,
): option.Option<V>
export function get<K extends string, V>(
  key: K,
): (record: ReadonlyRecord<K, V>) => option.Option<V>
export function get<K extends string, V>(
  key: K,
  record?: ReadonlyRecord<K, V>,
) {
  if (record === undefined) {
    return (record: ReadonlyRecord<K, V>) => _get(key)(record)
  } else {
    return _get(key)(record)
  }
}

const _set =
  <K extends string, V>(key: K, value: V) =>
  (record: ReadonlyRecord<K, V>): ReadonlyRecord<K, V> => {
    const result = { ...record }
    ;(result as Record<K, V>)[key] = value
    return result
  }
export function set<K extends string, V>(
  key: K,
  value: V,
  record: ReadonlyRecord<K, V>,
): ReadonlyRecord<K, V>
export function set<K extends string, V>(
  key: K,
  value: V,
): (record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, V>
export function set<K extends string, V>(
  key: K,
  value: V,
  record?: ReadonlyRecord<K, V>,
) {
  if (record === undefined) {
    return (record: ReadonlyRecord<K, V>) => _set(key, value)(record)
  } else {
    return _set(key, value)(record)
  }
}

const _remove =
  <K extends string, V>(key: K) =>
  (record: ReadonlyRecord<K, V>): ReadonlyRecord<K, V> => {
    const result = { ...record }
    delete (result as Record<K, V>)[key]
    return result
  }

export function remove<K extends string, V>(
  key: K,
  record: ReadonlyRecord<K, V>,
): ReadonlyRecord<K, V>
export function remove<K extends string, V>(
  key: K,
): (record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, V>
export function remove<K extends string, V>(
  key: K,
  record?: ReadonlyRecord<K, V>,
) {
  if (record === undefined) {
    return (record: ReadonlyRecord<K, V>) => _remove(key)(record)
  } else {
    return _remove(key)(record)
  }
}

const _filter =
  <K extends string, V>(predicate: (v: V) => boolean) =>
  (record: ReadonlyRecord<K, V>): ReadonlyRecord<K, V> => {
    const result = {}
    for (const key in record) {
      if (predicate(record[key])) {
        ;(result as Record<K, V>)[key] = record[key]
      }
    }
    return result as ReadonlyRecord<K, V>
  }
export function filter<K extends string, V>(
  predicate: (v: V) => boolean,
  record: ReadonlyRecord<K, V>,
): ReadonlyRecord<K, V>
export function filter<K extends string, V>(
  predicate: (v: V) => boolean,
): (record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, V>
export function filter<K extends string, V>(
  predicate: (v: V) => boolean,
  record?: ReadonlyRecord<K, V>,
) {
  if (record === undefined) {
    return (record: ReadonlyRecord<K, V>) => _filter(predicate)(record)
  } else {
    return _filter(predicate)(record)
  }
}

const _reject =
  <K extends string, V>(predicate: (v: V) => boolean) =>
  (record: ReadonlyRecord<K, V>): ReadonlyRecord<K, V> => {
    const result = {}
    for (const key in record) {
      if (!predicate(record[key])) {
        ;(result as Record<K, V>)[key] = record[key]
      }
    }
    return result as ReadonlyRecord<K, V>
  }
export function reject<K extends string, V>(
  predicate: (v: V) => boolean,
  record: ReadonlyRecord<K, V>,
): ReadonlyRecord<K, V>
export function reject<K extends string, V>(
  predicate: (v: V) => boolean,
): (record: ReadonlyRecord<K, V>) => ReadonlyRecord<K, V>
export function reject<K extends string, V>(
  predicate: (v: V) => boolean,
  record?: ReadonlyRecord<K, V>,
) {
  if (record === undefined) {
    return (record: ReadonlyRecord<K, V>) => _reject(predicate)(record)
  } else {
    return _reject(predicate)(record)
  }
}
