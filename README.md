# Effect Duplicate Union Type Reproduction

## Issue

When using `Effect.orElseSucceed` with a fallback value that has the same shape as the success type, TypeScript shows a duplicate union type instead of collapsing them.

## Steps to reproduce

1. `pnpm install`
2. Open `repro.ts` in your editor
3. Hover over `result` on line 17

## Expected type

```typescript
Effect<{ checked: number; updated: number; errors: number; }, never, never>
```

## Actual type

```typescript
Effect<{ checked: number; updated: number; errors: number; } | { checked: number; updated: number; errors: number; }, never, never>
```

## Environment

- Effect: 3.19.8
- TypeScript: 5.9.3

