## Chapter 12. Serialization（序列化）

### Item 86: Implement Serializable with great caution（非常谨慎地实现 Serializable）

Allowing a class’s instances to be serialized can be as simple as adding the words implements Serializable to its
declaration. Because this is so easy to do, there was a common misconception that serialization requires little effort
on the part of the programmer. The truth is far more complex. While the immediate cost to make a class serializable can
be negligible, the long-term costs are often substantial.

使类的实例可序列化非常简单，只需实现 Serializable
接口即可。因为这很容易做到，所以有一个普遍的误解，认为序列化只需要程序员付出很少的努力。而事实上要复杂得多。虽然使类可序列化的即时代价可以忽略不计，但长期代价通常是巨大的。

**A major cost of implementing Serializable is that it decreases the flexibility to change a class’s implementation once
it has been released.** When a class implements Serializable, its byte-stream encoding (or serialized form) becomes part
of its exported API. Once you distribute a class widely, you are generally required to support the serialized form
forever, just as you are required to support all other parts of the exported API. If you do not make the effort to
design a custom serialized form but merely accept the default, the serialized form will forever be tied to the class’s
original internal representation. In other words, if you accept the default serialized form, the class’s private and
package-private instance fields become part of its exported API, and the practice of minimizing access to fields (Item
15) loses its effectiveness as a tool for information hiding.

**实现 Serializable 接口的一个主要代价是，一旦类的实现被发布，它就会降低更改该类实现的灵活性。** 当类实现 Serializable
时，其字节流编码（或序列化形式）成为其导出 API 的一部分。一旦广泛分发了一个类，通常就需要永远支持序列化的形式，就像需要支持导出
API 的所有其他部分一样。如果你不努力设计自定义序列化形式，而只是接受默认形式，则序列化形式将永远绑定在类的原始内部实现上。换句话说，如果你接受默认的序列化形式，类中私有的包以及私有实例字段将成为其导出
API
的一部分，此时最小化字段作用域（[Item-15](../Chapter-4/Chapter-4-Item-15-Minimize-the-accessibility-of-classes-and-members.md)
）作为信息隐藏的工具，将失去其有效性。

If you accept the default serialized form and later change a class’s internal representation, an incompatible change in
the serialized form will result. Clients attempting to serialize an instance using an old version of the class and
deserialize it using the new one (or vice versa) will experience program failures. It is possible to change the internal
representation while maintaining the original serialized form (using ObjectOutputStream.putFields and
ObjectInputStream.readFields), but it can be difficult and leaves visible warts in the source code. If you opt to make a
class serializable, you should carefully design a high-quality serialized form that you’re willing to live with for the
long haul (Items 87, 90). Doing so will add to the initial cost of development, but it’s worth the effort. Even a
well-designed serialized form places constraints on the evolution of a class; an ill-designed serialized form can be
crippling.

如果你接受默认的序列化形式，然后更改了类的内部实现，则会导致与序列化形式不兼容。试图使用类的旧版本序列化实例，再使用新版本反序列化实例的客户端（反之亦然）程序将会失败。当然，可以在维护原始序列化形式的同时更改内部实现（使用
ObjectOutputStream.putFields 或
ObjectInputStream.readFields），但这可能会很困难，并在源代码中留下明显的缺陷。如果你选择使类可序列化，你应该仔细设计一个高质量的序列化形式，以便长期使用（[Item-87](../Chapter-12/Chapter-12-Item-87-Consider-using-a-custom-serialized-form.md)、[Item-90](../Chapter-12/Chapter-12-Item-90-Consider-serialization-proxies-instead-of-serialized-instances.md)
）。这样做会增加开发的初始成本，但是这样做是值得的。即使是设计良好的序列化形式，也会限制类的演化；而设计不良的序列化形式，则可能会造成严重后果。

A simple example of the constraints on evolution imposed by serializability concerns stream unique identifiers, more
commonly known as serial version UIDs. Every serializable class has a unique identification number associated with it.
If you do not specify this number by declaring a static final long field named serialVersionUID, the system
automatically generates it at runtime by applying a cryptographic hash function (SHA-1) to the structure of the class.
This value is affected by the names of the class, the interfaces it implements, and most of its members, including
synthetic members generated by the compiler. If you change any of these things, for example, by adding a convenience
method, the generated serial version UID changes. If you fail to declare a serial version UID, compatibility will be
broken, resulting in an InvalidClassException at runtime.

可序列化会使类的演变受到限制，施加这种约束的一个简单示例涉及流的唯一标识符，通常称其为串行版本
UID。每个可序列化的类都有一个与之关联的唯一标识符。如果你没有通过声明一个名为 serialVersionUID 的静态 final long
字段来指定这个标识符，那么系统将在运行时对类应用加密散列函数（SHA-1）自动生成它。这个值受到类的名称、实现的接口及其大多数成员（包括编译器生成的合成成员）的影响。如果你更改了其中任何一项，例如，通过添加一个临时的方法，生成的序列版本
UID 就会更改。如果你未能声明序列版本 UID，兼容性将被破坏，从而在运行时导致 InvalidClassException。

