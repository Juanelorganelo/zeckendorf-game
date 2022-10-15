export function uniqueFibonaccisLessThan(n: number): number[] {
  let f1 = 0
  let f2 = 1
  let f3 = 1

  // Using a Set is faster
  const fibs = new Set<number>([f2])

  // eslint-disable-next-line no-constant-condition
  while (true) {
    f1 = f2
    f2 = f3
    f3 = f1 + f2

    if (f3 > n) {
      break
    }

    fibs.add(f3)
  }

  return Array.from(fibs)
}

export function greatestFibonacciLessThan(n: number): number {
  const fibs = uniqueFibonaccisLessThan(n)
  return fibs[fibs.length - 1]
}

export function zeckendorf(n: number): number[] {
  let r = n
  const xs: number[] = []

  while (r > 0) {
    const fib = greatestFibonacciLessThan(r)
    r = r - fib
    xs.push(fib)
  }

  return xs
}
