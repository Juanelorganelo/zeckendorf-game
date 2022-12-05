/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export function pipe<A, B>(a: A, f: (a: A) => B): B
export function pipe<A, B, C>(a: A, f: (a: A) => B, g: (b: B) => C): C
export function pipe<A, B, C, D>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
): D
export function pipe<A, B, C, D, E>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
  j: (f: F) => G,
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
  j: (f: F) => G,
  k: (g: G) => H,
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
  j: (f: F) => G,
  k: (g: G) => H,
  l: (h: H) => I,
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
  j: (f: F) => G,
  k: (g: G) => H,
  l: (h: H) => I,
  m: (i: I) => J,
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
  j: (f: F) => G,
  k: (g: G) => H,
  l: (h: H) => I,
  m: (i: I) => J,
  n: (j: J) => K,
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
  j: (f: F) => G,
  k: (g: G) => H,
  l: (h: H) => I,
  m: (i: I) => J,
  n: (j: J) => K,
  o: (k: K) => L,
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  e: (d: D) => E,
  i: (e: E) => F,
  j: (f: F) => G,
  k: (g: G) => H,
  l: (h: H) => I,
  m: (i: I) => J,
  n: (j: J) => K,
  o: (k: K) => L,
  p: (l: L) => M,
): M
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pipe(...args: readonly any[]): any {
  switch (args.length) {
    case 1:
      return args[0]
    case 2:
      return args[1](args[0])
    case 3:
      return args[2](args[1](args[0]))
    case 4:
      return args[3](args[2](args[1](args[0])))
    case 5:
      return args[4](args[3](args[2](args[1](args[0]))))
    case 6:
      return args[5](args[4](args[3](args[2](args[1](args[0])))))
    case 7:
      return args[6](args[5](args[4](args[3](args[2](args[1](args[0]))))))
    case 8:
      return args[7](
        args[6](args[5](args[4](args[3](args[2](args[1](args[0])))))),
      )
    case 9:
      return args[8](
        args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0]))))))),
      )
    case 10:
      return args[9](
        args[8](
          args[7](
            args[6](args[5](args[4](args[3](args[2](args[1](args[0])))))),
          ),
        ),
      )
    case 11:
      return args[10](
        args[9](
          args[8](
            args[7](
              args[6](args[5](args[4](args[3](args[2](args[1](args[0])))))),
            ),
          ),
        ),
      )
    case 12:
      return args[11](
        args[10](
          args[9](
            args[8](
              args[7](
                args[6](args[5](args[4](args[3](args[2](args[1](args[0])))))),
              ),
            ),
          ),
        ),
      )
    case 13:
      return args[12](
        args[11](
          args[10](
            args[9](
              args[8](
                args[7](
                  args[6](args[5](args[4](args[3](args[2](args[1](args[0])))))),
                ),
              ),
            ),
          ),
        ),
      )
    default:
      throw new Error('pipe: too many arguments')
  }
}

export function curryLast<A, B>(f: (a: A) => B): (a: A) => B
export function curryLast<A, B, C>(f: (a: A, b: B) => C): (a: A) => (b: B) => C
export function curryLast<A, B, C, D>(
  f: (a: A, b: B, c: C) => D,
): (a: A, b: B) => (c: C) => D
export function curryLast<A, B, C, D, E>(
  f: (a: A, b: B, c: C, d: D) => E,
): (a: A, b: B, c: C) => (d: D) => E
export function curryLast<A, B, C, D, E, F>(
  f: (a: A, b: B, c: C, d: D, e: E) => F,
): (a: A, b: B, c: C, d: D) => (e: E) => F
export function curryLast<A, B, C, D, E, F, G>(
  f: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
): (a: A, b: B, c: C, d: D, e: E) => (f: F) => G
export function curryLast<A, B, C, D, E, F, G, H>(
  f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
): (a: A, b: B, c: C, d: D, e: E, f: F) => (g: G) => H
export function curryLast<A, B, C, D, E, F, G, H, I>(
  f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I,
): (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => (h: H) => I
export function curryLast<A, B, C, D, E, F, G, H, I, J>(
  f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J,
): (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => (i: I) => J
export function curryLast<A, B, C, D, E, F, G, H, I, J, K>(
  f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => K,
): (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => (j: J) => K
export function curryLast<A, B, C, D, E, F, G, H, I, J, K, L>(
  f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => L,
): (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => (k: K) => L
export function curryLast<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  f: (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    j: J,
    k: K,
    l: L,
  ) => M,
): (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
) => (l: L) => M
export function curryLast(fn: Function) {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return function (...args2: any[]) {
        return curried(...args.concat(args2))
      }
    }
  }
}

export const identity = <T>(x: T): T => x

export const constant =
  <T>(x: T) =>
  () =>
    x