**A second cost of implementing Serializable is that it increases the likelihood of bugs and security holes (Item 85).**
Normally, objects are created with constructors; serialization is an extralinguistic mechanism for creating objects.
Whether you accept the default behavior or override it, deserialization is a “hidden constructor” with all of the same
issues as other constructors. Because there is no explicit constructor associated with deserialization, it is easy to
forget that you must ensure that it guarantees all of the invariants established by the constructors and that it does
not allow an attacker to gain access to the internals of the object under construction. Relying on the default
deserialization mechanism can easily leave objects open to invariant corruption and illegal access (Item 88).

**实现 Serializable 接口的第二个代价是，增加了出现 bug 和安全漏洞的可能性(第85项)。**
通常，对象是用构造函数创建的；序列化是一种用于创建对象的超语言机制。无论你接受默认行为还是无视它，反序列化都是一个「隐藏构造函数」，其他构造函数具有的所有问题它都有。由于没有与反序列化关联的显式构造函数，因此很容易忘记必须让它能够保证所有的不变量都是由构造函数建立的，并且不允许攻击者访问正在构造的对象内部。依赖于默认的反序列化机制，会让对象轻易地遭受不变性破坏和非法访问（[Item-88](../Chapter-12/Chapter-12-Item-88-Write-readObject-methods-defensively.md)）。

**A third cost of implementing Serializable is that it increases the testing burden associated with releasing a new
version of a class.** When a serializable class is revised, it is important to check that it is possible to serialize an
instance in the new release and deserialize it in old releases, and vice versa. The amount of testing required is thus
proportional to the product of the number of serializable classes and the number of releases, which can be large. You
must ensure both that the serialization-deserialization process succeeds and that it results in a faithful replica of
the original object. The need for testing is reduced if a custom serialized form is carefully designed when the class is
first written (Items 87, 90).

**实现 Serializable 接口的第三个代价是，它增加了与发布类的新版本相关的测试负担。**
当一个可序列化的类被修改时，重要的是检查是否可以在新版本中序列化一个实例，并在旧版本中反序列化它，反之亦然。因此，所需的测试量与可序列化类的数量及版本的数量成正比，工作量可能很大。你必须确保「序列化-反序列化」过程成功，并确保它生成原始对象的无差错副本。如果在第一次编写类时精心设计了自定义序列化形式，那么测试的工作量就会减少（[Item-87](../Chapter-12/Chapter-12-Item-87-Consider-using-a-custom-serialized-form.md)、[Item-90](../Chapter-12/Chapter-12-Item-90-Consider-serialization-proxies-instead-of-serialized-instances.md)）。

**Implementing Serializable is not a decision to be undertaken lightly.** It is essential if a class is to participate
in a framework that relies on Java serialization for object transmission or persistence. Also, it greatly eases the use
of a class as a component in another class that must implement Serializable. There are, however, many costs associated
with implementing Serializable. Each time you design a class, weigh the costs against the benefits. Historically, value
classes such as BigInteger and Instant implemented Serializable, and collection classes did too. Classes representing
active entities, such as thread pools, should rarely implement Serializable.

**实现 Serializable 接口并不是一个轻松的决定。** 如果一个类要参与一个框架，该框架依赖于 Java 序列化来进行对象传输或持久化，这对于类来说实现
Serializable 接口就是非常重要的。此外，如果类 A 要成为另一个类 B 的一个组件，类 B 必须实现 Serializable 接口，若类 A
可序列化，它就会更易于被使用。然而，与实现 Serializable 相关的代价很多。每次设计一个类时，都要权衡利弊。历史上，像 BigInteger 和
Instant 这样的值类实现了 Serializable 接口，集合类也实现了 Serializable 接口。表示活动实体（如线程池）的类很少情况适合实现
Serializable 接口。

**Classes designed for inheritance (Item 19) should rarely implement Serializable, and interfaces should rarely extend
it.** Violating this rule places a substantial burden on anyone who extends the class or implements the interface. There
are times when it is appropriate to violate the rule. For example, if a class or interface exists primarily to
participate in a framework that requires all participants to implement Serializable, then it may make sense for the
class or interface to implement or extend Serializable.

**为继承而设计的类（[Item-19](../Chapter-4/Chapter-4-Item-19-Design-and-document-for-inheritance-or-else-prohibit-it.md)
）很少情况适合实现 Serializable 接口，接口也很少情况适合扩展它。**
违反此规则会给扩展类或实现接口的任何人带来很大的负担。有时，违反规则是恰当的。例如，如果一个类或接口的存在主要是为了参与一个要求所有参与者都实现
Serializable 接口的框架，那么类或接口实现或扩展 Serializable 可能是有意义的。

