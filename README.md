## installation

```bash
npm install github:wim-web/kukan
```

### example

```ts
import { Open, numberCompareFn } from "kukan";

const a = new Open(1, 2, numberCompareFn)
const b = new Open(1, 3, numberCompareFn)

console.log(a.intersect(b)) // Open{left: Open{value: 1}, right: Open{value: 2}}
```

## reference

https://proofwiki.org/wiki/Definition:Real_Interval_Types
