import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

export default {
  input: "src/index.ts",
  external: [/^@codemirror\//, /^@lezer\//],
  output: [
    { file: "dist/index.js", format: "es" },
    { file: "dist/index.cjs", format: "cjs", esModule: true },
  ],
  plugins: [
    resolve(),
    typescript({ declaration: true, declarationDir: "dist", allowJs: true }),
  ],
}