Classes designed for inheritance that do implement Serializable include Throwable and Component. Throwable implements
Serializable so RMI can send exceptions from server to client. Component implements Serializable so GUIs can be sent,
saved, and restored, but even in the heyday of Swing and AWT, this facility was little-used in practice.

在为了继承而设计的类中，Throwable 类和 Component 类都实现了 Serializable 接口。正是因为 Throwable 实现了 Serializable
接口，RMI 可以将异常从服务器发送到客户端；Component 类实现了 Serializable 接口，因此可以发送、保存和恢复 GUI，但即使在 Swing
和 AWT 的鼎盛时期，这个工具在实践中也很少使用。

If you implement a class with instance fields that is both serializable and extendable, there are several risks to be
aware of. If there are any invariants on the instance field values, it is critical to prevent subclasses from overriding
the finalize method, which the class can do by overriding finalize and declaring it final. Otherwise, the class will be
susceptible to finalizer attacks (Item 8). Finally, if the class has invariants that would be violated if its instance
fields were initialized to their default values (zero for integral types, false for boolean, and null for object
reference types), you must add this readObjectNoData method:

如果你实现了一个带有实例字段的类，它同时是可序列化和可扩展的，那么需要注意几个风险。如果实例字段值上有任何不变量，关键是要防止子类覆盖
finalize 方法，可以通过覆盖 finalize 并声明它为 final 来做到。最后，如果类的实例字段初始化为默认值（整数类型为 0，布尔值为
false，对象引用类型为 null），那么必须添加 readObjectNoData 方法：

```
// readObjectNoData for stateful extendable serializable classes
private void readObjectNoData() throws InvalidObjectException {
    throw new InvalidObjectException("Stream data required");
}
```

This method was added in Java 4 to cover a corner case involving the addition of a serializable superclass to an
existing serializable class [Serialization, 3.5].

这个方法是在 Java 4 中添加的，涉及将可序列化超类添加到现有可序列化类 [Serialization, 3.5] 的特殊情况。

There is one caveat regarding the decision not to implement Serializable. If a class designed for inheritance is not
serializable, it may require extra effort to write a serializable subclass. Normal deserialization of such a class
requires the superclass to have an accessible parameterless constructor [Serialization, 1.10]. If you don’t provide such
a constructor, subclasses are forced to use the serialization proxy pattern (Item 90).

关于不实现 Serializable
的决定，有一个警告。如果为继承而设计的类不可序列化，则可能需要额外的工作来编写可序列化的子类。子类的常规反序列化，要求超类具有可访问的无参数构造函数 [Serialization, 1.10]
。如果不提供这样的构造函数，子类将被迫使用序列化代理模式（[Item-90](../Chapter-12/Chapter-12-Item-90-Consider-serialization-proxies-instead-of-serialized-instances.md)）。

**Inner classes (Item 24) should not implement Serializable.** They use compiler-generated synthetic fields to store
references to enclosing instances and to store values of local variables from enclosing scopes. How these fields
correspond to the class definition is unspecified, as are the names of anonymous and local classes. Therefore, the
default serialized form of an inner class is illdefined. A static member class can, however, implement Serializable.

**内部类（[Item-24](../Chapter-4/Chapter-4-Item-24-Favor-static-member-classes-over-nonstatic.md)）不应该实现
Serializable。**
它们使用编译器生成的合成字段存储对外围实例的引用，并存储来自外围的局部变量的值。这些字段与类定义的对应关系，就和没有指定匿名类和局部类的名称一样。因此，内部类的默认序列化形式是不确定的。但是，静态成员类可以实现
Serializable 接口。

To summarize, the ease of implementing Serializable is specious. Unless a class is to be used only in a protected
environment where versions will never have to interoperate and servers will never be exposed to untrusted data,
implementing Serializable is a serious commitment that should be made with great care. Extra caution is warranted if a
class permits inheritance.

总而言之，认为实现 Serializable 接口很简单这个观点似是而非。除非类只在受保护的环境中使用，在这种环境中，版本永远不必互操作，服务器永远不会暴露不可信的数据，否则实现
Serializable 接口是一项严肃的事情，应该非常小心。如果类允许继承，则更加需要格外小心。

---
**[Back to contents of the chapter（返回章节目录）](../Chapter-12/Chapter-12-Introduction.md)**

- **Previous
  Item（上一条目）：[Item 85: Prefer alternatives to Java serialization（优先选择 Java 序列化的替代方案）](../Chapter-12/Chapter-12-Item-85-Prefer-alternatives-to-Java-serialization.md)
  **
- **Next
  Item（下一条目）：[Item 87: Consider using a custom serialized form（考虑使用自定义序列化形式）](../Chapter-12/Chapter-12-Item-87-Consider-using-a-custom-serialized-form.md)
  **
