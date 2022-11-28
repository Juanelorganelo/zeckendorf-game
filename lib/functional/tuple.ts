export function first<A, B>(tuple: readonly [A, B]): A {
  return tuple[0]
}

export function second<A, B>(tuple: readonly [A, B]): B {
  return tuple[1]
}
