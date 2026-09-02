import { parser } from "../src/parser.js"
import * as assert from "assert"

describe("Kotlin parser", () => {
  function parse(code) {
    const tree = parser.parse(code)
    let hasErrors = false
    tree.iterate({ enter: node => { if (node.type.isError) hasErrors = true } })
    return { tree, hasErrors }
  }

  it("1. package declaration and imports", () => {
    const { hasErrors } = parse(`
      package com.example.name
      import kotlinx.coroutines.launch
      import a.b.C as Alias
      import a.b.*
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("2. empty class and class with primary constructor", () => {
    const { hasErrors } = parse(`
      class Empty
      class Person(val name: String, var age: Int = 0)
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("3. data class with multiple properties", () => {
    const { hasErrors } = parse(`
      data class User(
        val id: Int,
        val username: String = "guest",
        var isActive: Boolean
      )
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("4. sealed class with subclasses", () => {
    const { hasErrors } = parse(`
      sealed class Result {
        data class Success(val data: String) : Result()
        data class Error(val exception: Exception) : Result()
        object Loading : Result()
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("5. interface with functions", () => {
    const { hasErrors } = parse(`
      interface Drawable {
        fun draw()
        fun getBounds(): Rect = Rect(0,0,0,0)
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("6. object declaration and companion object", () => {
    const { hasErrors } = parse(`
      object Singleton { fun doWork() {} }
      class Factory {
        companion object Named {
          fun create(): Factory = Factory()
        }
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("7. enum class with constructor", () => {
    const { hasErrors } = parse(`
      enum class Color(val rgb: Int) {
        RED(0xFF0000),
        GREEN(0x00FF00),
        BLUE(0x0000FF)
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("8. annotation class and use-site targets", () => {
    const { hasErrors } = parse(`
      annotation class Inject
      class Example(@field:Inject val a: String)
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("9. extension function", () => {
    const { hasErrors } = parse(`
      fun String.lastChar(): Char = this[this.length - 1]
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("10. infix function", () => {
    const { hasErrors } = parse(`
      infix fun Int.shl(x: Int): Int { return this * x }
      val a = 1 shl 2
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("11. single expression function", () => {
    const { hasErrors } = parse(`
      fun add(a: Int, b: Int): Int = a + b
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("12. suspend fun and coroutine scope", () => {
    const { hasErrors } = parse(`
      suspend fun fetch(): String {
        return withContext(Dispatchers.IO) {
          "result"
        }
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("13. when expression", () => {
    const { hasErrors } = parse(`
      val x = when (obj) {
        1 -> { "One" }
        "Hello" -> { "Greeting" }
        in 1..10 -> { "In range" }
        !in 1..20 -> { "Not in range" }
        else -> { "Unknown" }
      }
      val y = when (obj) {
        is Long -> { "Long" }
        else -> { "Unknown" }
      }
      val z = when (obj) {
        !is String -> { "Not a string" }
        else -> { "Other" }
      }
      val w = when {
        x > 0 -> { true }
        x < 0 -> { false }
        else -> { null }
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("14. if expression", () => {
    const { hasErrors } = parse(`
      val max = if (a > b) a else b
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("15. for loop with destructuring", () => {
    const { hasErrors } = parse(`
      fun main() {
        for ((index, value) in array.withIndex()) {
          println("the element at $index is $value")
        }
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("16. lambda expressions", () => {
    const { hasErrors } = parse(`
      val sum = { x: Int, y: Int -> x + y }
      val filtered = list.filter { it > 0 }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("17. string template simple and nested", () => {
    const { hasErrors } = parse(`
      val s = "Name: $name, Age: \${age + 1}, Nest: \${\"a\" + \"b\"}"
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("18. raw string with template", () => {
    const { hasErrors } = parse(`
      val text = """
        Hello $name
        Score: \${score.value}
      """
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("19. null-safety chain", () => {
    const { hasErrors } = parse(`
      val l = b?.length ?: -1
      val x = c!!
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("20. range expression", () => {
    const { hasErrors } = parse(`
      for (i in 1..4) print(i)
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("21. destructuring declaration", () => {
    const { hasErrors } = parse(`
      val (name, age) = person
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("22. generic class and function", () => {
    const { hasErrors } = parse(`
      class Box<out T>(val value: T)
      fun <T : Comparable<T>> sort(list: List<T>) {}
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("23. generic vs comparison ambiguity", () => {
    const { hasErrors } = parse(`
      val x = a < b && c > d
      val y: List<Int> = emptyList()
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("24. trailing comma", () => {
    const { hasErrors } = parse(`
      class Person(
        val firstName: String,
        val lastName: String,
        val age: Int,
      )
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("25. label & jump expression", () => {
    const { hasErrors } = parse(`
      fun foo() {
        listOf(1, 2, 3).forEach lit@{
          if (it == 0) return@lit
          print(it)
        }
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("26. KDoc comment before function", () => {
    const { hasErrors } = parse(`
      /**
       * Returns the sum of [a] and [b].
       */
      fun add(a: Int, b: Int) = a + b
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("27. secondary constructor delegation", () => {
    const { hasErrors } = parse(`
      class Person {
        var children: MutableList<Person> = mutableListOf()
        constructor(parent: Person) : this() {
          parent.children.add(this)
        }
      }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("28. property with custom getter/setter", () => {
    const { hasErrors } = parse(`
      var stringRepresentation: String
        get() = this.toString()
        set(value) {
          setDataFromString(value)
        }
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("29. operator function overloading", () => {
    const { hasErrors } = parse(`
      operator fun Point.plus(other: Point) = Point(x + other.x, y + other.y)
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("30. empty file and comments only", () => {
    const { hasErrors } = parse(`
      // just a comment
      /* another comment */
    `)
    assert.strictEqual(hasErrors, false)
  })

  it("Real-world file test", async () => {
    const fs = await import("fs")
    const code = fs.readFileSync("test/real-world.kt", "utf8")
    const { hasErrors } = parse(code)
    assert.strictEqual(hasErrors, false)
  })
})
