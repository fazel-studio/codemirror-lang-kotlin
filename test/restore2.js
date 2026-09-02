import fs from 'fs'

let content = fs.readFileSync('src/kotlin.grammar', 'utf8')

content = content.replace(/"value"/g, 'kw<"value">')

fs.writeFileSync('src/kotlin.grammar', content)
