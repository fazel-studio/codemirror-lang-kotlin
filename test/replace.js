import fs from 'fs'
let content = fs.readFileSync('src/kotlin.grammar', 'utf8')
content = content.replace(/kw<"([^"]+)">/g, '"$1"')
fs.writeFileSync('src/kotlin.grammar', content)
