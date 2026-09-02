package com.fazelstudio.example

import kotlinx.coroutines.launch
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.withContext
import kotlinx.coroutines.Dispatchers
import kotlin.collections.List
import kotlin.collections.MutableMap as MyMap

/**
 * Represents result of an operation.
 * @param T type of success data
 * @property message additional message
 */
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Failure(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

enum class Status(val code: Int) {
    PENDING(0),
    ACTIVE(1),
    CLOSED(2),
}

interface Repository<T> {
    suspend fun fetch(id: Int): T?
    fun getBounds(): Int = 0
}

annotation class Auditable

@Auditable
open class UserRepository(private val apiUrl: String) : Repository<User> {

    private val cache: MyMap<Int, User> = mutableMapOf()

    override suspend fun fetch(id: Int): User? {
        cache[id]?.let { return it }

        val user = when {
            id <= 0 -> { null }
            id in 1..1000 -> { loadFromApi(id) }
            else -> { loadFromCache(id) }
        }

        val cached = user?.let { cache[id] = it }
        return user
    }

    private fun loadFromApi(id: Int): User? {
        val name = "User-$id";
        return User(id = id, name = name, tags = listOf("new", "verified"))
    }

    private fun loadFromCache(id: Int): User? = cache[id]

    companion object Factory {
        const val DEFAULT_TIMEOUT = 30_000L;
        fun create(url: String) = UserRepository(url)
    }

    var stringRepresentation: String
        get() = this.toString()
        set(value) {
            setDataFromString(value)
        }

    private fun setDataFromString(value: String) {}

    constructor(parent: UserRepository) : this(parent.apiUrl) {
        parent.cache.forEach { (k, v) -> cache[k] = v }
    }
}

@file:JvmName("MyFile")

data class User(val id: Int, val name: String, val tags: List<String> = emptyList()) {
    val displayName: String
        get() = "$name (#$id)"

    val raw: String = """
        Hello $name
        Score: ${tags.size}
        Nested: ${"inner $name"}
    """.trimIndent()
}

fun CoroutineScope.loadUsers(repo: Repository<User>, ids: List<Int>) = launch {
    for (id in ids) {
        val user = repo.fetch(id);
        println(if (user != null) "Found: ${user.displayName}" else "Not found: $id")
    }
    for ((index, value) in ids.withIndex()) {
        println("the element at $index is $value")
    }
}

fun String.isValidEmail(): Boolean = this.contains("@") && this.contains(".")

infix fun Int.pow(exponent: Int): Int {
    var result = 1;
    repeat(exponent) { result *= this }
    return result
}

operator fun Point.plus(other: Point) = Point(x + other.x, y + other.y)

data class Point(val x: Int, val y: Int)

class Box<out T>(val value: T)
fun <T : Comparable<T>> sort(list: List<T>) {}

fun example() {
    val x = when (obj) {
        1 -> { "One" }
        "Hello" -> { "Greeting" }
        in 1..10 -> { "In range" }
        else -> { "Unknown" }
    }
    val y = when (obj) {
        is Long -> { "Long" }
        else -> { "Other" }
    }
    val y2 = when (obj) {
        !is String -> { "Not a string" }
        else -> { "Other" }
    }
    val max = if (a > b) a else b;
    val doubled = listOf(1, 2, 3).map { it * 2 }
    val names = listOf(1, 2, 3).map { item -> item.toString() }
    val greeting = "Hello, $name!";
    val message = "Hello, ${user.uppercase()}!";
    val l = b?.length ?: -1;
    val n = c!!;
    val range1 = 1..10;
    val range2 = 10 downTo 1 step 2;
    val (num, text) = Pair(1, "one");
    val list: List<Int> = emptyList();
    val cmp = a < b && c > d;
    class Person(
        val firstName: String,
        val lastName: String,
        val age: Int,
    )
    listOf(1, 2, 3).forEach lit@{
        if (it == 0) return@lit
        print(it)
    }
    val trailing = listOf(
        1,
        2,
        3,
    )
}

fun testNullSafety(input: String?): String {
    val length = input?.length ?: 0;
    val upper = input!!.uppercase();
    return upper
}

suspend fun fetchData(): String {
    return withContext(Dispatchers.IO) {
        "data"
    }
}

object Singleton {
    val value = 42;
}

val a = 1;
val b: String? = null;
val c: String? = "hello";
val obj: Any = 1;
val user = "world";
val name = "World";
val age = 30;
val score = object { val value = 10 };
val array = arrayOf(1,2,3);
val ids = listOf(1,2,3);
val map = mapOf("a" to 1);
val pair = Pair(1, "one");
val list: List<Int> = emptyList();
// empty file edge
