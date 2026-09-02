# @fazelstudio/codemirror-lang-kotlin

[![NPM version](https://img.shields.io/npm/v/@fazelstudio/codemirror-lang-kotlin.svg)](https://www.npmjs.com/package/@fazelstudio/codemirror-lang-kotlin)

This package implements Kotlin (`.kt`, `.kts`) language support for the
[CodeMirror](https://codemirror.net/) code editor: a full Lezer grammar covering
classes, interfaces, objects, sealed/data classes, functions (including extension and
infix functions), lambdas, `when` expressions, null-safety operators, string templates,
ranges, generics, annotations, and KDoc documentation comments — with syntax
highlighting compatible with any CodeMirror 6 theme.

This code is released under an MIT license.

## Usage

```js
import { EditorView, basicSetup } from "codemirror"
import { kotlin } from "@fazelstudio/codemirror-lang-kotlin"

new EditorView({
  parent: document.body,
  doc: `fun main() {\n    val name = "World"\n    println("Hello, $name!")\n}`,
  extensions: [basicSetup, kotlin()],
})
```

## API

### `kotlin(config?) → LanguageSupport`

### `kotlinLanguage: LRLanguage`

## Known limitations

- Smart-cast analysis (narrowing type after `is`/`!= null` check) is a semantic
  feature and out of scope — this package only provides syntax highlighting and
  parsing, not type inference.
- KDoc tag content (`@param name description`) is highlighted as part of the doc
  comment block, not parsed into structured fields, in v0.1.
