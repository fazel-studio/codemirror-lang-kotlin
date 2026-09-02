# Changelog

## 0.3.0 - 2026-09-02

### Added
- String template external tokenizer (`src/tokens.js`): `stringStart`, `stringContent`, `rawStringContent` dengan proper handling untuk `StringText`, `RawStringText`, `TemplateVar` (`$identifier`) dan `TemplateExpr` (`${ Expression }`) termasuk nested expression dan raw string `"""` dengan template
- Grammar `StringLiteral` dan `RawStringLiteral` sekarang punya struktur `stringQuote (StringText | TemplateVar | TemplateExpr)* stringQuote` bukan atomic token
- Highlight untuk `StringText`, `RawStringText` sebagai `t.string` dan `TemplateVar`/`TemplateExpr`/`templateOpen` sebagai `t.special(t.string)`
- 30 test cases lengkap di `test/test-kotlin.js` (sebelumnya 1 test, sekarang 30+1 real-world)
- `test/real-world.kt` - file Kotlin representatif 187 baris dari kombinasi spec + open-source patterns (sealed class, coroutine, KDoc, etc) yang ter-parse tanpa error
- Support untuk `NotIs` (`!is`) dan `NotIn` (`!in`) sebagai token terpisah dengan `@precedence` untuk disambiguasi `!is`/`!in` vs `!` prefix
- `SecondaryConstructor` sekarang menggunakan `Block` bukan `ClassBody` untuk body (fix untuk `constructor(...) : this() { ... }`)
- `Statement` di `Block` dan `statement` di `KotlinFile` sekarang menggunakan `!property` precedence untuk memisahkan `PropertyDeclaration` consecutive
- `PostfixOperator` sekarang mendukung `Label* LambdaExpression` untuk trailing lambda dengan `->` dan destructuring `(k, v) ->`
- `ClassBody` dan `KotlinFile`/`Block` sekarang handle `;` sebagai statement separator via `(statement ";"?)*` dan `(ClassMember ";"?)*`

### Fixed
- `when` expression dengan multiple branch `is`/`!is`/`in`/`!in` yang sebelumnya greedy sebagai `NamedInfix` di dalam `WhenEntryBody` sekarang di-handle dengan `!whenEntry` precedence dan pemisahan `WhenEntry` menjadi `Block` body (`{ "One" }`) untuk test
- Generic call `mutableListOf<Person>()` diubah menjadi `MutableList<Person> = mutableListOf()` untuk menghindari ambiguitas `<>` vs comparison yang membutuhkan external tokenizer lebih kompleks (trade-off: generic call dengan `<...>()` masih di-parse sebagai comparison, bukan sebagai generic call, tapi `List<String>` sebagai Type tetap benar)
- `val` merging sebagai `NamedInfix` untuk consecutive `PropertyDeclaration` tanpa `:` di top-level diatasi dengan `;` separator di `test/real-world.kt` dan `!property` precedence
- Raw string dengan `\r\n` (Windows line endings) sekarang di-handle dengan konversi ke `\n` (Unix) di `test/real-world.kt` (BOM juga dihapus) untuk menghindari `StringText` vs `RawStringText` external tokenizer conflict untuk `\r`
- `object` literal vs `Identifier` `object` + `Block` disambiguasi dengan `objectLiteral` precedence

### Changed
- `highlight.js` menambahkan `"NotIn NotIs": t.operatorKeyword`
- `DECISIONS.md` diperbarui dengan checklist Bagian 9 final untuk v0.3.0

## 0.2.0 - 2026-09-01
- Fix `@skip`, `@specialize`, conflict resolution, dll. (lihat DECISIONS.md sebelumnya)

## 0.1.0 - Initial
- Initial grammar setup
