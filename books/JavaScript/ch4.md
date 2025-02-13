---
title: "第 4 章 表达式和运算符"
date: 2020-11-02T22:18:39+08:00
---

This chapter documents JavaScript expressions and the operators with which many of those expressions are built. An
expression is a phrase of JavaScript that can be evaluated to produce a value. A constant embedded literally in your
program is a very simple kind of expression. A variable name is also a simple expression that evaluates to whatever
value has been assigned to that variable. Complex expressions are built from simpler expressions. An array access
expression, for example, consists of one expression that evaluates to an array followed by an open square bracket, an
expression that evaluates to an integer, and a close square bracket. This new, more complex expression evaluates to the
value stored at the specified index of the specified array. Similarly, a function invocation expression consists of one
expression that evaluates to a function object and zero or more additional expressions that are used as the arguments to
the function.

>
本章介绍了JavaScript表达式和用于构建这些表达式的运算符。表达式是JavaScript的一个短语，可以计算它来产生一个值。在程序中嵌入的常量是一种非常简单的表达式。变量名也是一个简单的表达式，计算结果为分配给该变量的任何值。复杂的表达式是由简单的表达式构建的。例如，数组访问表达式由一个计算结果为数组的表达式、一个计算结果为整数的表达式和一个右方括号组成。这个新的更复杂的表达式计算为存储在指定数组的指定索引处的值。类似地，函数调用表达式由计算为函数对象的一个表达式和用作函数参数的零个或多个附加表达式组成。

The most common way to build a complex expression out of simpler expressions is with an operator. An operator combines
the values of its operands (usually two of them) in some way and evaluates to a new value. The multiplication operator *
is a simple example. The expression x * y evaluates to the product of the values of the expressions x and y. For
simplicity, we sometimes say that an operator returns a value rather than “evaluates to” a value.

> 从较简单的表达式构建复杂表达式的最常见方法是使用运算符。运算符以某种方式组合其操作数的值(通常是两个)
> 并计算为一个新值。乘法运算符*是一个简单的示例。表达式x * y的值是表达式x和y的值的乘积。为了简单起见，我们有时说运算符返回一个值，而不是“求值”一个值。

This chapter documents all of JavaScript’s operators, and it also explains expressions (such as array indexing and
function invocation) that do not use operators. If you already know another programming language that uses C-style
syntax, you’ll find that the syntax of most of JavaScript’s expressions and operators is already familiar to you.

> 这一章记录了所有的JavaScript运算符，也解释了不使用运算符的表达式(比如数组索引和函数调用)
> 。如果您已经知道另一种使用c风格语法的编程语言，那么您会发现JavaScript的大多数表达式和运算符的语法对您来说已经很熟悉了。

## 4.1 Primary Expressions

The simplest expressions, known as primary expressions, are those that stand alone—they do not include any simpler
expressions. Primary expressions in JavaScript are constant or literal values, certain language keywords, and variable
references.

> 最简单的表达式被称为基本表达式，是那些独立的表达式——它们不包括任何更简单的表达式。JavaScript中的主表达式是常量或文字值、某些语言关键字和变量引用。

Literals are constant values that are embedded directly in your program. They look like these:

> 文本是直接嵌入到程序中的常数值。它们看起来是这样的:

```js
1.23         // A number literal
"hello"      // A string literal
/ pattern /    // A regular expression literal
```

JavaScript syntax for number literals was covered in §3.2. String literals were documented in §3.3. The regular
expression literal syntax was introduced in §3.3.5 and will be documented in detail in §11.3.

> 在§3.2中介绍了用于数字文字的JavaScript语法。在§3.3中记录了字符串文字。正则表达式字面语法是在§3.3.5中介绍的，并将在§11.3中详细说明。

Some of JavaScript’s reserved words are primary expressions:

> 一些JavaScript的保留字是主要的表达式:

```js
true       // Evalutes to the boolean true value
false      // Evaluates to the boolean false value
null       // Evaluates to the null value
this       // Evaluates to the "current" object
```

We learned about true, false, and null in §3.4 and §3.5. Unlike the other keywords, this is not a constant—it evaluates
to different values in different places in the program. The this keyword is used in object-oriented programming. Within
the body of a method, this evaluates to the object on which the method was invoked. See §4.5, Chapter 8 (especially
§8.2.2), and Chapter 9 for more on this.

> 我们在§3.4和§3.5中学习了真、假和空。与其他关键字不同，这不是常量—它在程序的不同位置计算不同的值。关键字this用于面向对象编程。在方法体中，这将计算为调用该方法的对象。请参阅§4.5，第
> 8 章(特别是§8.2.2)和第 9 章来了解更多这方面的内容。

Finally, the third type of primary expression is a reference to a variable, constant, or property of the global object:

> 最后，第三种类型的主表达式是对全局对象的变量、常量或属性的引用:

```js
i             // Evaluates to the value of the variable i.
sum           // Evaluates to the value of the variable sum.
undefined     // The value of the "undefined" property of the global object
```

When any identifier appears by itself in a program, JavaScript assumes it is a variable or constant or property of the
global object and looks up its value. If no variable with that name exists, an attempt to evaluate a nonexistent
variable throws a ReferenceError instead.


> 当任何标识符在程序中单独出现时，JavaScript假定它是全局对象的变量、常量或属性，并查找其值。如果不存在具有该名称的变量，则尝试对不存在的变量求值会抛出一个ReferenceError。

## 4.2 Object and Array Initializers

Object and array initializers are expressions whose value is a newly created object or array. These initializer
expressions are sometimes called object literals and array literals. Unlike true literals, however, they are not primary
expressions, because they include a number of subexpressions that specify property and element values. Array
initializers have a slightly simpler syntax, and we’ll begin with those.

>
对象和数组初始化器是其值为新创建的对象或数组的表达式。这些初始化器表达式有时被称为对象字面量和数组字面量。然而，与真正的字面值不同，它们不是主表达式，因为它们包括许多指定属性和元素值的子表达式。数组初始化器的语法稍微简单一些，我们将从这些开始。

An array initializer is a comma-separated list of expressions contained within square brackets. The value of an array
initializer is a newly created array. The elements of this new array are initialized to the values of the
comma-separated expressions:

>
数组初始化器是包含在方括号内的以逗号分隔的表达式列表。数组初始化器的值是一个新创建的数组。这个新数组的元素被初始化为逗号分隔的表达式的值:

```js
[]         // An empty array: no expressions inside brackets means no elements
    [1 + 2, 3 + 4]  // A 2-element array.  First element is 3, second is 7
```

The element expressions in an array initializer can themselves be array initializers, which means that these expressions
can create nested arrays:

> 数组初始化器中的元素表达式本身可以是数组初始化器，这意味着这些表达式可以创建嵌套数组:

```js
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
```

The element expressions in an array initializer are evaluated each time the array initializer is evaluated. This means
that the value of an array initializer expression may be different each time it is evaluated.

> 数组初始化式中的元素表达式在每次求值数组初始化式时都会求值。这意味着数组初始化器表达式的值在每次求值时可能不同。

Undefined elements can be included in an array literal by simply omitting a value between commas. For example, the
following array contains five elements, including three undefined elements:

> 只需在逗号之间省略一个值，就可以将未定义的元素包含在数组字面量中。例如，下面的数组包含5个元素，其中3个是未定义的元素:

```js
let sparseArray = [1, , , , 5];
```

A single trailing comma is allowed after the last expression in an array initializer and does not create an undefined
element. However, any array access expression for an index after that of the last expression will necessarily evaluate
to undefined.

> 在数组初始化器的最后一个表达式后面可以使用一个逗号，并且不会创建未定义的元素。然而，在最后一个表达式的索引之后的任何数组访问表达式都必须求值为undefined。

Object initializer expressions are like array initializer expressions, but the square brackets are replaced by curly
brackets, and each subexpression is prefixed with a property name and a colon:

> 对象初始化器表达式与数组初始化器表达式类似，但方括号被花括号替换，每个子表达式前面都有属性名和冒号:

```js
let p = {x: 2.3, y: -1.2};  // An object with 2 properties
let q = {};                   // An empty object with no properties
q.x = 2.3;
q.y = -1.2;        // Now q has the same properties as p
```

In ES6, object literals have a much more feature-rich syntax (you can find details in §6.10). Object literals can be
nested. For example:

> 在ES6中，对象字面量有更丰富的语法特性(你可以在§6.10中找到细节)。对象字面量可以嵌套。例如:

```js
let rectangle = {
    upperLeft: {x: 2, y: 2},
    lowerRight: {x: 4, y: 5}
};
```

We’ll see object and array initializers again in Chapters 6 and 7.

> 我们将在第 6 章和第 7 章再次看到对象和数组初始化器。

## 4.3 Function Definition Expressions

A function definition expression defines a JavaScript function, and the value of such an expression is the newly defined
function. In a sense, a function definition expression is a “function literal” in the same way that an object
initializer is an “object literal.” A function definition expression typically consists of the keyword function followed
by a comma-separated list of zero or more identifiers (the parameter names) in parentheses and a block of JavaScript
code (the function body) in curly braces. For example:

>
函数定义表达式定义一个JavaScript函数，这种表达式的值是新定义的函数。在某种意义上，函数定义表达式是“函数字面量”，就像对象初始化器是“对象字面量”一样。一个函数定义表达式通常由关键字function和一个以逗号分隔的列表组成，列表中包含0个或多个标识符(
参数名)和一个JavaScript代码块(函数体)(花括号)。例如:

```js
// This function returns the square of the value passed to it.
let square = function (x) {
    return x * x;
};
```

A function definition expression can also include a name for the function. Functions can also be defined using a
function statement rather than a function expression. And in ES6 and later, function expressions can use a compact new
“arrow function” syntax. Complete details on function definition are in Chapter 8.

> 函数定义表达式还可以包含函数的名称。函数也可以使用函数语句而不是函数表达式来定义。在ES6及以后的版本中，函数表达式可以使用一种紧凑的新“箭头函数”语法。关于函数定义的完整细节见第
> 8 章。

## 4.4 Property Access Expressions

A property access expression evaluates to the value of an object property or an array element. JavaScript defines two
syntaxes for property access:

> 属性访问表达式的计算结果为对象属性或数组元素的值。JavaScript为属性访问定义了两种语法:

```js
expression.identifier
expression [expression]
```

The first style of property access is an expression followed by a period and an identifier. The expression specifies the
object, and the identifier specifies the name of the desired property. The second style of property access follows the
first expression (the object or array) with another expression in square brackets. This second expression specifies the
name of the desired property or the index of the desired array element. Here are some concrete examples:

>
属性访问的第一种样式是一个表达式，后面跟着句点和标识符。表达式指定对象，标识符指定所需属性的名称。第二种类型的属性访问跟在第一个表达式(
对象或数组)后面，方括号中还有另一个表达式。第二个表达式指定所需属性的名称或所需数组元素的索引。以下是一些具体的例子:

```js
let o = {x: 1, y: {z: 3}}; // An example object
let a = [o, 4, [5, 6]];    // An example array that contains the object
o.x                        // => 1: property x of expression o
o.y.z                      // => 3: property z of expression o.y
o["x"]                     // => 1: property x of object o
a[1]                       // => 4: element at index 1 of expression a
a[2]["1"]                  // => 6: element at index 1 of expression a[2]
a[0].x                     // => 1: property x of expression a[0]
```

