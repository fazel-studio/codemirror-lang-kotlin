import { parser } from "../src/parser.js"

function check(code) {
  const tree = parser.parse(code)
  let errs = []
  tree.iterate({ enter: node => { if (node.type.isError) errs.push(node) } })
  console.log("AST:", tree.toString())
  if (errs.length > 0) console.log("ERRORS:", errs.length)
}

check(`
      enum class Color(val rgb: Int) {
        RED(0xFF0000),
        GREEN(0x00FF00),
        BLUE(0x0000FF)
      }
`)

check(`
      val text = """
        Hello $name
        Score: \${score.value}
      """
`)
