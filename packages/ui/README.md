# @gridpower/ui

Shared shadcn/ui components consuming `@gridpower/tokens`.

## Structure

```
src/
  components/        # shadcn components (DS.1-4 populate these)
  lib/
    utils.ts         # cn() helper
  styles/
    globals.css      # imports tokens + Tailwind directives
  index.ts           # re-exports all public components
```

## Adding a component

Each Phase 1 sub-issue (DS.1 Primitives, DS.2 Cards+Data, DS.3 Nav+Feedback, DS.4 Utility) drops files into `src/components/<name>.tsx`, then appends to `src/index.ts`:

```ts
export { Button, buttonVariants } from "./components/button";
```

## Consumers

Apps import via workspace protocol:

```ts
import { Button } from "@gridpower/ui";
import "@gridpower/ui/styles.css";
```
