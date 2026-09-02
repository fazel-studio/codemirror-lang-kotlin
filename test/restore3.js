import fs from 'fs'

let content = fs.readFileSync('src/kotlin.grammar', 'utf8')

content = content.replace(/"this"/g, 'kw<"this">')
content = content.replace(/"super"/g, 'kw<"super">')

fs.writeFileSync('src/kotlin.grammar', content)
