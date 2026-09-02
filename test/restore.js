import fs from 'fs'

let content = fs.readFileSync('src/kotlin.grammar', 'utf8')

const keywords = [
  "package", "import", "as", "class", "interface", "object", "companion",
  "constructor", "init", "public", "private", "protected", "internal",
  "enum", "sealed", "annotation", "data", "inner", "tailrec", "operator",
  "inline", "infix", "external", "suspend", "override", "abstract",
  "final", "open", "const", "lateinit", "vararg", "noinline", "crossinline",
  "reified", "expect", "actual", "in", "out", "val", "var", "by", "get",
  "set", "fun", "is", "when", "else", "if", "try", "catch",
  "finally", "for", "while", "do", "return", "break", "continue",
  "throw", "file", "field", "param", "setparam", "delegate", "true",
  "false", "null", "typealias"
]

for (const kw of keywords) {
  const regex = new RegExp(`"${kw}"`, 'g')
  content = content.replace(regex, `kw<"${kw}">`)
}
content = content.replace(/"as\?"/g, 'kw<"as?">')

fs.writeFileSync('src/kotlin.grammar', content)