With either type of property access expression, the expression before the . or [ is first evaluated. If the value is
null or undefined, the expression throws a TypeError, since these are the two JavaScript values that cannot have
properties. If the object expression is followed by a dot and an identifier, the value of the property named by that
identifier is looked up and becomes the overall value of the expression. If the object expression is followed by another
expression in square brackets, that second expression is evaluated and converted to a string. The overall value of the
expression is then the value of the property named by that string. In either case, if the named property does not exist,
then the value of the property access expression is undefined.

> 使用任一类型的属性访问表达式时，前面的表达式。or[
>
首先被求值。如果值为null或未定义，则表达式抛出TypeError，因为这两个JavaScript值不能具有属性。如果对象表达式后面跟着点和标识符，则该标识符命名的属性的值将被查找并成为表达式的整体值。如果对象表达式后面跟着方括号中的另一个表达式，则计算第二个表达式并将其转换为字符串。表达式的整体值就是由该字符串命名的属性的值。在这两种情况下，如果命名的属性不存在，那么属性访问表达式的值是未定义的。

The .identifier syntax is the simpler of the two property access options, but notice that it can only be used when the
property you want to access has a name that is a legal identifier, and when you know the name when you write the
program. If the property name includes spaces or punctuation characters, or when it is a number (for arrays), you must
use the square bracket notation. Square brackets are also used when the property name is not static but is itself the
result of a computation (see §6.3.1 for an example).

>
identifier语法是两种属性访问选项中比较简单的一种，但请注意，只有当您想要访问的属性具有合法标识符的名称，并且在编写程序时知道该名称时，才可以使用它。如果属性名包含空格或标点字符，或者是数字(
用于数组)，则必须使用方括号表示法。方括号也用于属性名不是静态的，而是计算的结果(参看§6.3.1的例子)。

Objects and their properties are covered in detail in Chapter 6, and arrays and their elements are covered in Chapter 7.

> 对象及其属性将在第 6 章详细介绍，数组及其元素将在第 7 章介绍。

### 4.4.1 Conditional Property Access

ES2020 adds two new kinds of property access expressions:

> ES2020增加了两种新的属性访问表达式:

```js
expression?.identifier
expression ?.[expression]
```

In JavaScript, the values null and undefined are the only two values that do not have properties. In a regular property
access expression using . or [], you get a TypeError if the expression on the left evaluates to null or undefined. You
can use ?. and ?.[] syntax to guard against errors of this type.

> 在JavaScript中，值null和undefined是仅有的两个没有属性的值。在正则属性访问表达式中使用。或者[]
> ，如果左边的表达式计算为null或未定义，则会得到一个TypeError。你可以用?和?。[]语法防止此类错误。

Consider the expression a?.b. If a is null or undefined, then the expression evaluates to undefined without any attempt
to access the property b. If a is some other value, then a?.b evaluates to whatever a.b would evaluate to (and if a does
not have a property named b, then the value will again be undefined).

> 考虑一下a?
> b这个表达式。如果a是null或undefined，则表达式计算为undefined，而没有尝试访问属性b。如果a是其他值，则a?b的值等于a.b的值(
> 如果a没有名为b的属性，那么这个值也将是未定义的)。

This form of property access expression is sometimes called “optional chaining” because it also works for longer
“chained” property access expressions like this one:

> 这种属性访问表达式有时被称为“可选链”（optional chaining），因为它同样适用于更长的“链式”属性访问表达式，例如：

```js
let a = {b: null};
a.b?.c.d   // => undefined
```

a is an object, so a.b is a valid property access expression. But the value of a.b is null, so a.b.c would throw a
TypeError. By using ?. instead of . we avoid the TypeError, and a.b?.c evaluates to undefined. This means that (a.b?.c)
.d will throw a TypeError, because that expression attempts to access a property of the value undefined. But—and this is
a very important part of “optional chaining”—a.b?.c.d (without the parentheses) simply evaluates to undefined and does
not throw an error. This is because property access with ?. is “short-circuiting”: if the subexpression to the left
of ?. evaluates to null or undefined, then the entire expression immediately evaluates to undefined without any further
property access attempts.

> `a` 是一个对象，因此 `a.b` 是一个有效的属性访问表达式。但 `a.b` 的值是 `null`，所以 `a.b.c` 会抛出 `TypeError`（类型错误）。
> 如果使用 `?.` 而不是 `.`，我们可以避免 `TypeError`，因此 `a.b?.c` 的结果是 `undefined`。
> 这意味着 `(a.b?.c).d` 仍然会抛出 `TypeError`，因为该表达式试图访问 `undefined` 的属性。
> 但——这也是“可选链”非常重要的一个部分——`a.b?.c.d`（没有括号）只是简单地返回 `undefined`，而不会抛出错误。
> 这是因为 `?.` 具有“短路”机制：如果 `?.` 左侧的子表达式计算结果为 `null` 或 `undefined`，那么整个表达式会立即返回
`undefined`，而不会再尝试进一步访问属性。

Of course, if a.b is an object, and if that object has no property named c, then a.b?.c.d will again throw a TypeError,
and we will want to use another conditional property access:

> 当然，如果 `a.b` 是一个对象，但该对象没有名为 `c` 的属性，那么 `a.b?.c.d` 仍然会抛出 `TypeError`
> 。此时，我们需要再使用一次可选链操作符来进行条件属性访问：

```js
let a = {b: {}};
a.b?.c?.d  // => undefined
```

Conditional property access is also possible using ?.[] instead of []. In the expression a?.[b][c], if the value of a is
null or undefined, then the entire expression immediately evaluates to undefined, and subexpressions b and c are never
even evaluated. If either of those expressions has side effects, the side effect will not occur if a is not defined:

> 条件属性访问还可以使用 `?.[]` 而不是 `[]`。在表达式 `a?.[b][c]` 中，如果 `a` 的值是 `null` 或 `undefined`，那么整个表达式会立即计算为
`undefined`，而子表达式 `b` 和 `c` 根本不会被计算。  
> 如果这些子表达式中的任何一个具有副作用，那么当 `a` 未定义时，这些副作用就不会发生。

```js
let a;          // Oops, we forgot to initialize this variable!
let index = 0;
try {
    a[index++]; // Throws TypeError
} catch (e) {
    index       // => 1: increment occurs before TypeError is thrown
}
a?.[index++]    // => undefined: because a is undefined
index           // => 1: not incremented because ?.[] short-circuits
a[index++]      // !TypeError: can't index undefined.
```

Conditional property access with ?. and ?.[] is one of the newest features of JavaScript. As of early 2020, this new
syntax is supported in the current or beta versions of most major browsers.
> 使用 `?.` 和 `?.[]` 进行条件属性访问是 JavaScript 最新的特性之一。截至 2020 年初，这种新语法已在大多数主流浏览器的当前版本或测试版中得到支持。

## 4.5 Invocation Expressions

An invocation expression is JavaScript’s syntax for calling (or executing) a function or method. It starts with a
function expression that identifies the function to be called. The function expression is followed by an open
parenthesis, a comma-separated list of zero or more argument expressions, and a close parenthesis. Some examples:
> 调用表达式（Invocation Expression）是 JavaScript
> 用于调用（或执行）函数或方法的语法。它以一个函数表达式开始，该表达式用于标识要调用的函数。  
> 函数表达式后面跟着一个左括号 `(`，然后是由零个或多个参数表达式组成的、用逗号分隔的列表，最后是一个右括号 `)`。  
> 以下是一些示例：

```js
f(0)            // f is the function expression; 0 is the argument expression.
Math.max(x, y, z) // Math.max is the function; x, y, and z are the arguments.
a.sort()        // a.sort is the function; there are no arguments.
```

When an invocation expression is evaluated, the function expression is evaluated first, and then the argument
expressions are evaluated to produce a list of argument values. If the value of the function expression is not a
function, a TypeError is thrown. Next, the argument values are assigned, in order, to the parameter names specified when
the function was defined, and then the body of the function is executed. If the function uses a return statement to
return a value, then that value becomes the value of the invocation expression. Otherwise, the value of the invocation
expression is undefined. Complete details on function invocation, including an explanation of what happens when the
number of argument expressions does not match the number of parameters in the function definition, are in Chapter 8.
> 当计算一个调用表达式时，首先计算函数表达式的值，然后计算参数表达式，以生成一个参数值列表。如果函数表达式的值不是一个函数，就会抛出
`TypeError`（类型错误）。
> 接下来，按照定义函数时指定的参数名称，依次将参数值赋给它们，然后执行函数体。如果函数使用 `return`
> 语句返回一个值，那么该值就成为调用表达式的结果；否则，调用表达式的结果是 `undefined`。
> 关于函数调用的完整细节，包括当参数表达式的数量与函数定义中的参数数量不匹配时会发生什么的解释，请参见第 8 章。

Every invocation expression includes a pair of parentheses and an expression before the open parenthesis. If that
expression is a property access expression, then the invocation is known as a method invocation. In method invocations,
the object or array that is the subject of the property access becomes the value of the this keyword while the body of
the function is being executed. This enables an object-oriented programming paradigm in which functions (which we call
“methods” when used this way) operate on the object of which they are part. See Chapter 9 for details.

> 每个调用表达式都包含一对括号和一个位于左括号前的表达式。如果这个表达式是一个属性访问表达式，那么这个调用被称为方法调用。在方法调用中，作为属性访问对象或数组的“主体”将成为
`this` 关键字的值，并且在函数体执行时使用。
> 这种机制使得面向对象编程范式成为可能，其中函数（当以这种方式使用时，我们称之为“方法”）作用于它们所属的对象。有关详细信息，请参见第
> 9 章。

### 4.5.1 Conditional Invocation

In ES2020, you can also invoke a function using ?.() instead of (). Normally when you invoke a function, if the
expression to the left of the parentheses is null or undefined or any other non-function, a TypeError is thrown. With
the new ?.() invocation syntax, if the expression to the left of the ?. evaluates to null or undefined, then the entire
invocation expression evaluates to undefined and no exception is thrown.
> 在 ES2020 中，你还可以使用 `?.()` 而不是 `()` 来调用一个函数。通常，当你调用一个函数时，如果括号左边的表达式是 `null`、
`undefined` 或其他非函数类型，会抛出 `TypeError`（类型错误）。
> 而使用新的 `?.()` 调用语法时，如果括号左边的表达式计算结果为 `null` 或 `undefined`，那么整个调用表达式会计算为
`undefined`
> ，且不会抛出任何异常。

Array objects have a sort() method that can optionally be passed a function argument that defines the desired sorting
order for the array elements. Before ES2020, if you wanted to write a method like sort() that takes an optional function
argument, you would typically use an if statement to check that the function argument was defined before invoking it in
the body of the if:
> 数组对象有一个 `sort()` 方法，可以选择传递一个函数作为参数，定义数组元素的排序顺序。在 ES2020 之前，如果你想写一个像
`sort()` 这样的函数，它接受一个可选的函数参数，通常你会使用 `if` 语句来检查该函数参数是否被定义，然后再在 `if` 语句的主体中调用它：

```js
function square(x, log) { // The second argument is an optional function
    if (log) {            // If the optional function is passed
        log(x);           // Invoke it
    }
    return x * x;         // Return the square of the argument
}
```

With this conditional invocation syntax of ES2020, however, you can simply write the function invocation using ?.(),
knowing that invocation will only happen if there is actually a value to be invoked:
> 然而，使用 ES2020 的这种条件调用语法，你可以简单地使用 `?.()` 来编写函数调用，确保只有在确实有值可供调用时，调用才会发生：

```js
function square(x, log) { // The second argument is an optional function
    log?.(x);             // Call the function if there is one
    return x * x;         // Return the square of the argument
}
```

Note, however, that ?.() only checks whether the lefthand side is null or undefined. It does not verify that the value
is actually a function. So the square() function in this example would still throw an exception if you passed two
numbers to it, for example.
> 不过需要注意的是，`?.()` 只会检查左侧的值是否为 `null` 或 `undefined`，它不会验证该值是否真的是一个函数。因此，如果你将两个数字传递给
`square()` 函数，例如，这个函数仍然会抛出异常。

Like conditional property access expressions (§4.4.1), function invocation with ?.() is short-circuiting: if the value
to the left of ?. is null or undefined, then none of the argument expressions within the parentheses are evaluated:
> 像条件属性访问表达式（§4.4.1）一样，使用 `?.()` 进行函数调用也具有短路机制：如果 `?.` 左侧的值是 `null` 或 `undefined`
> ，那么括号内的任何参数表达式都不会被计算。

```js
let f = null, x = 0;
try {
    f(x++); // Throws TypeError because f is null
} catch (e) {
    x       // => 1: x gets incremented before the exception is thrown
}
f?.(x++)    // => undefined: f is null, but no exception thrown
x           // => 1: increment is skipped because of short-circuiting
```

Conditional invocation expressions with ?.() work just as well for methods as they do for functions. But because method
invocation also involves property access, it is worth taking a moment to be sure you understand the differences between
the following expressions:
> 使用 `?.()` 进行条件调用表达式对于方法和函数一样有效。但由于方法调用还涉及属性访问，因此值得花点时间确保你理解以下表达式之间的区别：

```js
o.m()     // Regular property access, regular invocation
o?.m()    // Conditional property access, regular invocation
o.m?.()   // Regular property access, conditional invocation
```

In the first expression, o must be an object with a property m and the value of that property must be a function. In the
second expression, if o is null or undefined, then the expression evaluates to undefined. But if o has any other value,
then it must have a property m whose value is a function. And in the third expression, o must not be null or undefined.
If it does not have a property m, or if the value of that property is null, then the entire expression evaluates to
undefined.
> 在第一个表达式中，`o` 必须是一个对象，且该对象必须有一个名为 `m` 的属性，并且这个属性的值必须是一个函数。  
> 在第二个表达式中，如果 `o` 是 `null` 或 `undefined`，那么表达式的结果是 `undefined`。但是如果 `o` 具有其他任何值，那么它必须有一个属性
`m`，且该属性的值必须是一个函数。  
> 在第三个表达式中，`o` 不能是 `null` 或 `undefined`。如果 `o` 没有属性 `m`，或者该属性的值是 `null`，那么整个表达式的结果将是
`undefined`。

Conditional invocation with ?.() is one of the newest features of JavaScript. As of the first months of 2020, this new
syntax is supported in the current or beta versions of most major browsers.
> 使用 `?.()` 进行条件调用是 JavaScript 最新的特性之一。截止到 2020 年初，这种新语法已在大多数主流浏览器的当前版本或测试版中得到支持。

## 4.6 Object Creation Expressions

An object creation expression creates a new object and invokes a function (called a constructor) to initialize the
properties of that object. Object creation expressions are like invocation expressions except that they are prefixed
with the keyword new:
> 对象创建表达式用于创建一个新对象，并调用一个函数（称为构造函数）来初始化该对象的属性。对象创建表达式与调用表达式类似，不同之处在于它们前面加上了
`new` 关键字：

```js
new Object()
new Point(2, 3)
```

If no arguments are passed to the constructor function in an object creation expression, the empty pair of parentheses
can be omitted:
> 如果在对象创建表达式中没有向构造函数传递任何参数，那么可以省略空的括号对：

```js
new Object
new Date
```

The value of an object creation expression is the newly created object. Constructors are explained in more detail in
Chapter 9.
> 对象创建表达式的值是新创建的对象。构造函数的详细说明请参见第 9 章。

## 4.7 Operator Overview

Operators are used for JavaScript’s arithmetic expressions, comparison expressions, logical expressions, assignment
expressions, and more. Table 4-1 summarizes the operators and serves as a convenient reference.
> 运算符用于 JavaScript 的算术表达式、比较表达式、逻辑表达式、赋值表达式等。表 4-1 总结了这些运算符，并作为一个便捷的参考。

Note that most operators are represented by punctuation characters such as + and =. Some, however, are represented by
keywords such as delete and instanceof. Keyword operators are regular operators, just like those expressed with
punctuation; they simply have a less succinct syntax.
> 请注意，大多数运算符由标点符号表示，如 `+` 和 `=`。然而，有些运算符由关键字表示，如 `delete` 和 `instanceof`
> 。关键字运算符和使用标点符号表示的运算符是一样的，只不过它们的语法较为冗长。

Table 4-1 is organized by operator precedence. The operators listed first have higher precedence than those listed last.
Operators separated by a horizontal line have different precedence levels. The column labeled A gives the operator
associativity, which can be L (left-to-right) or R (right-to-left), and the column N specifies the number of operands.
The column labeled Types lists the expected types of the operands and (after the → symbol) the result type for the
operator. The subsections that follow the table explain the concepts of precedence, associativity, and operand type. The
operators themselves are individually documented following that discussion.
> 表 4-1 按照运算符优先级进行组织。首先列出的运算符优先级高于最后列出的运算符。由水平线分隔的运算符具有不同的优先级水平。标记为
> A 的列给出了运算符的结合性，可以是 L（从左到右）或 R（从右到左），N 列指定操作数的数量。标记为 Types 的列列出了操作数的预期类型，并在
`→` 符号之后给出了运算符的结果类型。表格后面的子节将解释优先级、结合性和操作数类型的概念。运算符本身将在讨论之后单独文档化。

Table 4-1. JavaScript operators

| Operator                     | Operation                        | A | N | Types            |
|------------------------------|----------------------------------|---|---|------------------|
| ++                           | Pre- or post-increment           | R | 1 | lval→num         |
| --                           | Pre- or post-decrement           | R | 1 | lval→num         |
| -                            | Negate number                    | R | 1 | num→num          |
| +                            | Convert to number                | R | 1 | any→num          |
| ~                            | Invert bits                      | R | 1 | int→int          |
| !                            | Invert boolean value             | R | 1 | bool→bool        |
| delete                       | Remove a property                | R | 1 | lval→bool        |
| typeof                       | Determine type of operand        | R | 1 | any→str          |
| void                         | Return undefined value           | R | 1 | any→undef        |
| `**`                         | Exponentiate                     | R | 2 | num,num→num      |
| `*`, `/`, `%`                | Multiply, divide, remainder      | L | 2 | num,num→num      |
| +, -                         | Add, subtract                    | L | 2 | num,num→num      |
| +                            | Concatenate strings              | L | 2 | str,str→str      |
| <<                           | Shift left                       | L | 2 | int,int→int      |
| `>>`                         | Shift right with sign extension  | L | 2 | int,int→int      |
| `>>>`                        | Shift right with zero extension  | L | 2 | int,int→int      |
| <, <=,>, >=                  | Compare in numeric order         | L | 2 | num,num→bool     |
| <, <=,>, >=                  | Compare in alphabetical order    | L | 2 | str,str→bool     |
| instanceof                   | Test object class                | L | 2 | obj,func→bool    |
| in                           | Test whether property exists     | L | 2 | any,obj→bool     |
| ==                           | Test for non-strict equality     | L | 2 | any,any→bool     |
| !=                           | Test for non-strict inequality   | L | 2 | any,any→bool     |
| ===                          | Test for strict equality         | L | 2 | any,any→bool     |
| !==                          | Test for strict inequality       | L | 2 | any,any→bool     |
| &                            | Compute bitwise AND              | L | 2 | int,int→int      |
| ^                            | Compute bitwise XOR              | L | 2 | int,int→int      |
| \|                           | Compute bitwise OR               | L | 2 | int,int→int      |
| &&                           | Compute logical AND              | L | 2 | any,any→any      |
| \|\|                         | Compute logical OR               | L | 2 | any,any→any      |
| ??                           | Choose 1st defined operand       | L | 2 | any,any→any      |
| ?:                           | Choose 2nd or 3rd operand        | R | 3 | bool,any,any→any |
| =                            | Assign to a variable or property | R | 2 | lval,any→any     |
| `**=, *=, /=, %=,`           | Operate and assign               | R | 2 | lval,any→any     |
| `+=`, `-=`, `&=`, `^=`, \|=, |                                  |   |   |                  |
| `<<=, >>=, >>>=`             |                                  |   |   |                  |
| ,                            | Discard 1st operand, return 2nd  | L | 2 | any,any→any      |

### 4.7.1 Number of Operands

Operators can be categorized based on the number of operands they expect (their arity). Most JavaScript operators, like
the * multiplication operator, are binary operators that combine two expressions into a single, more complex expression.
That is, they expect two operands. JavaScript also supports a number of unary operators, which convert a single
expression into a single, more complex expression. The − operator in the expression −x is a unary operator that performs
the operation of negation on the operand x. Finally, JavaScript supports one ternary operator, the conditional
operator ?:, which combines three expressions into a single expression.
> 运算符可以根据它们期望的操作数数量（即运算符的元数）进行分类。大多数 JavaScript 运算符，如 `*`
> 乘法运算符，是二元运算符，它将两个表达式合并成一个更复杂的表达式。也就是说，它们期望两个操作数。  
> JavaScript 还支持一些一元运算符，它们将单个表达式转换为一个更复杂的表达式。例如，表达式 `-x` 中的 `-` 运算符是一个一元运算符，它对操作数
`x` 执行取反操作。  
> 最后，JavaScript 支持一个三元运算符——条件运算符 `?:`，它将三个表达式合并为一个表达式。

### 4.7.2 Operand and Result Type

Some operators work on values of any type, but most expect their operands to be of a specific type, and most operators
return (or evaluate to) a value of a specific type. The Types column in Table 4-1 specifies operand types (before the
arrow) and result type (after the arrow) for the operators.
> 有些运算符可以作用于任何类型的值，但大多数运算符期望它们的操作数是特定类型的，且大多数运算符会返回（或计算出）特定类型的值。表
> 4-1 中的 Types 列指定了运算符的操作数类型（箭头前）和结果类型（箭头后）。

JavaScript operators usually convert the type (see §3.9) of their operands as needed. The multiplication operator *
expects numeric operands, but the expression "3" * "5" is legal because JavaScript can convert the operands to numbers.
The value of this expression is the number 15, not the string “15”, of course. Remember also that every JavaScript value
is either “truthy” or “falsy,” so operators that expect boolean operands will work with an operand of any type.
> JavaScript 运算符通常会根据需要转换它们操作数的类型（参见 §3.9）。乘法运算符 `*` 期望数字类型的操作数，但表达式
`"3" * "5"` 是合法的，因为 JavaScript 可以将操作数转换为数字。这个表达式的结果是数字 `15`，而不是字符串 `"15"`
> ，这是显而易见的。  
> 还要记住，每个 JavaScript 值要么是“真值”（truthy），要么是“假值”（falsy），因此，期望布尔类型操作数的运算符将与任何类型的操作数一起工作。

Some operators behave differently depending on the type of the operands used with them. Most notably, the + operator
adds numeric operands but concatenates string operands. Similarly, the comparison operators such as < perform comparison
in numerical or alphabetical order depending on the type of the operands. The descriptions of individual operators
explain their type-dependencies and specify what type conversions they perform.
> 一些运算符的行为会根据与之一起使用的操作数类型而有所不同。最显著的例子是 `+` 运算符，它对数字操作数执行加法操作，但对字符串操作数执行连接操作。同样，比较运算符如
`<` 会根据操作数的类型执行数字或字母顺序的比较。  
> 各个运算符的描述会解释它们的类型依赖性，并指定它们执行的类型转换。

Notice that the assignment operators and a few of the other operators listed in Table 4-1 expect an operand of type
lval. lvalue is a historical term that means “an expression that can legally appear on the left side of an assignment
expression.” In JavaScript, variables, properties of objects, and elements of arrays are lvalues.
> 请注意，表 4-1 中列出的赋值运算符和一些其他运算符期望操作数的类型是 `lval`。`lval` 是一个历史术语，表示“可以合法出现在赋值表达式左侧的表达式”。在
> JavaScript 中，变量、对象的属性以及数组的元素都是 `lval`。

### 4.7.3 Operator Side Effects

Evaluating a simple expression like 2 * 3 never affects the state of your program, and any future computation your
program performs will be unaffected by that evaluation. Some expressions, however, have side effects, and their
evaluation may affect the result of future evaluations. The assignment operators are the most obvious example: if you
assign a value to a variable or property, that changes the value of any expression that uses that variable or property.
The ++ and -- increment and decrement operators are similar, since they perform an implicit assignment. The delete
operator also has side effects: deleting a property is like (but not the same as) assigning undefined to the property.
> 像 `2 * 3`
>
这样的简单表达式的计算不会影响程序的状态，且程序未来的计算也不会受到该计算的影响。然而，有些表达式会有副作用，它们的计算可能会影响未来计算的结果。赋值运算符就是最明显的例子：如果你给变量或属性赋值，那么使用该变量或属性的任何表达式的值都会发生变化。
`++` 和 `--` 自增和自减运算符也类似，因为它们会隐式地执行赋值操作。`delete` 运算符也有副作用：删除属性就像（但不完全等同于）将
`undefined` 赋给该属性一样。

No other JavaScript operators have side effects, but function invocation and object creation expressions will have side
effects if any of the operators used in the function or constructor body have side effects.
> 没有其他 JavaScript 运算符具有副作用，但如果在函数体或构造函数体内使用的任何运算符有副作用，那么函数调用和对象创建表达式也会有副作用。

### 4.7.4 Operator Precedence

The operators listed in Table 4-1 are arranged in order from high precedence to low precedence, with horizontal lines
separating groups of operators at the same precedence level. Operator precedence controls the order in which operations
are performed. Operators with higher precedence (nearer the top of the table) are performed before those with lower
precedence (nearer to the bottom).
> 表 4-1 中列出的运算符按优先级从高到低排列，水平线将具有相同优先级的运算符分组。运算符优先级控制操作执行的顺序。优先级较高的运算符（靠近表格顶部）会先于优先级较低的运算符（靠近表格底部）执行。

Consider the following expression:

```js
w = x + y * z;
```

The multiplication operator * has a higher precedence than the addition operator +, so the multiplication is performed
before the addition. Furthermore, the assignment operator = has the lowest precedence, so the assignment is performed
after all the operations on the right side are completed.
> 乘法运算符 `*` 的优先级高于加法运算符 `+`，因此乘法会先于加法执行。此外，赋值运算符 `=` 的优先级最低，因此赋值操作会在右侧的所有运算完成之后执行。

Operator precedence can be overridden with the explicit use of parentheses. To force the addition in the previous
example to be performed first, write:
> 运算符优先级可以通过显式使用括号来覆盖。在前面的例子中，如果想强制先执行加法，可以这样写：

```js
w = (x + y) * z;
```

Note that property access and invocation expressions have higher precedence than any of the operators listed in Table
4-1. Consider this expression:
> 请注意，属性访问和调用表达式的优先级高于表 4-1 中列出的任何运算符。考虑以下表达式：

```js
// my is an object with a property named functions whose value is an
// my 是一个对象，具有名为 functions 的属性，该属性的值是一个函数数组
// array of functions. We invoke function number x, passing it argument
// 我们调用数组中的第 x 个函数，并传递参数 y，然后查询返回值的类型。
// y, and then we ask for the type of the value returned.
typeof my.functions[x](y)
```

Although typeof is one of the highest-priority operators, the typeof operation is performed on the result of the
property access, array index, and function invocation, all of which have higher priority than operators.
> 尽管 `typeof` 是优先级最高的运算符之一，但 `typeof` 操作会作用于属性访问、数组索引和函数调用的结果，而这些操作的优先级高于运算符的优先级。

In practice, if you are at all unsure about the precedence of your operators, the simplest thing to do is to use
parentheses to make the evaluation order explicit. The rules that are important to know are these: multiplication and
division are performed before addition and subtraction, and assignment has very low precedence and is almost always
performed last.
> 实际上，如果你对运算符的优先级有任何不确定，最简单的方法就是使用括号使计算顺序变得明确。需要知道的几个重要规则是：乘法和除法的优先级高于加法和减法，而赋值运算符的优先级非常低，几乎总是最后执行。

When new operators are added to JavaScript, they do not always fit naturally into this precedence scheme. The ??
operator (§4.13.2) is shown in the table as lower-precedence than || and &&, but, in fact, its precedence relative to
those operators is not defined, and ES2020 requires you to explicitly use parentheses if you mix ?? with either ||
or &&. Similarly, the new ** exponentiation operator does not have a well-defined precedence relative to the unary
negation operator, and you must use parentheses when combining negation with exponentiation.
> 当新的运算符被添加到 JavaScript 中时，它们并不总是自然地适应现有的优先级规则。`??` 运算符（参见 §4.13.2）在表中显示为比
`||` 和 `&&` 低优先级，但实际上，它与这些运算符的优先级关系并未定义，且 ES2020 要求在将 `??` 与 `||` 或 `&&`
> 混合时显式使用括号。同样，新的 `**` 幂运算符与一元取反运算符的优先级关系也没有明确的定义，因此在将取反与幂运算结合时，必须使用括号。

### 4.7.5 Operator Associativity

In Table 4-1, the column labeled A specifies the associativity of the operator. A value of L specifies left-to-right
associativity, and a value of R specifies right-to-left associativity. The associativity of an operator specifies the
order in which operations of the same precedence are performed. Left-to-right associativity means that operations are
performed from left to right. For example, the subtraction operator has left-to-right associativity, so:
> 在表 4-1 中，标记为 A 的列指定了运算符的结合性。值为 L 表示从左到右的结合性，值为 R
> 表示从右到左的结合性。运算符的结合性指定了在相同优先级的操作中，运算执行的顺序。  
> 从左到右的结合性意味着运算会从左向右执行。例如，减法运算符具有从左到右的结合性，因此：

```js
w = x - y - z;
```

is the same as:
> 与以下内容相同

```js
w = ((x - y) - z);
```

On the other hand, the following expressions:
> 另一方面，以下表达式：

```js
y = a ** b ** c;
x = ~-y;
w = x = y = z;
q = a ? b : c ? d : e ? f : g;
```

are equivalent to:
> 等价于：

```js
y = (a ** (b ** c));
x = ~(-y);
w = (x = (y = z));
q = a ? b : (c ? d : (e ? f : g));
```

because the exponentiation, unary, assignment, and ternary conditional operators have right-to-left associativity.
> 因为幂运算符、一元运算符、赋值运算符和三元条件运算符具有从右到左的结合性。

### 4.7.6 Order of Evaluation

Operator precedence and associativity specify the order in which operations are performed in a complex expression, but
they do not specify the order in which the subexpressions are evaluated. JavaScript always evaluates expressions in
strictly left-to-right order. In the expression w = x + y * z, for example, the subexpression w is evaluated first,
followed by x, y, and z. Then the values of y and z are multiplied, added to the value of x, and assigned to the
variable or property specified by expression w. Adding parentheses to the expressions can change the relative order of
the multiplication, addition, and assignment, but not the left-to-right order of evaluation.
> 运算符的优先级和结合性指定了在复杂表达式中执行操作的顺序，但它们并不指定子表达式的求值顺序。JavaScript
> 总是严格按从左到右的顺序评估表达式。例如，在表达式 `w = x + y * z` 中，首先会评估子表达式 `w`，接着评估 `x`、`y` 和 `z`。然后，
`y` 和 `z` 的值会先被相乘，结果加上 `x` 的值，并赋值给由表达式 `w` 指定的变量或属性。  
> 添加括号可以改变乘法、加法和赋值操作的相对顺序，但不会改变求值的从左到右顺序。

Order of evaluation only makes a difference if any of the expressions being evaluated has side effects that affect the
value of another expression. If expression x increments a variable that is used by expression z, then the fact that x is
evaluated before z is important.
> 求值顺序只有在评估的表达式有副作用，且这些副作用会影响另一个表达式的值时，才会产生影响。如果表达式 `x` 自增了一个变量，而这个变量在表达式
`z` 中被使用，那么 `x` 在 `z` 之前求值这一事实就变得很重要。

## 4.8 Arithmetic Expressions

This section covers the operators that perform arithmetic or other numerical manipulations on their operands. The
exponentiation, multiplication, division, and subtraction operators are straightforward and are covered first. The
addition operator gets a subsection of its own because it can also perform string concatenation and has some unusual
type conversion rules. The unary operators and the bitwise operators are also covered in subsections of their own.
> 本节介绍了对其操作数进行算术或其他数值操作的运算符。指数运算、乘法、除法和减法运算符比较直接，因此会首先介绍。加法运算符单独有一个小节，因为它还可以执行字符串连接，并且有一些特殊的类型转换规则。单目运算符和位运算符也有各自的小节。

Most of these arithmetic operators (except as noted as follows) can be used with BigInt (see §3.2.5) operands or with
regular numbers, as long as you don’t mix the two types.
> 除了以下所述情况，大多数算术运算符都可以与 BigInt（见 §3.2.5）操作数或常规数字一起使用，只要不混合这两种类型。

The basic arithmetic operators are `**` (exponentiation), * (multiplication), / (division), % (modulo: remainder after
division), + (addition), and - (subtraction). As noted, we’ll discuss the + operator in a section of its own. The other
five basic operators simply evaluate their operands, convert the values to numbers if necessary, and then compute the
power, product, quotient, remainder, or difference. Non-numeric operands that cannot convert to numbers convert to the
NaN value. If either operand is (or converts to) NaN, the result of the operation is (almost always) NaN.
> 基本的算术运算符有 `**`（指数运算）、`*`（乘法）、`/`（除法）、`%`（取余：除法后的余数）、`+`（加法）和 `-`（减法）。如前所述，我们将在一个单独的小节中讨论
`+` 运算符。其他五个基本运算符只会评估它们的操作数，必要时将值转换为数字，然后计算幂、乘积、商、余数或差。不能转换为数字的非数字操作数会转换为
> NaN 值。如果任一操作数是（或转换为）NaN，则该操作的结果（几乎总是）为 NaN。

The `**` operator has higher precedence than *, /, and % (which in turn have higher precedence than + and -). Unlike the
other operators, `**` works right-to-left, so 2`**`2`**`3 is the same as 2`**`8, not 4`**`3. There is a natural
ambiguity to expressions like -3`**`2. Depending on the relative precedence of unary minus and exponentiation, that
expression could mean (-3)`**`2 or -(3`**`2). Different languages handle this differently, and rather than pick sides,
JavaScript simply makes it a syntax error to omit parentheses in this case, forcing you to write an unambiguous
expression. `**` is JavaScript’s newest arithmetic operator: it was added to the language with ES2016. The Math.pow()
function has been available since the earliest versions of JavaScript, however, and it performs exactly the same
operation as the `**` operator.
> `**` 运算符的优先级高于 `*`、`/` 和 `%`（这三者的优先级又高于 `+` 和 `-`）。与其他运算符不同，`**` 是从右到左的运算符，因此
`2**2**3` 等于 `2**8`，而不是 `4**3`。对于表达式如 `-3**2` 存在自然的歧义。根据一元负号和指数运算的相对优先级，该表达式可以表示
`(-3)**2` 或 `-(3**2)`。不同的编程语言处理方式不同，而 JavaScript 为了避免歧义，在这种情况下会直接报语法错误，强制你写出明确无歧义的表达式。
`**` 是 JavaScript 最新的算术运算符：它在 ES2016 中加入了语言。但 `Math.pow()` 函数自 JavaScript 的最早版本就已存在，且执行的操作与
`**` 运算符完全相同。

The / operator divides its first operand by its second. If you are used to programming languages that distinguish
between integer and floating-point numbers, you might expect to get an integer result when you divide one integer by
another. In JavaScript, however, all numbers are floating-point, so all division operations have floating-point results:
5/2 evaluates to 2.5, not 2. Division by zero yields positive or negative infinity, while 0/0 evaluates to NaN: neither
of these cases raises an error.
> `/` 运算符将其第一个操作数除以第二个操作数。如果你习惯了区分整数和浮点数的编程语言，你可能会期望将两个整数相除时得到一个整数结果。然而，在
> JavaScript 中，所有数字都是浮点数，因此所有的除法操作都会得到浮点结果：`5/2` 结果是 `2.5`，而不是 `2`。除以零会返回正无穷或负无穷，而
`0/0` 会返回 NaN：这些情况不会引发错误。

The % operator computes the first operand modulo the second operand. In other words, it returns the remainder after
whole-number division of the first operand by the second operand. The sign of the result is the same as the sign of the
first operand. For example, 5 % 2 evaluates to 1, and -5 % 2 evaluates to -1.
> `%` 运算符计算第一个操作数对第二个操作数的取余。换句话说，它返回第一个操作数除以第二个操作数后的余数。结果的符号与第一个操作数的符号相同。例如，
`5 % 2` 的结果是 `1`，而 `-5 % 2` 的结果是 `-1`。

While the modulo operator is typically used with integer operands, it also works for floating-point values. For example,
6.5 % 2.1 evaluates to 0.2.
> 尽管取余运算符通常与整数操作数一起使用，但它也适用于浮点数。例如，`6.5 % 2.1` 的结果是 `0.2`。

### 4.8.1 The + Operator

The binary + operator adds numeric operands or concatenates string operands:
> 二元 `+` 运算符用于加法运算（对数字操作数）或字符串连接（对字符串操作数）：

```js
1 + 2                        // => 3
"hello" + " " + "there"      // => "hello there"
"1" + "2"                    // => "12"
```

When the values of both operands are numbers, or are both strings, then it is obvious what the + operator does. In any
other case, however, type conversion is necessary, and the operation to be performed depends on the conversion
performed. The conversion rules for + give priority to string concatenation: if either of the operands is a string or an
object that converts to a string, the other operand is converted to a string and concatenation is performed. Addition is
performed only if neither operand is string-like.
> 当两个操作数的值都是数字，或者都是字符串时，`+` 运算符的行为是显而易见的。然而，在其他情况下，需要进行类型转换，执行的操作取决于所进行的转换。
`+` 运算符的转换规则优先进行字符串连接：如果其中一个操作数是字符串或可以转换为字符串的对象，另一个操作数会被转换为字符串并进行连接。只有当两个操作数都不是“字符串类型”时，才会执行加法运算。

Technically, the + operator behaves like this:
> 从技术上讲，`+` 运算符的行为如下：

- If either of its operand values is an object, it converts it to a primitive using the object-to-primitive algorithm
  described in §3.9.3. Date objects are converted by their toString() method, and all other objects are converted via
  valueOf(), if that method returns a primitive value. However, most objects do not have a useful valueOf() method, so
  they are converted via toString() as well.
- > 如果它的任一操作数是对象，它会使用在 §3.9.3 中描述的对象转原始值算法将其转换为原始值。Date 对象通过它们的 `toString()`
  方法进行转换，而其他所有对象则通过 `valueOf()` 方法进行转换（如果该方法返回原始值）。然而，大多数对象没有有用的 `valueOf()`
  方法，因此它们也会通过 `toString()` 方法进行转换。
- After object-to-primitive conversion, if either operand is a string, the other is converted to a string and
  concatenation is performed.
- > 在对象转原始值转换之后，如果其中一个操作数是字符串，另一个操作数会被转换为字符串，并进行连接操作。
- Otherwise, both operands are converted to numbers (or to NaN) and addition is performed.
- > 否则，两个操作数都会被转换为数字（或者转换为 NaN），然后执行加法运算。

Here are some examples:

```js
1 + 2         // => 3: addition
"1" + "2"     // => "12": concatenation
"1" + 2       // => "12": concatenation after number-to-string
1 + {}        // => "1[object Object]": concatenation after object-to-string
true + true   // => 2: addition after boolean-to-number
2 + null      // => 2: addition after null converts to 0
2 + undefined // => NaN: addition after undefined converts to NaN
```

Finally, it is important to note that when the + operator is used with strings and numbers, it may not be associative.
That is, the result may depend on the order in which operations are performed.
> 最后，值得注意的是，当 `+` 运算符用于字符串和数字时，它可能不是结合性的。也就是说，结果可能取决于运算执行的顺序。

For example:

```js
1 + 2 + " blind mice"    // => "3 blind mice"
1 + (2 + " blind mice")  // => "12 blind mice"
```

The first line has no parentheses, and the + operator has left-to-right associativity, so the two numbers are added
first, and their sum is concatenated with the string. In the second line, parentheses alter this order of operations:
the number 2 is concatenated with the string to produce a new string. Then the number 1 is concatenated with the new
string to produce the final result.

### 4.8.2 Unary Arithmetic Operators

Unary operators modify the value of a single operand to produce a new value. In JavaScript, the unary operators all have
high precedence and are all right-associative. The arithmetic unary operators described in this section (+, -, ++,
and --) all convert their single operand to a number, if necessary. Note that the punctuation characters + and - are
used as both unary and binary operators.
> 第一行没有括号，`+` 运算符是从左到右结合的，所以首先将两个数字相加，然后将它们的和与字符串连接。在第二行中，括号改变了运算顺序：数字
> 2 与字符串连接，生成一个新的字符串。然后，数字 1 与这个新字符串连接，最终产生结果。

The unary arithmetic operators are the following:
> 一元算术运算符如下：

Unary plus (+)  
The unary plus operator converts its operand to a number (or to NaN) and returns that converted value. When used with an
operand that is already a number, it doesn’t do anything. This operator may not be used with BigInt values, since they
cannot be converted to regular numbers.
> 一元加号运算符将其操作数转换为数字（或转换为 NaN），并返回该转换后的值。当用于已经是数字的操作数时，它不会做任何事情。此运算符不能与
> BigInt 值一起使用，因为 BigInt 值不能转换为常规数字。

Unary minus (-)  
When - is used as a unary operator, it converts its operand to a number, if necessary, and then changes the sign of the
result.
> 当 `-` 作为一元运算符使用时，它会根据需要将操作数转换为数字，然后改变结果的符号。

Increment (++)  
The ++ operator increments (i.e., adds 1 to) its single operand, which must be an lvalue (a variable, an element of an
array, or a property of an object). The operator converts its operand to a number, adds 1 to that number, and assigns
the incremented value back into the variable, element, or property.
> `++` 运算符将其单一操作数递增（即加 1），该操作数必须是 lvalue（变量、数组元素或对象属性）。该运算符将操作数转换为数字，给该数字加
> 1，然后将递增后的值重新赋回给变量、元素或属性。

The return value of the ++ operator depends on its position relative to the operand. When used before the operand, where
it is known as the pre-increment operator, it increments the operand and evaluates to the incremented value of that
operand. When used after the operand, where it is known as the post-increment operator, it increments its operand but
evaluates to the unincremented value of that operand. Consider the difference between these two lines of code:
> `++` 运算符的返回值取决于它相对于操作数的位置。当它位于操作数之前时，被称为前置递增运算符，它递增操作数并返回递增后的值。当它位于操作数之后时，被称为后置递增运算符，它递增操作数但返回未递增的值。考虑以下两行代码之间的区别：

```js
let i = 1, j = ++i;    // i and j are both 2
let n = 1, m = n++;    // n is 2, m is 1
```

Note that the expression x++ is not always the same as x=x+1. The ++ operator never performs string concatenation: it
always converts its operand to a number and increments it. If x is the string “1”, ++x is the number 2, but x+1 is the
string “11”.
> 请注意，表达式 `x++` 并不总是等同于 `x = x + 1`。`++` 运算符从不执行字符串连接：它始终将操作数转换为数字并递增它。如果 `x`
> 是字符串 `"1"`，那么 `++x` 的值是数字 `2`，但 `x + 1` 的值是字符串 `"11"`。

Also note that, because of JavaScript’s automatic semicolon insertion, you cannot insert a line break between the
post-increment operator and the operand that precedes it. If you do so, JavaScript will treat the operand as a complete
statement by itself and insert a semicolon before it.
> 还需要注意，由于 JavaScript 的自动分号插入机制，你不能在后置递增运算符和前面的操作数之间插入换行符。如果这么做，JavaScript
> 会将操作数视为一个完整的语句，并在其前面插入一个分号。

This operator, in both its pre- and post-increment forms, is most commonly used to increment a counter that controls a
for loop (§5.4.3).
> 这个运算符，无论是前置递增形式还是后置递增形式，最常用于递增一个控制 for 循环的计数器 (§5.4.3)。

Decrement (--)  
The -- operator expects an lvalue operand. It converts the value of the operand to a number, subtracts 1, and assigns
the decremented value back to the operand. Like the ++ operator, the return value of -- depends on its position relative
to the operand. When used before the operand, it decrements and returns the decremented value. When used after the
operand, it decrements the operand but returns the undecremented value. When used after its operand, no line break is
allowed between the operand and the operator.

### 4.8.3 Bitwise Operators

The bitwise operators perform low-level manipulation of the bits in the binary representation of numbers. Although they
do not perform traditional arithmetic operations, they are categorized as arithmetic operators here because they operate
on numeric operands and return a numeric value. Four of these operators perform Boolean algebra on the individual bits
of the operands, behaving as if each bit in each operand were a boolean value (1=true, 0=false). The other three bitwise
operators are used to shift bits left and right. These operators are not commonly used in JavaScript programming, and if
you are not familiar with the binary representation of integers, including the two’s complement representation of
negative integers, you can probably skip this section.
> `--` 运算符期望一个 lvalue 操作数。它将操作数的值转换为数字，减去 1，并将递减后的值重新赋回给操作数。与 `++` 运算符类似，
`--` 的返回值取决于其相对于操作数的位置。若运算符位于操作数之前，它会递减操作数并返回递减后的值；若运算符位于操作数之后，它会递减操作数，但返回未递减的值。若运算符位于操作数之后，则操作数与运算符之间不得插入换行符。

The bitwise operators expect integer operands and behave as if those values were represented as 32-bit integers rather
than 64-bit floating-point values. These operators convert their operands to numbers, if necessary, and then coerce the
numeric values to 32-bit integers by dropping any fractional part and any bits beyond the 32nd. The shift operators
require a right-side operand between 0 and 31. After converting this operand to an unsigned 32-bit integer, they drop
any bits beyond the 5th, which yields a number in the appropriate range. Surprisingly, NaN, Infinity, and -Infinity all
convert to 0 when used as operands of these bitwise operators.
> 位运算符期望整数操作数，并假设这些值以 32 位整数的形式表示，而不是 64 位浮点数。这些运算符在必要时将操作数转换为数字，然后将数值强制转换为
> 32 位整数，方法是去掉任何小数部分和超过第 32 位的位。移位运算符要求右侧操作数在 0 到 31 之间。移位操作符会将该操作数转换为无符号的
> 32 位整数，并去掉超过第 5 位的任何位，从而得到适当范围内的数字。令人惊讶的是，NaN、Infinity 和 -Infinity
> 在作为这些位运算符的操作数时都会转换为
> 0。

All of these bitwise operators except >>> can be used with regular number operands or with BigInt (see §3.2.5) operands.
> 除了 `>>>` 运算符之外，所有这些位运算符都可以与常规数字操作数或 BigInt（参见 §3.2.5）操作数一起使用。

Bitwise AND (&)  
The & operator performs a Boolean AND operation on each bit of its integer arguments. A bit is set in the result only if
the corresponding bit is set in both operands. For example, 0x1234 & 0x00FF evaluates to 0x0034.
> `&` 运算符对其整数参数的每个位执行布尔与（AND）操作。只有当对应的位在两个操作数中都被设置时，结果中的该位才会被设置。例如，
`0x1234 & 0x00FF` 计算结果为 `0x0034`。

Bitwise OR (|)  
The | operator performs a Boolean OR operation on each bit of its integer arguments. A bit is set in the result if the
corresponding bit is set in one or both of the operands. For example, 0x1234 | 0x00FF evaluates to 0x12FF.
> `|` 运算符对其整数参数的每个位执行布尔或（OR）操作。如果对应的位在一个或两个操作数中被设置，结果中的该位就会被设置。例如，
`0x1234 | 0x00FF` 计算结果为 `0x12FF`。

Bitwise XOR (^)  
The ^ operator performs a Boolean exclusive OR operation on each bit of its integer arguments. Exclusive OR means that
either operand one is true or operand two is true, but not both. A bit is set in this operation’s result if a
corresponding bit is set in one (but not both) of the two operands. For example, 0xFF00 ^ 0xF0F0 evaluates to 0x0FF0.
> `^` 运算符对其整数参数的每个位执行布尔异或（exclusive
> OR）操作。异或意味着要么操作数一为真，要么操作数二为真，但不能同时为真。如果某个对应的位只在两个操作数中的一个被设置，那么结果中的该位就会被设置。例如，
`0xFF00 ^ 0xF0F0` 计算结果为 `0x0FF0`。

Bitwise NOT (~)  
The ~ operator is a unary operator that appears before its single integer operand. It operates by reversing all bits in
the operand. Because of the way signed integers are represented in JavaScript, applying the ~ operator to a value is
equivalent to changing its sign and subtracting 1. For example, ~0x0F evaluates to 0xFFFFFFF0, or −16.
> `~` 运算符是一个一元运算符，位于其单个整数操作数之前。它通过反转操作数中的所有位来工作。由于 JavaScript 中有符号整数的表示方式，将
`~` 运算符应用于一个值，相当于改变其符号并减去 1。例如，`~0x0F` 计算结果为 `0xFFFFFFF0`，即 `-16`。

Shift left (<<)  
The << operator moves all bits in its first operand to the left by the number of places specified in the second operand,
which should be an integer between 0 and 31. For example, in the operation a << 1, the first bit (the ones bit) of a
becomes the second bit (the twos bit), the second bit of a becomes the third, etc. A zero is used for the new first bit,
and the value of the 32nd bit is lost. Shifting a value left by one position is equivalent to multiplying by 2, shifting
two positions is equivalent to multiplying by 4, and so on. For example, 7 << 2 evaluates to 28.
> `<<` 运算符将第一个操作数中的所有位向左移动第二个操作数指定的位置，第二个操作数应该是 0 到 31 之间的整数。例如，在操作
`a << 1` 中，a 的第一位（个位）变成第二位（二位），a 的第二位变成第三位，以此类推。新的第一位用零填充，且第 32
> 位的值会丢失。将一个值向左移动一位相当于乘以 2，向左移动两位相当于乘以 4，依此类推。例如，`7 << 2` 计算结果为 28。

Shift right with sign (>>)  
The >> operator moves all bits in its first operand to the right by the number of places specified in the second
operand (an integer between 0 and 31). Bits that are shifted off the right are lost. The bits filled in on the left
depend on the sign bit of the original operand, in order to preserve the sign of the result. If the first operand is
positive, the result has zeros placed in the high bits; if the first operand is negative, the result has ones placed in
the high bits. Shifting a positive value right one place is equivalent to dividing by 2 (discarding the remainder),
shifting right two places is equivalent to integer division by 4, and so on. 7 >> 1 evaluates to 3, for example, but
note that and −7 >> 1 evaluates to −4.
> `>>` 运算符将第一个操作数中的所有位向右移动第二个操作数指定的位置（一个介于 0 和 31
> 之间的整数）。被移除的右侧位会丢失。填充到左侧的位取决于原始操作数的符号位，以保持结果的符号。如果第一个操作数是正数，结果的高位会填充零；如果第一个操作数是负数，结果的高位会填充一。将一个正值向右移动一位相当于除以
> 2（去掉余数），向右移动两位相当于整数除以 4，依此类推。例如，`7 >> 1` 的计算结果为 3，但注意 `-7 >> 1` 的计算结果为 -4。

Shift right with zero fill (>>>)
The >>> operator is just like the >> operator, except that the bits shifted in on the left are always zero, regardless
of the sign of the first operand. This is useful when you want to treat signed 32-bit values as if they are unsigned
integers. −1 >> 4 evaluates to −1, but −1 >>> 4 evaluates to 0x0FFFFFFF, for example. This is the only one of the
JavaScript bitwise operators that cannot be used with BigInt values. BigInt does not represent negative numbers by
setting the high bit the way that 32-bit integers do, and this operator only makes sense for that particular two’s
complement representation.
> `>>>` 运算符与 `>>` 运算符类似，不同之处在于左侧填充的位始终为零，无论第一个操作数的符号如何。这在需要将有符号的 32
> 位值当作无符号整数处理时非常有用。例如，`-1 >> 4` 结果为 -1，但 `-1 >>> 4` 结果为 `0x0FFFFFFF`。这是 JavaScript 中唯一一个不能与
> BigInt 值一起使用的位运算符。BigInt 不像 32 位整数那样通过设置高位来表示负数，因此该运算符只适用于这种二进制补码表示法。

## 4.9 Relational Expressions

This section describes JavaScript’s relational operators. These operators test for a relationship (such as “equals,”
“less than,” or “property of”) between two values and return true or false depending on whether that relationship
exists. Relational expressions always evaluate to a boolean value, and that value is often used to control the flow of
program execution in if, while, and for statements (see Chapter 5). The subsections that follow document the equality
and inequality operators, the comparison operators, and JavaScript’s other two relational operators, in and instanceof.
> 本节介绍了 JavaScript 的关系运算符。这些运算符用于测试两个值之间的关系（例如，“等于”、“小于”或“是……的属性”），并根据是否存在该关系返回
`true` 或 `false`。关系表达式总是返回布尔值，这个值通常用于控制程序执行的流程，例如在 `if`、`while` 和 `for` 语句中使用（见第
> 5 章）。接下来的小节将详细说明等于与不等于运算符、比较运算符以及 JavaScript 其他两个关系运算符：`in` 和 `instanceof`。

### 4.9.1 Equality and Inequality Operators

The == and === operators check whether two values are the same, using two different definitions of sameness. Both
operators accept operands of any type, and both return true if their operands are the same and false if they are
different. The === operator is known as the strict equality operator (or sometimes the identity operator), and it checks
whether its two operands are “identical” using a strict definition of sameness. The == operator is known as the equality
operator; it checks whether its two operands are “equal” using a more relaxed definition of sameness that allows type
conversions.
> `==` 和 `===` 运算符用于检查两个值是否相同，但使用了两种不同的相等定义。两个运算符都接受任何类型的操作数，如果它们的操作数相同，则返回
`true`，否则返回 `false`。
> - `===` 运算符被称为严格相等运算符（有时也叫做身份运算符），它使用严格的相等定义检查两个操作数是否“相同”。这意味着两个操作数必须不仅值相同，而且类型也相同。
> - `==` 运算符被称为相等运算符，它使用一种更宽松的相等定义来检查两个操作数是否“相等”，这允许类型转换。

The != and !== operators test for the exact opposite of the == and === operators. The != inequality operator returns
false if two values are equal to each other according to == and returns true otherwise. The !== operator returns false
if two values are strictly equal to each other and returns true otherwise. As you’ll see in §4.10, the ! operator
computes the Boolean NOT operation. This makes it easy to remember that != and !== stand for “not equal to” and “not
strictly equal to.”
> `!=` 和 `!==` 运算符用于测试与 `==` 和 `===` 运算符完全相反的条件。
> - `!=` 不等于运算符：如果两个值根据 `==` 相等，则返回 `false`，否则返回 `true`。
> - `!==` 严格不等于运算符：如果两个值严格相等（即值和类型都相等），则返回 `false`，否则返回 `true`。  
    正如在 §4.10 中所示，`!` 运算符用于计算布尔的 NOT 操作。这使得记住 `!=` 和 `!==` 分别表示“非相等”和“非严格相等”变得更加容易。

THE =, ==, AND === OPERATORS  
JavaScript supports =, ==, and === operators. Be sure you understand the differences between these assignment, equality,
and strict equality operators, and be careful to use the correct one when coding! Although it is tempting to read all
three operators as “equals,” it may help to reduce confusion if you read “gets” or “is assigned” for =, “is equal to”
for ==, and “is strictly equal to” for ===.
> JavaScript 支持 `=`, `==`, 和 `===`
> 运算符。一定要理解这些赋值、相等性和严格相等性运算符之间的区别，并在编码时小心使用正确的运算符！虽然把这三个运算符都看作是“等于”是很容易的，但如果你将它们分别理解为：“赋值”或“被赋值”用于
`=`，“相等于”用于 `==`，以及“严格相等于”用于 `===`，可能会减少一些混淆。

The == operator is a legacy feature of JavaScript and is widely considered to be a source of bugs. You should almost
always use === instead of ==, and !== instead of !=.
> `==` 运算符是 JavaScript 的遗留特性，被广泛认为是 bug 的来源。你应该几乎总是使用 `===` 代替 `==`，并使用 `!==` 代替 `!=`。

As mentioned in §3.8, JavaScript objects are compared by reference, not by value. An object is equal to itself, but not
to any other object. If two distinct objects have the same number of properties, with the same names and values, they
are still not equal. Similarly, two arrays that have the same elements in the same order are not equal to each other.
> 正如 §3.8 中提到的，JavaScript
> 中的对象是按引用比较的，而不是按值比较的。一个对象等于它自己，但不等于任何其他对象。如果两个不同的对象具有相同数量的属性，且属性名和值相同，它们仍然不相等。同样，两个具有相同元素且顺序相同的数组也不相等。

STRICT EQUALITY  
The strict equality operator === evaluates its operands, then compares the two values as follows, performing no type
conversion:
> 严格相等操作符 `===` 评估其操作数，然后按照以下方式比较两个值，且不进行类型转换：

- If the two values have different types, they are not equal.
- If both values are null or both values are undefined, they are equal.
- If both values are the boolean value true or both are the boolean value false, they are equal.
- If one or both values is NaN, they are not equal. (This is surprising, but the NaN value is never equal to any other
  value, including itself! To check whether a value x is NaN, use x !== x, or the global isNaN() function.)
- If both values are numbers and have the same value, they are equal. If one value is 0 and the other is -0, they are
  also equal.
- If both values are strings and contain exactly the same 16-bit values (see the sidebar in §3.3) in the same positions,
  they are equal. If the strings differ in length or content, they are not equal. Two strings may have the same meaning
  and the same visual appearance, but still be encoded using different sequences of 16-bit values. JavaScript performs
  no Unicode normalization, and a pair of strings like this is not considered equal to the === or == operators.
- If both values refer to the same object, array, or function, they are equal. If they refer to different objects, they
  are not equal, even if both objects have identical properties.

> - 如果两个值的类型不同，它们不相等。
> - 如果两个值都是 `null` 或都是 `undefined`，则它们相等。
> - 如果两个值都是布尔值 `true` 或都是布尔值 `false`，则它们相等。
> - 如果一个或两个值是 `NaN`，则它们不相等。（这可能让人吃惊，但 `NaN` 值从来不等于任何其他值，包括它自己！要检查一个值 `x`
    是否是 `NaN`，可以使用 `x !== x` 或全局的 `isNaN()` 函数。）
> - 如果两个值都是数字且具有相同的值，它们相等。如果一个值是 0，另一个是 -0，它们也相等。
> - 如果两个值都是字符串，并且包含完全相同的 16 位值（参见 §3.3
    中的侧边栏）并且在相同位置，它们相等。如果字符串的长度或内容不同，则它们不相等。两个字符串可能具有相同的含义和视觉外观，但仍然可能使用不同的
    16 位值序列进行编码。JavaScript 不执行 Unicode 归一化，因此像这样的字符串对 `===` 或 `==` 操作符来说是不相等的。
> - 如果两个值引用相同的对象、数组或函数，它们相等。如果它们引用不同的对象，即使这两个对象具有相同的属性，它们也不相等。

EQUALITY WITH TYPE CONVERSION  
The equality operator == is like the strict equality operator, but it is less strict. If the values of the two operands
are not the same type, it attempts some type conversions and tries the comparison again:
> == 操作符类似于严格相等操作符 ===，但它要求不那么严格。如果两个操作数的类型不同，它会尝试进行某些类型转换，然后重新进行比较：

- If the two values have the same type, test them for strict equality as described previously. If they are strictly
  equal, they are equal. If they are not strictly equal, they are not equal.
- If the two values do not have the same type, the == operator may still consider them equal. It uses the following
  rules and type conversions to check for equality:
    - If one value is null and the other is undefined, they are equal.
    - If one value is a number and the other is a string, convert the string to a number and try the comparison again,
      using the converted value.
    - If either value is true, convert it to 1 and try the comparison again. If either value is false, convert it to 0
      and try the comparison again.
    - If one value is an object and the other is a number or string, convert the object to a primitive using the
      algorithm described in §3.9.3 and try the comparison again. An object is converted to a primitive value by either
      its toString() method or its valueOf() method. The built-in classes of core JavaScript attempt valueOf()
      conversion before toString() conversion, except for the Date class, which performs toString() conversion.
    - Any other combinations of values are not equal.

> - 如果两个值具有相同类型，则按之前描述的严格相等规则进行测试。如果它们严格相等，则认为它们相等。如果它们不严格相等，则认为它们不相等。
> - 如果两个值类型不同，== 操作符仍然可能认为它们相等。它使用以下规则和类型转换来检查是否相等：
    >

- 如果一个值是 null，另一个值是 undefined，则它们相等。

> - 如果一个值是数字，另一个值是字符串，则将字符串转换为数字并重新尝试比较，使用转换后的值。
>   - 如果任一值为 true，则将其转换为 1 并重新尝试比较。如果任一值为 false，则将其转换为 0 并重新尝试比较。
>   - 如果一个值是对象，另一个值是数字或字符串，则使用 §3.9.3 中描述的算法将对象转换为原始值并重新进行比较。对象通过其
      toString() 方法或 valueOf() 方法转换为原始值。核心 JavaScript 的内建类会优先进行 valueOf() 转换，再进行 toString()
      转换，除了 Date 类，它会先进行 toString() 转换。
>   - 其他任何组合的值都不相等。

As an example of testing for equality, consider the comparison:
> 作为测试相等性的一个例子，考虑以下比较：

```js
"1" == true  // => true
```

This expression evaluates to true, indicating that these very different-looking values are in fact equal. The boolean
value true is first converted to the number 1, and the comparison is done again. Next, the string "1" is converted to
the number 1. Since both values are now the same, the comparison returns true.
> 这个表达式的结果为 true，表示这些看起来非常不同的值实际上是相等的。首先，布尔值 true 被转换为数字
> 1，然后重新进行比较。接下来，字符串 "1" 被转换为数字 1。由于两个值现在相同，比较结果为 true。

### 4.9.2 Comparison Operators

The comparison operators test the relative order (numerical or alphabetical) of their two operands:
> 比较运算符测试两个操作数的相对顺序（数字或字母顺序）：

Less than (<)  
The < operator evaluates to true if its first operand is less than its second operand; otherwise, it evaluates to false.
> `<` 运算符如果第一个操作数小于第二个操作数，则返回 `true`；否则返回 `false`。

Greater than (>)  
The > operator evaluates to true if its first operand is greater than its second operand; otherwise, it evaluates to
false.
> `>` 运算符如果第一个操作数大于第二个操作数，则返回 `true`；否则返回 `false`。

Less than or equal (<=)  
The <= operator evaluates to true if its first operand is less than or equal to its second operand; otherwise, it
evaluates to false.
> `<=` 运算符如果第一个操作数小于或等于第二个操作数，则返回 `true`；否则返回 `false`。

Greater than or equal (>=)  
The >= operator evaluates to true if its first operand is greater than or equal to its second operand; otherwise, it
evaluates to false.
> `>=` 运算符如果第一个操作数大于或等于第二个操作数，则返回 `true`；否则返回 `false`。

The operands of these comparison operators may be of any type. Comparison can be performed only on numbers and strings,
however, so operands that are not numbers or strings are converted.
> 这些比较运算符的操作数可以是任何类型。然而，比较只能在数字和字符串之间进行，因此非数字或字符串的操作数会被转换。

Comparison and conversion occur as follows:

- If either operand evaluates to an object, that object is converted to a primitive value, as described at the end of
  §3.9.3; if its valueOf() method returns a primitive value, that value is used. Otherwise, the return value of its
  toString() method is used.
- If, after any required object-to-primitive conversion, both operands are strings, the two strings are compared, using
  alphabetical order, where “alphabetical order” is defined by the numerical order of the 16-bit Unicode values that
  make up the strings.
- If, after object-to-primitive conversion, at least one operand is not a string, both operands are converted to numbers
  and compared numerically. 0 and -0 are considered equal. Infinity is larger than any number other than itself, and
  -Infinity is smaller than any number other than itself. If either operand is (or converts to) NaN, then the comparison
  operator always returns false. Although the arithmetic operators do not allow BigInt values to be mixed with regular
  numbers, the comparison operators do allow comparisons between numbers and BigInts.

> - 如果任一操作数是对象，则该对象会被转换为原始值，如§3.9.3末尾所描述；如果它的valueOf()
    方法返回原始值，则使用该值。否则，使用其toString()方法的返回值。
> - 如果在任何必要的对象到原始值的转换后，两个操作数都是字符串，则按字母顺序比较这两个字符串，其中“字母顺序”是由组成字符串的16位Unicode值的数值顺序定义的。
> -
如果在对象到原始值的转换后，至少有一个操作数不是字符串，则两个操作数会被转换为数字并进行数值比较。0和-0被视为相等。Infinity比除它自己外的任何数字都大，而-Infinity比除它自己外的任何数字都小。如果任一操作数是（或转换为）NaN，则比较运算符始终返回false。尽管算术运算符不允许将BigInt值与常规数字混合使用，但比较运算符允许数字和BigInt之间的比较。

Remember that JavaScript strings are sequences of 16-bit integer values, and that string comparison is just a numerical
comparison of the values in the two strings. The numerical encoding order defined by Unicode may not match the
traditional collation order used in any particular language or locale. Note in particular that string comparison is
case-sensitive, and all capital ASCII letters are “less than” all lowercase ASCII letters. This rule can cause confusing
results if you do not expect it. For example, according to the < operator, the string “Zoo” comes before the string
“aardvark”.
>
请记住，JavaScript字符串是16位整数值的序列，字符串比较只是对两个字符串中值的数值比较。Unicode定义的数值编码顺序可能与任何特定语言或地区使用的传统排序顺序不匹配。特别需要注意的是，字符串比较是区分大小写的，所有大写ASCII字母“比”所有小写ASCII字母小。如果没有预料到这一点，这条规则可能会导致令人困惑的结果。例如，根据<
运算符，字符串“Zoo”排在字符串“aardvark”之前。

For a more robust string-comparison algorithm, try the String.localeCompare() method, which also takes locale-specific
definitions of alphabetical order into account. For case-insensitive comparisons, you can convert the strings to all
lowercase or all uppercase using String.toLowerCase() or String.toUpperCase(). And, for a more general and better
localized string comparison tool, use the Intl.Collator class described in §11.7.3.
> 对于一个更强大的字符串比较算法，可以尝试使用 `String.localeCompare()` 方法，它还会考虑到特定于地区的字母顺序定义。对于不区分大小写的比较，你可以使用
`String.toLowerCase()` 或 `String.toUpperCase()` 将字符串转换为全小写或全大写。并且，对于一个更通用且本地化更好的字符串比较工具，可以使用在§11.7.3中描述的
`Intl.Collator` 类。

Both the + operator and the comparison operators behave differently for numeric and string operands. + favors strings:
it performs concatenation if either operand is a string. The comparison operators favor numbers and only perform string
comparison if both operands are strings:
> 无论是加号 `+` 操作符还是比较操作符，对于数字和字符串操作数它们的行为都是不同的。`+`
> 操作符更倾向于字符串：如果任一操作数是字符串，它将执行拼接操作。比较操作符则更倾向于数字，只有在两个操作数都是字符串的情况下才进行字符串比较：

```js
1 + 2        // => 3: addition.
"1" + "2"    // => "12": concatenation.
"1" + 2      // => "12": 2 is converted to "2".
11 < 3       // => false: numeric comparison.
"11" < "3"   // => true: string comparison.
"11" < 3     // => false: numeric comparison, "11" converted to 11.
"one" < 3    // => false: numeric comparison, "one" converted to NaN.
```

Finally, note that the <= (less than or equal) and >= (greater than or equal) operators do not rely on the equality or
strict equality operators for determining whether two values are “equal.” Instead, the less-than-or-equal operator is
simply defined as “not greater than,” and the greater-than-or-equal operator is defined as “not less than.” The one
exception occurs when either operand is (or converts to) NaN, in which case, all four comparison operators return false.
> 最后，请注意，`<=`（小于或等于）和 `>=`
>
（大于或等于）操作符在确定两个值是否“相等”时，并不依赖于相等性或严格相等性操作符。相反，小于或等于操作符简单地定义为“不大于”，而大于或等于操作符定义为“不小于”。有一种例外情况是当任意一个操作数是（或转换为）NaN时，在这种情况下，这四个比较操作符都会返回
`false`。

### 4.9.3 The in Operator

The in operator expects a left-side operand that is a string, symbol, or value that can be converted to a string. It
expects a right-side operand that is an object. It evaluates to true if the left-side value is the name of a property of
the right-side object. For example:
> `in` 操作符期望左侧操作数是一个字符串、符号或可以转换为字符串的值，并且右侧操作数是一个对象。如果左侧的值是右侧对象的一个属性名称，则它求值为
`true`。例如：

```js
let point = {x: 1, y: 1};  // Define an object
"x" in point               // => true: object has property named "x"
"z" in point               // => false: object has no "z" property.
"toString" in point        // => true: object inherits toString method

let data = [7, 8, 9];        // An array with elements (indices) 0, 1, and 2
"0" in data                // => true: array has an element "0"
1 in data                  // => true: numbers are converted to strings
3 in data                  // => false: no element 3
```

### 4.9.4 The instanceof Operator

The instanceof operator expects a left-side operand that is an object and a right-side operand that identifies a class
of objects. The operator evaluates to true if the left-side object is an instance of the right-side class and evaluates
to false otherwise. Chapter 9 explains that, in JavaScript, classes of objects are defined by the constructor function
that initializes them. Thus, the right-side operand of instanceof should be a function. Here are examples:
> `instanceof` 操作符期望左侧操作数是一个对象，右侧操作数标识一个对象类别。该操作符在左侧对象是右侧类的实例时求值为 `true`
> ，否则求值为 `false`。第9章解释了，在JavaScript中，对象的类别是由初始化它们的构造函数定义的。因此，`instanceof`
> 的右侧操作数应该是一个函数。这里有例子：

```js
let d = new Date();  // Create a new object with the Date() constructor
d instanceof Date    // => true: d was created with Date()
d instanceof Object  // => true: all objects are instances of Object
d instanceof Number  // => false: d is not a Number object
let a = [1, 2, 3];   // Create an array with array literal syntax
a instanceof Array   // => true: a is an array
a instanceof Object  // => true: all arrays are objects
a instanceof RegExp  // => false: arrays are not regular expressions
```

Note that all objects are instances of Object. instanceof considers the “superclasses” when deciding whether an object
is an instance of a class. If the left-side operand of instanceof is not an object, instanceof returns false. If the
righthand side is not a class of objects, it throws a TypeError.
> 请注意，所有对象都是 `Object` 的实例。`instanceof` 在决定一个对象是否为某类的实例时会考虑其“超类”。如果 `instanceof`
> 的左侧操作数不是一个对象，则 `instanceof` 返回 `false`。如果右侧操作数不是一个对象类别，它将抛出 `TypeError`。

In order to understand how the instanceof operator works, you must understand the “prototype chain.” This is
JavaScript’s inheritance mechanism, and it is described in §6.3.2. To evaluate the expression o instanceof f, JavaScript
evaluates f.prototype, and then looks for that value in the prototype chain of o. If it finds it, then o is an instance
of f (or of a subclass of f) and the operator returns true. If f.prototype is not one of the values in the prototype
chain of o, then o is not an instance of f and instanceof returns false.
> 为了理解 `instanceof` 操作符如何工作，你需要了解“原型链”。这是JavaScript的继承机制，在§6.3.2中有描述。要评估表达式
`o instanceof f`，JavaScript首先评估 `f.prototype`，然后在对象 `o` 的原型链中查找该值。如果找到了该值，则表示 `o` 是 `f`（或
`f` 的子类）的一个实例，操作符返回 `true`。如果 `f.prototype` 不是对象 `o` 原型链中的一个值，则 `o` 不是 `f` 的实例，
`instanceof` 返回 `false`。

## 4.10 Logical Expressions

The logical operators &&, ||, and ! perform Boolean algebra and are often used in conjunction with the relational
operators to combine two relational expressions into one more complex expression. These operators are described in the
subsections that follow. In order to fully understand them, you may want to review the concept of “truthy” and “falsy”
values introduced in §3.4.
> 逻辑操作符 `&&`、`||` 和 `!`
> 执行布尔代数运算，并且常与关系操作符一起使用，以将两个关系表达式组合为一个更复杂的表达式。这些操作符在接下来的小节中有详细描述。为了完全理解它们，你可能需要回顾§3.4中介绍的“真值”和“假值”概念。

### 4.10.1 Logical AND (&&)

The && operator can be understood at three different levels. At the simplest level, when used with boolean operands, &&
performs the Boolean AND operation on the two values: it returns true if and only if both its first operand and its
second operand are true. If one or both of these operands is false, it returns false.
> `&&` 操作符可以在三个不同的层次上理解。在最简单的层次上，当与布尔操作数一起使用时，`&&` 对两个值执行布尔 AND
> 操作：只有当它的第一个操作数和第二个操作数都为 `true` 时，它才返回 `true`。如果其中一个或两个操作数为 `false`，则返回
`false`。

&& is often used as a conjunction to join two relational expressions:
> `&&` 经常被用作连接两个关系表达式的连词：

```js
x === 0 && y === 0   // true if, and only if, x and y are both 0
```

Relational expressions always evaluate to true or false, so when used like this, the && operator itself returns true or
false. Relational operators have higher precedence than && (and ||), so expressions like these can safely be written
without parentheses.
> 关系表达式总是求值为 `true` 或 `false`，因此当这样使用时，`&&` 操作符本身返回 `true` 或 `false`。关系操作符的优先级高于
`&&`（和 `||`），因此像这样的表达式可以安全地在没有括号的情况下书写。

But && does not require that its operands be boolean values. Recall that all JavaScript values are either “truthy” or
“falsy.” (See §3.4 for details. The falsy values are false, null, undefined, 0, -0, NaN, and "". All other values,
including all objects, are truthy.) The second level at which && can be understood is as a Boolean AND operator for
truthy and falsy values. If both operands are truthy, the operator returns a truthy value. Otherwise, one or both
operands must be falsy, and the operator returns a falsy value. In JavaScript, any expression or statement that expects
a boolean value will work with a truthy or falsy value, so the fact that && does not always return true or false does
not cause practical problems.
> 但是 `&&` 并不要求其操作数必须是布尔值。回想一下，所有JavaScript值要么是“真值”要么是“假值”。（详情见§3.4。假值包括：`false`、
`null`、`undefined`、`0`、`-0`、`NaN` 和 `""`。所有其他值，包括所有对象，都是真值。）理解 `&&`
>
的第二个层次是作为处理真值和假值的布尔AND操作符。如果两个操作数都是真值，则该操作符返回一个真值。否则，其中一个或两个操作数必定是假值，此时操作符返回一个假值。在JavaScript中，任何期望布尔值的表达式或语句都可以与真值或假值一起工作，因此
`&&` 不总是返回 `true` 或 `false` 并不会引起实际问题。

Notice that this description says that the operator returns “a truthy value” or “a falsy value” but does not specify
what that value is. For that, we need to describe && at the third and final level. This operator starts by evaluating
its first operand, the expression on its left. If the value on the left is falsy, the value of the entire expression
must also be falsy, so && simply returns the value on the left and does not even evaluate the expression on the right.
> 请注意，上述描述中提到该操作符返回“一个真值”或“一个假值”，但并未指定具体返回的是什么值。为了明确这一点，我们需要在第三也是最终层次上描述
`&&` 操作符。这个操作符首先计算其左侧的第一个操作数。如果左侧的值是假值，则整个表达式的值也必定是假值，因此 `&&`
> 直接返回左侧的值，并且不会计算右侧的表达式。

On the other hand, if the value on the left is truthy, then the overall value of the expression depends on the value on
the righthand side. If the value on the right is truthy, then the overall value must be truthy, and if the value on the
right is falsy, then the overall value must be falsy. So when the value on the left is truthy, the && operator evaluates
and returns the value on the right:
> 另一方面，如果左侧的值是真值，则整个表达式的值取决于右侧的值。如果右侧的值是真值，则整体表达式的值必定是真值；如果右侧的值是假值，则整体表达式的值必定是假值。因此，当左侧的值是真值时，
`&&` 操作符会计算并返回右侧的值：

```js
let o = {x: 1};
let p = null;
o && o.x     // => 1: o is truthy, so return value of o.x
p && p.x     // => null: p is falsy, so return it and don't evaluate p.x
```

It is important to understand that && may or may not evaluate its right-side operand. In this code example, the variable
p is set to null, and the expression p.x would, if evaluated, cause a TypeError. But the code uses && in an idiomatic
way so that p.x is evaluated only if p is truthy—not null or undefined.
> 重要的是要理解，`&&` 可能会计算其右侧操作数，也可能不会。在这个代码示例中，变量 `p` 被设置为 `null`，表达式 `p.x`
> 如果被计算的话，将会导致一个 `TypeError`。但是，这段代码以惯用的方式使用了 `&&`，使得 `p.x` 仅在 `p` 为真值（即不是 `null`
> 或
`undefined`）时才会被计算。

The behavior of && is sometimes called short circuiting, and you may sometimes see code that purposely exploits this
behavior to conditionally execute code. For example, the following two lines of JavaScript code have equivalent effects:
> `&&` 的行为有时被称为“短路”。你可能会看到一些故意利用这种行为来有条件地执行代码的代码示例。例如，下面两行JavaScript代码具有相同的效果：

```js
if (a === b) stop();   // Invoke stop() only if a === b
(a === b) && stop();   // This does the same thing
```

In general, you must be careful whenever you write an expression with side effects (assignments, increments, decrements,
or function invocations) on the righthand side of &&. Whether those side effects occur depends on the value of the
lefthand side.
> 一般来说，当你在 `&&` 操作符右侧编写带有副作用（如赋值、自增、自减或函数调用）的表达式时，必须格外小心。这些副作用是否会发生取决于左侧表达式的值。

Despite the somewhat complex way that this operator actually works, it is most commonly used as a simple Boolean algebra
operator that works on truthy and falsy values.
> 尽管这个操作符实际的工作方式有些复杂，但它最常用的场景是作为一个简单的布尔代数操作符，用于处理真值和假值。

### 4.10.2 Logical OR (||)

The || operator performs the Boolean OR operation on its two operands. If one or both operands is truthy, it returns a
truthy value. If both operands are falsy, it returns a falsy value.
> `||` 操作符对其两个操作数执行布尔 OR 操作。如果一个或两个操作数是真值，它返回一个真值。如果两个操作数都是假值，它返回一个假值。

Although the || operator is most often used simply as a Boolean OR operator, it, like the && operator, has more complex
behavior. It starts by evaluating its first operand, the expression on its left. If the value of this first operand is
truthy, it short-circuits and returns that truthy value without ever evaluating the expression on the right. If, on the
other hand, the value of the first operand is falsy, then || evaluates its second operand and returns the value of that
expression.
> 虽然 `||` 操作符最常被简单地用作布尔 OR 操作符，但它和 `&&`
> 操作符一样，有着更复杂的行为。它首先计算其第一个操作数，即左侧的表达式。如果第一个操作数的值是真值，它会进行短路计算并直接返回该真值，而不会计算右侧的表达式。另一方面，如果第一个操作数的值是假值，则
`||` 会计算其第二个操作数，并返回该表达式的值。

As with the && operator, you should avoid right-side operands that include side effects, unless you purposely want to
use the fact that the right-side expression may not be evaluated.
> 与 `&&` 操作符一样，你应该避免在右侧操作数中包含副作用（如赋值、自增、自减或函数调用），除非你有意利用右侧表达式可能不会被计算这一事实。

An idiomatic usage of this operator is to select the first truthy value in a set of alternatives:
> 这种操作符的一种惯用用法是从一组备选项中选择第一个真值：
>

```js
// If maxWidth is truthy, use that. Otherwise, look for a value in
// the preferences object. If that is not truthy, use a hardcoded constant.
let max = maxWidth || preferences.maxWidth || 500;
```

Note that if 0 is a legal value for maxWidth, then this code will not work correctly, since 0 is a falsy value. See
the ?? operator (§4.13.2) for an alternative.
> 注意，如果 `0` 是 `maxWidth` 的合法值，那么这段代码将不能正确工作，因为 `0` 是一个假值。对于这种情况，请参见 `??`
> 操作符（§4.13.2）作为替代方案。

Prior to ES6, this idiom is often used in functions to supply default values for parameters:
> 在ES6之前，这种惯用法常用于函数中以提供参数的默认值：

```js
// Copy the properties of o to p, and return p
function copy(o, p) {
    p = p || {};  // If no object passed for p, use a newly created object.
    // function body goes here
}
```

In ES6 and later, however, this trick is no longer needed because the default parameter value could simply be written in
the function definition itself: function copy(o, p={}) { ... }.
> 然而，在ES6及之后的版本中，这种技巧不再需要，因为可以直接在函数定义中写入默认参数值：`function copy(o, p={}) { ... }`。

### 4.10.3 Logical NOT (!)

The ! operator is a unary operator; it is placed before a single operand. Its purpose is to invert the boolean value of
its operand. For example, if x is truthy, !x evaluates to false. If x is falsy, then !x is true.
> `!` 操作符是一个一元操作符；它放在单个操作数之前。其作用是反转操作数的布尔值。例如，如果 `x` 是真值，则 `!x` 求值为 `false`
> 。如果 `x` 是假值，则 `!x` 为 `true`。

Unlike the && and || operators, the ! operator converts its operand to a boolean value (using the rules described in
Chapter 3) before inverting the converted value. This means that ! always returns true or false and that you can convert
any value x to its equivalent boolean value by applying this operator twice: !!x (see §3.9.2).
> 与 `&&` 和 `||` 操作符不同，`!` 操作符在反转其操作数之前会先将其转换为布尔值（使用第3章中描述的规则）。这意味着 `!` 总是返回
`true` 或 `false`，并且你可以通过两次应用此操作符将任何值 `x` 转换为其等效的布尔值：`!!x`（见§3.9.2）。

As a unary operator, ! has high precedence and binds tightly. If you want to invert the value of an expression like p &&
q, you need to use parentheses: !(p && q). It is worth noting two laws of Boolean algebra here that we can express using
JavaScript syntax:
> 作为一元操作符，`!` 具有较高的优先级并紧密绑定。如果你想反转一个像 `p && q` 这样的表达式的值，你需要使用括号：`!(p && q)`
> 。这里值得指出两个可以用JavaScript语法表示的布尔代数定律：

```js
// DeMorgan's Laws
!(p && q) === (!p || !q)  // => true: for all values of p and q
!(p || q) === (!p && !q)  // => true: for all values of p and q
```

## 4.11 Assignment Expressions

JavaScript uses the = operator to assign a value to a variable or property. For example:
> JavaScript 使用 `=` 操作符为变量或属性赋值。例如：

```js
i = 0;     // Set the variable i to 0.
o.x = 1;   // Set the property x of object o to 1.
```

The = operator expects its left-side operand to be an lvalue: a variable or object property (or array element). It
expects its right-side operand to be an arbitrary value of any type. The value of an assignment expression is the value
of the right-side operand. As a side effect, the = operator assigns the value on the right to the variable or property
on the left so that future references to the variable or property evaluate to the value.
> `=` 操作符期望其左侧操作数是一个左值（l值）：一个变量或对象属性（或数组元素）。它期望其右侧操作数是任意类型的值。赋值表达式的值是右侧操作数的值。作为副作用，
`=` 操作符将右侧的值赋给左侧的变量或属性，使得将来对该变量或属性的引用都会求值为该值。

Although assignment expressions are usually quite simple, you may sometimes see the value of an assignment expression
used as part of a larger expression. For example, you can assign and test a value in the same expression with code like
this:
> 尽管赋值表达式通常非常简单，但有时你可能会看到赋值表达式的值被用作更大表达式的一部分。例如，你可以通过如下代码在同一表达式中同时进行赋值和测试：

```js
(a = b) === 0
```

If you do this, be sure you are clear on the difference between the = and === operators! Note that = has very low
precedence, and parentheses are usually necessary when the value of an assignment is to be used in a larger expression.
> 如果你这样做，务必清楚 `=` 和 `===` 操作符之间的区别！注意，`=` 的优先级非常低，当赋值表达式的值要在更大表达式中使用时，通常需要加上括号。

The assignment operator has right-to-left associativity, which means that when multiple assignment operators appear in
an expression, they are evaluated from right to left. Thus, you can write code like this to assign a single value to
multiple variables:
> 赋值操作符具有右到左的结合性，这意味着当一个表达式中出现多个赋值操作符时，它们是从右向左求值的。因此，你可以编写如下代码，以将单个值同时赋给多个变量：

```js
i = j = k = 0;       // Initialize 3 variables to 0
```

### 4.11.1 Assignment with Operation

Besides the normal = assignment operator, JavaScript supports a number of other assignment operators that provide
shortcuts by combining assignment with some other operation. For example, the += operator performs addition and
assignment. The following expression:
> 除了普通的 `=` 赋值操作符外，JavaScript 还支持其他一些赋值操作符，这些操作符通过结合赋值和其他操作提供了快捷方式。例如，
`+=` 操作符执行加法和赋值。下面的表达式：

```js
total += salesTax;
```

is equivalent to this one:

```js
total = total + salesTax;
```

As you might expect, the += operator works for numbers or strings. For numeric operands, it performs addition and
assignment; for string operands, it performs concatenation and assignment.
> 如你所料，`+=` 操作符适用于数字或字符串。对于数值操作数，它执行加法和赋值；对于字符串操作数，它执行连接和赋值。

Similar operators include -=, *=, &=, and so on. Table 4-2 lists them all.
> 类似的操作符还包括 `-=`, `*=`, `&=`, 等等。表4-2列出了所有这些操作符。

Table 4-2. Assignment operators

| Operator | Example   | Equivalent   |
|----------|-----------|--------------|
| +=       | a += b    | a = a + b    |
| -=       | a -= b    | a = a - b    |
| `*=`     | a `*=` b  | a = a `*` b  |
| /=       | a /= b    | a = a / b    |
| %=       | a %= b    | a = a % b    |
| `**=`    | a `**`= b | a = a `**` b |
| <<=      | a <<= b   | a = a << b   |
| >>=      | a >>= b   | a = a >> b   |
| >>>=     | a >>>= b  | a = a >>> b  |
| &=       | a &= b    | a = a & b    |
| \|=      | a \|= b   | a = a \| b   |
| ^=       | a ^= b    | a = a ^ b    |

In most cases, the expression:

```js
a
op = b
```

where op is an operator, is equivalent to the expression:

```js
a = a
op
b
```

In the first line, the expression a is evaluated once. In the second, it is evaluated twice. The two cases will differ
only if a includes side effects such as a function call or an increment operator. The following two assignments, for
example, are not the same:
> 在第一行中，表达式 `a` 被计算一次。在第二行中，它被计算两次。仅当 `a` 包含副作用（如函数调用或自增操作符）时，这两种情况才会有所不同。例如，下面的两个赋值语句是不同的：

```js
data[i++] *= 2;
data[i++] = data[i++] * 2;
```

## 4.12 Evaluation Expressions

Like many interpreted languages, JavaScript has the ability to interpret strings of JavaScript source code, evaluating
them to produce a value. JavaScript does this with the global function eval():
> 像许多解释型语言一样，JavaScript 有能力解释 JavaScript 源代码字符串，并对其进行求值以产生一个值。JavaScript 通过全局函数
`eval()` 来实现这一点：

```js
eval("3+2")    // => 5
```

Dynamic evaluation of strings of source code is a powerful language feature that is almost never necessary in practice.
If you find yourself using eval(), you should think carefully about whether you really need to use it. In particular,
eval() can be a security hole, and you should never pass any string derived from user input to eval(). With a language
as complicated as JavaScript, there is no way to sanitize user input to make it safe to use with eval(). Because of
these security issues, some web servers use the HTTP “Content-Security-Policy” header to disable eval() for an entire
website.
> 动态评估源代码字符串是语言的一个强大特性，但在实践中几乎从不需要使用。如果你发现自己在使用 `eval()`
> ，应该仔细考虑是否真的有必要使用它。特别需要注意的是，`eval()` 可能成为一个安全漏洞，绝不应将任何来自用户输入的字符串传递给
`eval()`。由于 JavaScript 语言的复杂性，没有办法对用户输入进行清理以确保其与 `eval()`
> 一起使用时是安全的。由于这些安全问题，一些web服务器使用HTTP的“Content-Security-Policy”头部来禁用整个网站的 `eval()` 功能。

The subsections that follow explain the basic use of eval() and explain two restricted versions of it that have less
impact on the optimizer.
> 接下来的小节将解释 `eval()` 的基本用法，并介绍两个受限版本，它们对优化器的影响较小。

IS EVAL() A FUNCTION OR AN OPERATOR?  
eval() is a function, but it is included in this chapter on expressions because it really should have been an operator.
The earliest versions of the language defined an eval() function, and ever since then, language designers and
interpreter writers have been placing restrictions on it that make it more and more operator-like. Modern JavaScript
interpreters perform a lot of code analysis and optimization. Generally speaking, if a function calls eval(), the
interpreter cannot optimize that function. The problem with defining eval() as a function is that it can be given other
names:
> `eval()` 是一个函数，但它被包含在本章关于表达式的讨论中，因为它实际上应该是一个操作符。语言的最早版本定义了一个 `eval()`
> 函数，从那时起，语言设计者和解释器编写者就对其施加了越来越多的限制，使其越来越像一个操作符。现代JavaScript解释器执行大量的代码分析和优化。一般来说，如果一个函数调用了
`eval()`，解释器无法对该函数进行优化。将 `eval()` 定义为函数的问题在于它可以被赋予其他名称：

```js
let f = eval;
let g = f;
```

If this is allowed, then the interpreter can’t know for sure which functions call eval(), so it cannot optimize
aggressively. This issue could have been avoided if eval() was an operator (and a reserved word). We’ll learn (in
§4.12.2 and §4.12.3) about restrictions placed on eval() to make it more operator-like.
> 如果允许这样做，那么解释器无法确切知道哪些函数调用了 `eval()`，因此它不能进行积极的优化。如果 `eval()`
> 是一个操作符（且是一个保留字），这个问题本可以避免。我们将在§4.12.2和§4.12.3中了解到对 `eval()` 施加的限制，使其更接近于一个操作符。

### 4.12.1 eval()

eval() expects one argument. If you pass any value other than a string, it simply returns that value. If you pass a
string, it attempts to parse the string as JavaScript code, throwing a SyntaxError if it fails. If it successfully
parses the string, then it evaluates the code and returns the value of the last expression or statement in the string or
undefined if the last expression or statement had no value. If the evaluated string throws an exception, that exception
propogates from the call to eval().
> `eval()` 期望接收一个参数。如果你传递的不是字符串的任何值，它将直接返回该值。如果你传递一个字符串，它会尝试将其解析为JavaScript代码，如果解析失败，则抛出
`SyntaxError`。如果成功解析字符串，它将评估该代码，并返回字符串中最后一个表达式或语句的值；如果最后一个表达式或语句没有值，则返回
`undefined`。如果评估的字符串抛出了异常，该异常会从 `eval()` 调用处传播出去。

The key thing about eval() (when invoked like this) is that it uses the variable environment of the code that calls it.
That is, it looks up the values of variables and defines new variables and functions in the same way that local code
does. If a function defines a local variable x and then calls eval("x"), it will obtain the value of the local variable.
If it calls eval("x=1"), it changes the value of the local variable. And if the function calls eval("var y = 3;"), it
declares a new local variable y. On the other hand, if the evaluated string uses let or const, the variable or constant
declared will be local to the evaluation and will not be defined in the calling environment.
> `eval()` 的关键之处（当这样调用时）在于它使用调用它的代码的变量环境。也就是说，它查找变量的值，并以与局部代码相同的方式定义新的变量和函数。如果一个函数定义了一个局部变量
`x`，然后调用 `eval("x")`，它将获取该局部变量的值。如果调用 `eval("x=1")`，它会改变局部变量的值。如果函数调用
`eval("var y = 3;")`，它会声明一个新的局部变量 `y`。另一方面，如果评估的字符串使用了 `let` 或 `const`
> ，那么声明的变量或常量仅在评估范围内有效，并不会在调用环境中定义。

Similarly, a function can declare a local function with code like this:
> 类似地，一个函数可以使用如下代码声明一个局部函数：

```js
eval("function f() { return x+1; }");
```

If you call eval() from top-level code, it operates on global variables and global functions, of course.
> 如果你从顶级代码中调用 `eval()`，它当然会对全局变量和全局函数进行操作。

Note that the string of code you pass to eval() must make syntactic sense on its own: you cannot use it to paste code
fragments into a function. It makes no sense to write eval("return;"), for example, because return is only legal within
functions, and the fact that the evaluated string uses the same variable environment as the calling function does not
make it part of that function. If your string would make sense as a standalone script (even a very short one like x=0 ),
it is legal to pass to eval(). Otherwise, eval() will throw a SyntaxError.
> 请注意，传递给 `eval()` 的代码字符串必须在语法上是独立有意义的：你不能用它来将代码片段粘贴到函数中。例如，编写
`eval("return;")` 是没有意义的，因为 `return`
> 只有在函数内部才是合法的，且评估的字符串虽然使用与调用函数相同的变量环境，但这并不意味着它成为了该函数的一部分。如果你的字符串可以作为独立脚本有意义（即使是一个非常短的脚本，如
`x=0`），那么传递给 `eval()` 是合法的。否则，`eval()` 会抛出 `SyntaxError`。

### 4.12.2 Global eval()

It is the ability of eval() to change local variables that is so problematic to JavaScript optimizers. As a workaround,
however, interpreters simply do less optimization on any function that calls eval(). But what should a JavaScript
interpreter do, however, if a script defines an alias for eval() and then calls that function by another name? The
JavaScript specification declares that when eval() is invoked by any name other than “eval”, it should evaluate the
string as if it were top-level global code. The evaluated code may define new global variables or global functions, and
it may set global variables, but it will not use or modify any variables local to the calling function, and will not,
therefore, interfere with local optimizations.
> 正是 `eval()` 能够改变局部变量这一特性，给 JavaScript 优化器带来了很大的问题。然而，作为一种变通方法，解释器只是对调用
`eval()` 的任何函数进行较少的优化。但是，如果一个脚本为 `eval()` 定义了一个别名，然后通过这个别名调用该函数，JavaScript
> 解释器应该如何处理呢？JavaScript 规范声明，当以除 “eval” 以外的任何名称调用 `eval()`
> 时，它应将字符串作为顶级全局代码来评估。评估的代码可以定义新的全局变量或全局函数，并且可以设置全局变量，但它不会使用或修改调用函数的任何局部变量，因此不会干扰局部优化。

A “direct eval” is a call to the eval() function with an expression that uses the exact, unqualified name “eval” (which
is beginning to feel like a reserved word). Direct calls to eval() use the variable environment of the calling context.
Any other call—an indirect call—uses the global object as its variable environment and cannot read, write, or define
local variables or functions. (Both direct and indirect calls can define new variables only with var. Uses of let and
const inside an evaluated string create variables and constants that are local to the evaluation and do not alter the
calling or global environment.)
> “直接 eval”是指调用 `eval()` 函数时使用的是确切且未限定的名称“eval”（这开始感觉像是一个保留字）。直接调用 `eval()`
> 会使用调用上下文的变量环境。任何其他调用——即间接调用——则使用全局对象作为其变量环境，并且不能读取、写入或定义局部变量或函数。（无论是直接调用还是间接调用，都只能用
`var` 定义新变量。在评估字符串中使用 `let` 和 `const` 创建的变量和常量仅在评估范围内有效，并不会改变调用环境或全局环境。）

The following code demonstrates:

```js
const geval = eval;               // Using another name does a global eval
let x = "global", y = "global";   // Two global variables
function f() {                    // This function does a local eval
    let x = "local";              // Define a local variable
    eval("x += 'changed';");      // Direct eval sets local variable
    return x;                     // Return changed local variable
}

function g() {                    // This function does a global eval
    let y = "local";              // A local variable
    geval("y += 'changed';");     // Indirect eval sets global variable
    return y;                     // Return unchanged local variable
}

console.log(f(), x); // Local variable changed: prints "localchanged global":
console.log(g(), y); // Global variable changed: prints "local globalchanged":
```

Notice that the ability to do a global eval is not just an accommodation to the needs of the optimizer; it is actually a
tremendously useful feature that allows you to execute strings of code as if they were independent, top-level scripts.
As noted at the beginning of this section, it is rare to truly need to evaluate a string of code. But if you do find it
necessary, you are more likely to want to do a global eval than a local eval.
> 请注意，执行全局 `eval`
>
的能力不仅仅是为了满足优化器的需求；实际上，它是一个非常有用的功能，允许你执行代码字符串，就好像它们是独立的顶级脚本一样。正如本节开头所提到的，真正需要评估一段代码字符串的情况是非常罕见的。但如果你确实发现有必要这样做，那么你更可能希望执行全局
`eval` 而不是局部 `eval`。

### 4.12.3 Strict eval()

Strict mode (see §5.6.3) imposes further restrictions on the behavior of the eval() function and even on the use of the
identifier “eval”. When eval() is called from strict-mode code, or when the string of code to be evaluated itself begins
with a “use strict” directive, then eval() does a local eval with a private variable environment. This means that in
strict mode, evaluated code can query and set local variables, but it cannot define new variables or functions in the
local scope.
> 严格模式（见§5.6.3）对 `eval()` 函数的行为以及“eval”标识符的使用施加了进一步的限制。当从严格模式代码中调用 `eval()`
> ，或者待评估的代码字符串本身以“use strict”指令开头时，`eval()` 会执行带有私有变量环境的局部 `eval`
> 。这意味着在严格模式下，评估的代码可以查询和设置局部变量，但它不能在局部作用域内定义新的变量或函数。

Furthermore, strict mode makes eval() even more operator-like by effectively making “eval” into a reserved word. You are
not allowed to overwrite the eval() function with a new value. And you are not allowed to declare a variable, function,
function parameter, or catch block parameter with the name “eval”.
> 此外，严格模式通过将“eval”实际上变为一个保留字，使得 `eval()` 更加类似于操作符。你不允许用新值覆盖 `eval()`
> 函数。并且，你不允许使用名称“eval”声明变量、函数、函数参数或 catch 块参数。

## 4.13 Miscellaneous Operators

JavaScript supports a number of other miscellaneous operators, described in the following sections.
> JavaScript 支持许多其他杂项操作符，将在以下部分中描述。

### 4.13.1 The Conditional Operator (?:)

The conditional operator is the only ternary operator (three operands) in JavaScript and is sometimes actually called
the ternary operator. This operator is sometimes written ?:, although it does not appear quite that way in code. Because
this operator has three operands, the first goes before the ?, the second goes between the ? and the :, and the third
goes after the :. It is used like this:
> 条件操作符是JavaScript中唯一的三元操作符（三个操作数），有时实际上被称为“三元操作符”。这个操作符有时写作 `?:`
> ，尽管在代码中它并不完全以这种方式出现。因为这个操作符有三个操作数，所以第一个操作数位于 `?` 之前，第二个操作数位于 `?` 和
`:` 之间，第三个操作数位于 `:` 之后。它的使用方式如下：

```js
x > 0 ? x : -x     // The absolute value of x
```

The operands of the conditional operator may be of any type. The first operand is evaluated and interpreted as a
boolean. If the value of the first operand is truthy, then the second operand is evaluated, and its value is returned.
Otherwise, if the first operand is falsy, then the third operand is evaluated and its value is returned. Only one of the
second and third operands is evaluated; never both.
>
条件操作符的操作数可以是任何类型。第一个操作数会被求值并解释为布尔值。如果第一个操作数的值为真值（truthy），则求值第二个操作数，并返回其值。否则，如果第一个操作数为假值（falsy），则求值第三个操作数，并返回其值。仅求值第二个和第三个操作数中的一个；不会同时求值两者。

While you can achieve similar results using the if statement (§5.3.1), the ?: operator often provides a handy shortcut.
Here is a typical usage, which checks to be sure that a variable is defined (and has a meaningful, truthy value) and
uses it if so or provides a default value if not:
> 虽然你可以使用 `if` 语句（见§5.3.1）达到类似的效果，但 `?:`
> 操作符通常提供了一个方便的快捷方式。这里是一个典型的用法，检查一个变量是否已定义（并且有一个有意义的真值），如果是则使用它，如果不是则提供一个默认值：

```js
greeting = "hello " + (username ? username : "there");
```

This is equivalent to, but more compact than, the following if statement:

```js
greeting = "hello ";
if (username) {
    greeting += username;
} else {
    greeting += "there";
}
```

### 4.13.2 First-Defined (??)

The first-defined operator ?? evaluates to its first defined operand: if its left operand is not null and not undefined,
it returns that value. Otherwise, it returns the value of the right operand. Like the && and || operators, ?? is
short-circuiting: it only evaluates its second operand if the first operand evaluates to null or undefined. If the
expression a has no side effects, then the expression a ?? b is equivalent to:
> 首个定义的操作符 `??` 会评估其第一个已定义的操作数：如果其左操作数不是 `null` 且不是 `undefined`，则返回该值。否则，返回右操作数的值。与
`&&` 和 `||` 操作符类似，`??` 是短路求值的：仅当第一个操作数评估为 `null` 或 `undefined` 时，它才会评估第二个操作数。如果表达式
`a` 没有副作用，那么表达式 `a ?? b` 等价于：

```js
(a !== null && a !== undefined) ? a : b
```

?? is a useful alternative to || (§4.10.2) when you want to select the first defined operand rather than the first
truthy operand. Although || is nominally a logical OR operator, it is also used idiomatically to select the first
non-falsy operand with code like this:
> 当你想要选择第一个已定义的操作数而不是第一个真值操作数时，`??` 是 `||`（见§4.10.2）的一个有用替代。虽然 `||`
> 名义上是一个逻辑或操作符，但它也被习惯性地用于通过如下代码选择第一个非假值操作数：

```js
// If maxWidth is truthy, use that. Otherwise, look for a value in
// the preferences object. If that is not truthy, use a hardcoded constant.
let max = maxWidth || preferences.maxWidth || 500;
```

The problem with this idiomatic use is that zero, the empty string, and false are all falsy values that may be perfectly
valid in some circumstances. In this code example, if maxWidth is zero, that value will be ignored. But if we change
the || operator to ??, we end up with an expression where zero is a valid value:
> 这种习惯用法的问题在于，零、空字符串和 `false` 都是假值，在某些情况下这些可能是完全有效的值。在下面的代码示例中，如果
`maxWidth` 是零，该值会被忽略。但是，如果我们把 `||` 操作符改为 `??`，我们最终会得到一个零也是有效值的表达式：

```js
// If maxWidth is defined, use that. Otherwise, look for a value in
// the preferences object. If that is not defined, use a hardcoded constant.
let max = maxWidth ?? preferences.maxWidth ?? 500;
```

Here are more examples showing how ?? works when the first operand is falsy. If that operand is falsy but defined,
then ?? returns it. It is only when the first operand is “nullish” (i.e., null or undefined) that this operator
evaluates and returns the second operand:
> 以下更多示例展示了当第一个操作数为假值时 `??` 是如何工作的。如果该操作数为假值但已定义，则 `??` 返回它。仅当第一个操作数是“空缺”（即，
`null` 或 `undefined`）时，此操作符才会评估并返回第二个操作数：

```js
let options = {timeout: 0, title: "", verbose: false, n: null};
options.timeout ?? 1000     // => 0: as defined in the object
options.title ?? "Untitled" // => "": as defined in the object
options.verbose ?? true     // => false: as defined in the object
options.quiet ?? false      // => false: property is not defined
options.n ?? 10             // => 10: property is null
```

Note that the timeout, title, and verbose expressions here would have different values if we used || instead of ??.
> 请注意，如果这里我们使用 `||` 而不是 `??`，timeout、title 和 verbose 表达式会有不同的值。

The ?? operator is similar to the && and || operators but does not have higher precedence or lower precedence than they
do. If you use it in an expression with either of those operators, you must use explicit parentheses to specify which
operation you want to perform first:
> `??` 操作符与 `&&` 和 `||` 操作符类似，但它并没有比这两个操作符更高的优先级或更低的优先级。如果你在包含这些操作符之一的表达式中使用它，必须使用明确的括号来指定你希望首先执行哪个操作：

```js
(a ?? b) || c   // ?? first, then ||
a ?? (b || c)   // || first, then ??
a ?? b || c     // SyntaxError: parentheses are required
```

The ?? operator is defined by ES2020, and as of early 2020, is newly supported by current or beta versions of all major
browsers. This operator is formally called the “nullish coalescing” operator, but I avoid that term because this
operator selects one of its operands but does not “coalesce” them in any way that I can see.
> `??` 操作符由 ES2020
> 定义，截至2020年初，所有主要浏览器的当前版本或测试版都已支持该操作符。此操作符正式称为“空值合并”操作符，但我避免使用这个术语，因为在我的理解中，这个操作符只是选择它的操作数之一，并不会以任何方式“合并”它们。

### 4.13.3 The typeof Operator

typeof is a unary operator that is placed before its single operand, which can be of any type. Its value is a string
that specifies the type of the operand. Table 4-3 specifies the value of the typeof operator for any JavaScript value.
> `typeof` 是一个一元操作符，放置在其单一操作数之前，该操作数可以是任何类型。它的值是一个字符串，指定了操作数的类型。表4-3列出了
`typeof` 操作符对于任何JavaScript值的结果。

Table 4-3. Values returned by the typeof operator

| x                      | typeof x    |
|------------------------|-------------|
| undefined              | "undefined" |
| null                   | "object"    |
| true or false          | "boolean"   |
| any number or NaN      | "number"    |
| any BigInt             | "bigint"    |
| any string             | "string"    |
| any symbol             | "symbol"    |
| any function           | "function"  |
| any nonfunction object | "object"    |

You might use the typeof operator in an expression like this:

```js
// If the value is a string, wrap it in quotes, otherwise, convert
(typeof value === "string") ? "'" + value + "'" : value.toString()
```

Note that typeof returns “object” if the operand value is null. If you want to distinguish null from objects, you’ll
have to explicitly test for this special-case value.
> 请注意，如果操作数的值是 `null`，`typeof` 会返回 `"object"`。如果你想区分 `null` 和对象，你需要显式地测试这个特殊情况的值。

Although JavaScript functions are a kind of object, the typeof operator considers functions to be sufficiently different
that they have their own return value.
> 虽然JavaScript函数是一种对象，但 `typeof` 操作符认为函数与普通对象有足够大的区别，因此它们有自己的返回值。

Because typeof evaluates to “object” for all object and array values other than functions, it is useful only to
distinguish objects from other, primitive types. In order to distinguish one class of object from another, you must use
other techniques, such as the instanceof operator (see §4.9.4), the class attribute (see §14.4.3), or the constructor
property (see §9.2.2 and §14.3).
> 由于 `typeof` 对于所有非函数的对象和数组值都评估为 `"object"`，它仅用于区分对象与其他基本类型。为了区分不同类别的对象，必须使用其他技术，例如
`instanceof` 操作符（见§4.9.4）、`class` 属性（见§14.4.3）或 `constructor` 属性（见§9.2.2和§14.3）。

### 4.13.4 The delete Operator

delete is a unary operator that attempts to delete the object property or array element specified as its operand. Like
the assignment, increment, and decrement operators, delete is typically used for its property deletion side effect and
not for the value it returns. Some examples:
> `delete` 是一个一元操作符，尝试删除其操作数指定的对象属性或数组元素。像赋值、递增和递减操作符一样，`delete`
> 通常用于其删除属性的副作用，而不是为了它返回的值。一些示例如下：

```js
let o = {x: 1, y: 2}; // Start with an object
delete o.x;            // Delete one of its properties
"x" in o               // => false: the property does not exist anymore

let a = [1, 2, 3];       // Start with an array
delete a[2];           // Delete the last element of the array
2 in a                 // => false: array element 2 doesn't exist anymore
a.length               // => 3: note that array length doesn't change, though
```

Note that a deleted property or array element is not merely set to the undefined value. When a property is deleted, the
property ceases to exist. Attempting to read a nonexistent property returns undefined, but you can test for the actual
existence of a property with the in operator (§4.9.3). Deleting an array element leaves a “hole” in the array and does
not change the array’s length. The resulting array is sparse (§7.3).
> 请注意，被删除的属性或数组元素不仅仅是被设置为 `undefined` 值。当一个属性被删除时，该属性就不再存在。尝试读取一个不存在的属性会返回
`undefined`，但是你可以使用 `in` 操作符（见§4.9.3）来测试属性的实际存在性。删除数组中的一个元素会在数组中留下一个“空洞”，并不会改变数组的长度。结果得到的是一个稀疏数组（见§7.3）。

delete expects its operand to be an lvalue. If it is not an lvalue, the operator takes no action and returns true.
Otherwise, delete attempts to delete the specified lvalue. delete returns true if it successfully deletes the specified
lvalue. Not all properties can be deleted, however: non-configurable properties (§14.1) are immune from deletion.
> `delete` 操作符期望其操作数是一个左值（lvalue）。如果它不是一个左值，该操作符不会采取任何行动并返回 `true`。否则，`delete`
> 会尝试删除指定的左值。如果成功删除了指定的左值，`delete` 返回 `true`。然而，并不是所有的属性都可以被删除：不可配置的属性（见§14.1）是不能被删除的。

In strict mode, delete raises a SyntaxError if its operand is an unqualified identifier such as a variable, function, or
function parameter: it only works when the operand is a property access expression (§4.4). Strict mode also specifies
that delete raises a TypeError if asked to delete any non-configurable (i.e., nondeleteable) property. Outside of strict
mode, no exception occurs in these cases, and delete simply returns false to indicate that the operand could not be
deleted.
> 在严格模式下，如果 `delete` 的操作数是一个未限定的标识符（如变量、函数或函数参数），它会引发一个 `SyntaxError`
> ：它仅在操作数是属性访问表达式（见§4.4）时才有效。严格模式还规定，如果 `delete` 被要求删除任何不可配置（即不可删除）的属性时，它会引发一个
`TypeError`。在非严格模式下，这些情况下不会发生异常，`delete` 只是简单地返回 `false`，以指示操作数无法被删除。

Here are some example uses of the delete operator:

```js
let o = {x: 1, y: 2};
delete o.x;   // Delete one of the object properties; returns true.
typeof o.x;   // Property does not exist; returns "undefined".
delete o.x;   // Delete a nonexistent property; returns true.
delete 1;     // This makes no sense, but it just returns true.
// Can't delete a variable; returns false, or SyntaxError in strict mode.
delete o;
// Undeletable property: returns false, or TypeError in strict mode.
delete Object.prototype;
```

We’ll see the delete operator again in §6.4.

### 4.13.5 The await Operator

await was introduced in ES2017 as a way to make asynchronous programming more natural in JavaScript. You will need to
read Chapter 13 to understand this operator. Briefly, however, await expects a Promise object (representing an
asynchronous computation) as its sole operand, and it makes your program behave as if it were waiting for the
asynchronous computation to complete (but it does this without actually blocking, and it does not prevent other
asynchronous operations from proceeding at the same time). The value of the await operator is the fulfillment value of
the Promise object. Importantly, await is only legal within functions that have been declared asynchronous with the
async keyword. Again, see Chapter 13 for full details.
> `await` 在 ES2017 中被引入，作为使 JavaScript 中的异步编程更加自然的一种方式。你需要阅读第13章来完全理解这个操作符。然而简而言之，
`await` 期望其唯一的操作数是一个 Promise 对象（代表一个异步计算），它让你的程序表现得像是在等待异步计算完成一样（但它这样做并不会真正阻塞，并且不会阻止其他异步操作同时进行）。
`await` 操作符的值是 Promise 对象的完成值。重要的是，`await` 只能在使用 `async` 关键字声明为异步的函数内合法使用。再次强调，详见第13章以获取完整细节。

### 4.13.6 The void Operator

void is a unary operator that appears before its single operand, which may be of any type. This operator is unusual and
infrequently used; it evaluates its operand, then discards the value and returns undefined. Since the operand value is
discarded, using the void operator makes sense only if the operand has side effects.
> `void` 是一个一元操作符，出现在其单一操作数之前，该操作数可以是任何类型。这个操作符不常见且很少使用；它计算其操作数，然后丢弃该值并返回
`undefined`。由于操作数值会被丢弃，使用 `void` 操作符只有在操作数有副作用时才有意义。

The void operator is so obscure that it is difficult to come up with a practical example of its use. One case would be
when you want to define a function that returns nothing but also uses the arrow function shortcut syntax (see §8.1.3)
where the body of the function is a single expression that is evaluated and returned. If you are evaluating the
expression solely for its side effects and do not want to return its value, then the simplest thing is to use curly
braces around the function body. But, as an alternative, you could also use the void operator in this case:
> `void`
>
操作符非常冷僻，很难想出其使用的实际例子。一种情况是当你想定义一个不返回任何值的函数，同时也想使用箭头函数简写语法（见§8.1.3），其中函数体是一个被求值并返回的单一表达式。如果你仅仅是为了副作用而评估这个表达式，并且不希望返回它的值，最简单的方法是用花括号包围函数体。但作为一种替代方案，在这种情况下你也可以使用
`void` 操作符：

```js
let counter = 0;
const increment = () => void counter++;
increment()   // => undefined
counter       // => 1
```

### 4.13.7 The comma Operator (,)

The comma operator is a binary operator whose operands may be of any type. It evaluates its left operand, evaluates its
right operand, and then returns the value of the right operand. Thus, the following line:
> 逗号操作符是一个二元操作符，其操作数可以是任何类型。它计算其左操作数，计算其右操作数，然后返回右操作数的值。

```js
i = 0, j = 1, k = 2;
```

evaluates to 2 and is basically equivalent to:

```js
i = 0;
j = 1;
k = 2;
```

The lefthand expression is always evaluated, but its value is discarded, which means that it only makes sense to use the
comma operator when the lefthand expression has side effects. The only situation in which the comma operator is commonly
used is with a for loop (§5.4.3) that has multiple loop variables:
> 左表达式总是会被求值，但其值会被丢弃，这意味着只有当左表达式有副作用时使用逗号操作符才有意义。逗号操作符唯一常见的使用场景是在具有多个循环变量的
> for 循环（见§5.4.3）中：

```js
// The first comma below is part of the syntax of the let statement
// The second comma is the comma operator: it lets us squeeze 2
// expressions (i++ and j--) into a statement (the for loop) that expects 1.
for (let i = 0, j = 10; i < j; i++, j--) {
    console.log(i + j);
}
```

## 4.14 Summary

This chapter covers a wide variety of topics, and there is lots of reference material here that you may want to reread
in the future as you continue to learn JavaScript. Some key points to remember, however, are these:
> 本章涵盖了各种各样的主题，其中包含了许多你可能在未来继续学习JavaScript时想要重温的参考资料。然而，需要记住的一些关键点是：

- Expressions are the phrases of a JavaScript program.
- Any expression can be evaluated to a JavaScript value.
- Expressions can also have side effects (such as variable assignment) in addition to producing a value.
- Simple expressions such as literals, variable references, and property accesses can be combined with operators to
  produce larger expressions.
- JavaScript defines operators for arithmetic, comparisons, Boolean logic, assignment, and bit manipulation, along with
  some miscellaneous operators, including the ternary conditional operator.
- The JavaScript + operator is used to both add numbers and concatenate strings.
- The logical operators && and || have special “short-circuiting” behavior and sometimes only evaluate one of their
  arguments. Common JavaScript idioms require you to understand the special behavior of these operators.

> - 表达式是JavaScript程序中的短语。
> - 任何表达式都可以被求值为一个JavaScript值。
> - 除了生成一个值外，表达式还可能具有副作用（如变量赋值）。
> - 简单表达式（如字面量、变量引用和属性访问）可以通过与操作符结合来生成更大的表达式。
> - JavaScript定义了用于算术运算、比较、布尔逻辑、赋值以及位操作的操作符，还有一些其他杂项操作符，包括三元条件操作符。
> - JavaScript的 `+` 操作符既用于数字相加也用于字符串连接。
> - 逻辑操作符 `&&` 和 `||` 具有特殊的“短路”行为，有时只计算它们的一个参数。常见的JavaScript惯用法要求你理解这些操作符的特殊行为。

[下一章](./ch5.md)
