import { type Result, ok, err, map as mapResult } from './result'

export type Task<A> = () => Promise<A>

export function task<A>(f: () => Promise<A>): Task<A> {
  return async () => {
    try {
      return await f()
    } catch (e) {
      const msg = `Unexpected error in task: ${String(e)}.`

      if (e instanceof Error) {
        e.message = msg
        throw e
      } else {
        throw new Error(msg)
      }
    }
  }
}
