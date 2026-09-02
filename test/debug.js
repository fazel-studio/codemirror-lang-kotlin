import { parser } from "../src/parser.js"

function check(code) {
  const tree = parser.parse(code)
  console.log("AST:", tree.toString())
}

check(`
  infix fun Int.shl(x: Int): Int { return this * x }
  val a = 1 shl 2
`)
