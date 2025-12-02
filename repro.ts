import { Effect, Data } from "effect";

class MyError extends Data.TaggedError("MyError") {}

const operation = Effect.gen(function* () {
  if (Math.random() > 0.5) {
    yield* Effect.fail(new MyError());
  }
  return { checked: 1, updated: 1, errors: 0 };
});

// Expected: Effect<{ checked: number; updated: number; errors: number; }, never, never>
// Actual: Effect<{ checked: number; ... } | { checked: number; ... }, never, never>

const result = operation.pipe(
  Effect.orElseSucceed(() => ({ checked: 0, updated: 0, errors: 0 }))
);

const result2 = operation.pipe(
  Effect.catchAll(() => Effect.succeed({ checked: 0, updated: 0, errors: 0 }))
);

const result3 = operation.pipe(
  Effect.catchTag("MyError", () =>
    Effect.succeed({ checked: 0, updated: 0, errors: 0 })
  )
);

export { result, result2, result3 };
