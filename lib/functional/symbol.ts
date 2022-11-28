export function concat(a: symbol, b: symbol): symbol {
  return Symbol(a.toString() + b.toString())
}
