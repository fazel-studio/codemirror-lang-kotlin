#!/usr/bin/env node
// Build grammar script — runs lezer-generator and succeeds even if there are
// only warnings (not errors). The '/' vs '//' overlap warning is a known
// Lezer static-analysis limitation that does not affect runtime correctness.
import { spawnSync } from "child_process"

const result = spawnSync(
  "npx",
  ["lezer-generator", "src/kotlin.grammar", "-o", "src/parser.js"],
  { stdio: "inherit", shell: true }
)

if (result.error) {
  console.error(result.error)
  process.exit(1)
}
if (result.status !== 0) {
  process.exit(result.status || 1)
}
process.exit(0)
