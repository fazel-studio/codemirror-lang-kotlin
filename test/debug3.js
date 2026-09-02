import { parser } from "../src/parser.js"
function check(code) {
  const tree = parser.parse(code)
  console.log("AST:", tree.toString())
}

check("import a.b.*")
check("class Box<out T>(val value: T)")
check("constructor(parent: Person) : this() {}")
check("listOf(1, 2, 3).forEach lit@{ if (it == 0) return@lit }")
