import { styleTags, tags as t } from "@lezer/highlight"

export const kotlinHighlight = styleTags({
  // Keywords — declaration
  "class interface object fun val var typealias annotation enum": t.definitionKeyword,
  // Keywords — module
  "package import as": t.moduleKeyword,
  // Keywords — control flow
  "if else when for while do try catch finally return break continue throw": t.controlKeyword,
  // Modifier keywords
  "public private protected internal open final abstract sealed override": t.modifier,
  "suspend inline infix operator tailrec external const lateinit": t.modifier,
  "data value inner companion vararg noinline crossinline reified expect actual": t.modifier,
  // Operator keywords
  "in out is as NotIn NotIs": t.operatorKeyword,
  // Literals
  "true false null": t.atom,
  "this super": t.self,
  // Identifiers
  Identifier: t.name,
  TypeReference: t.typeName,
  NumberLiteral: t.number,
  "StringLiteral RawStringLiteral CharLiteral": t.string,
  StringText: t.string,
  RawStringText: t.string,
  TemplateVar: t.special(t.string),
  "TemplateExpr templateOpen": t.special(t.string),
  // Labels
  "ReturnAt BreakAt ContinueAt": t.labelName,
  // Comments
  LineComment: t.lineComment,
  BlockComment: t.blockComment,
  KDocComment: t.docComment,
  // Annotations
  AnnotationUsage: t.annotation,
  // Brackets
  "( )": t.paren,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
  // Punctuation
  ". , ; ::": t.punctuation,
  // Operators
  Star: t.operator,
  "+ - == === < > <= >= && || ?. ?: .. -> =": t.operator,
  "+= -=": t.operator,
  "++ --": t.operator,
})
