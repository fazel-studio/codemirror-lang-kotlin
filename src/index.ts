import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, delimitedIndent } from "@codemirror/language"
import { parser } from "./parser.js"
import { kotlinHighlight } from "./highlight.js"

const configuredParser = parser.configure({
  props: [
    kotlinHighlight,
    indentNodeProp.add({
      ClassBody: delimitedIndent({ closing: "}" }),
      Block: delimitedIndent({ closing: "}" }),
      WhenBody: delimitedIndent({ closing: "}" }),
    }),
    foldNodeProp.add({
      ClassBody: (node) => ({ from: node.from + 1, to: node.to - 1 }),
      Block: (node) => ({ from: node.from + 1, to: node.to - 1 }),
      WhenBody: (node) => ({ from: node.from + 1, to: node.to - 1 }),
      KDocComment: (node) => ({ from: node.from + 3, to: node.to - 2 }),
    }),
  ],
})

export const kotlinLanguage = LRLanguage.define({
  parser: configuredParser,
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    closeBrackets: { brackets: ["(", "[", "{", '"'] },
  },
})

export function kotlin() {
  return new LanguageSupport(kotlinLanguage)
}
