import { ExternalTokenizer } from "@lezer/lr"
import { stringQuote, rawStringStart, rawStringEnd, StringText, RawStringText, TemplateVar, templateOpen } from "./parser.terms.js"

export const stringStart = new ExternalTokenizer((input, stack) => {
  if (input.next == 34 /* " */) {
    if (input.peek(1) == 34 && input.peek(2) == 34) {
      input.advance(3)
      input.acceptToken(rawStringStart)
    } else {
      input.advance(1)
      input.acceptToken(stringQuote)
    }
  }
})

export const stringContent = new ExternalTokenizer((input, stack) => {
  let hasContent = false
  for (;;) {
    if (input.next < 0 || input.next == 10 /* \n */ || input.next == 34 /* " */) break
    if (input.next == 92 /* \ */) {
      if (hasContent) break
      input.advance() // consume backslash
      if (input.next >= 0) input.advance() // consume escape char
      hasContent = true
      continue
    }
    if (input.next == 36 /* $ */) {
      if (input.peek(1) == 123 /* { */) {
        if (hasContent) break
        input.advance(2)
        input.acceptToken(templateOpen)
        return
      }
      let c = input.peek(1)
      if (isIdentStart(c)) {
        if (hasContent) break
        input.advance() // consume $
        while (isIdentPart(input.next)) input.advance()
        input.acceptToken(TemplateVar)
        return
      }
    }
    input.advance()
    hasContent = true
  }
  if (hasContent) input.acceptToken(StringText)
})

export const rawStringContent = new ExternalTokenizer((input, stack) => {
  let hasContent = false
  for (;;) {
    if (input.next < 0) break
    if (input.next == 34 && input.peek(1) == 34 && input.peek(2) == 34) {
      if (hasContent) break
      input.advance(3)
      input.acceptToken(rawStringEnd)
      return
    }
    if (input.next == 36 /* $ */) {
      if (input.peek(1) == 123 /* { */) {
        if (hasContent) break
        input.advance(2)
        input.acceptToken(templateOpen)
        return
      }
      let c = input.peek(1)
      if (isIdentStart(c)) {
        if (hasContent) break
        input.advance() // consume $
        while (isIdentPart(input.next)) input.advance()
        input.acceptToken(TemplateVar)
        return
      }
    }
    input.advance()
    hasContent = true
  }
  if (hasContent) input.acceptToken(RawStringText)
})

function isIdentStart(ch) {
  return (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || ch == 95
}
function isIdentPart(ch) {
  return isIdentStart(ch) || (ch >= 48 && ch <= 57)
}
