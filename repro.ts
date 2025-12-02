import { Effect } from "effect"

class MyError {
  readonly _tag = "MyError"
}

const operation = Effect.gen(function* () {
  if (Math.random() > 0.5) {
    yield* Effect.fail(new MyError())
  }
  return { checked: 1, updated: 1, errors: 0 }
})

// Hover over `result` - shows duplicate union type:
// Effect<{ checked: number; updated: number; errors: number; } | { checked: number; updated: number; errors: number; }, never, never>
const result = operation.pipe(
  Effect.orElseSucceed(() => ({ checked: 0, updated: 0, errors: 0 }))
)

// Expected: Effect<{ checked: number; updated: number; errors: number; }, never, never>
// Actual: Effect<{ checked: number; ... } | { checked: number; ... }, never, never>

export { result }

