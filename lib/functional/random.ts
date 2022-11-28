import { task, type Task } from './task'

export function random(seed: number): number {
  return (seed * 16807) % 2147483647
}

export function randomInt(seed: number): number {
  return Math.floor(random(seed) / 2147483647)
}

export function randomIntRange(seed: number, min: number, max: number): number {
  return min + (randomInt(seed) % (max - min))
}

export function seed(size = 4): Task<number> {
  return task(async () => {
    if (
      typeof process !== 'undefined' &&
      process.versions &&
      process.versions.node
    ) {
      const crypto = await import('crypto')
      return crypto.randomBytes(size).readUInt32LE(0)
    }

    // check for web crypto support
    if (typeof window !== 'undefined' && window.crypto) {
      const array = new Uint32Array(1)
      window.crypto.getRandomValues(array)
      return array[0]
    }

    // fallback to Math.random
    return Math.floor(Math.random() * 2147483647)
  })
}
