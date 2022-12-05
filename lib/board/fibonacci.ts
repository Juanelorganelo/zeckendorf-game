import { seq, pair, option } from 'lib/functional'

// infinite sequence of fibonacci numbers
export const fibs = seq.unfold(
  ([a, b]) => option.some(pair.of(b, a + b)),
  pair.of(0, 1),
)

export const fib = (n: number) => seq.index(n, fibs)
