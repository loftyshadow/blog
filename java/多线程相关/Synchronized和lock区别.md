# Synchronized
`synchronized` 是 Java 内置的同步机制。它基于监视器锁（monitor lock）或对象锁概忈实现，当线程进入一个 `synchronized` 方法或代码块时，它会自动获得锁，退出时自动释放锁。
**特点**
- **内置语法**: 不需要显式创建锁对象。
- **自动锁管理**: 锁的获取和释放由 JVM 管理。
- **阻塞和唤醒**: 当线程尝试获取一个已被其他线程持有的锁时，它会阻塞，并在锁被释放时自动唤醒。
- **可重入**: 支持同一线程的多次加锁。
- **不支持中断**: 当线程在等待锁时，不能响应中断。
- **没有公平性**: 不能保证等待时间最长的线程会首先获得锁。
- **性能**: 在 JDK 1.6 之后，通过引入偏向锁、轻量级锁、重量级锁等优化，性能得到显著提升。
Synchronized还具有volatile变量的读写语义。在使用Synchronized关键字时，内存屏障会确保本地线程中修改过的变量值被刷新回主内存，从而保证了多个线程之间对变量修改的可见性。  

**示例代码**:
```java
public class SynchronizedExample {
    private int count = 0;

    // 方法同步
    public synchronized void increment() {
        count++;
    }

    // 块同步
    public void decrement() {
        synchronized(this) {
            count--;
        }
    }
}
```
## Synchronized锁升级
锁一共有4种状态，级别从低到高依次是：无锁状态、偏向锁状态、轻量级锁和重量级锁
锁可以升级但不能降级，意味着偏向锁升级为轻量级锁后不能降级为偏向锁。
1. **偏向锁**  
大所述情况下，锁不仅不存在多线程竞争，而且总是由同一线程多次获得，为了让线程获得所的代价更低而引入偏向锁。  
当一个线程访问同步代码并获取锁时，会对对象头和栈帧中的锁记录里保存锁偏向的线程ID，以后该线程再进入和退出同步锁时，不需要进行CAS操作来加锁和解锁，而只是简单地测试一下对象头的Mark Word里是否存储执行当前线程的偏向锁。  
偏向锁作用是：在没有别的线程竞争的时候，一直偏向当前线程，当前线程可以一直执行。
2. **轻量级锁（自旋锁）**  
轻量级锁，由偏向锁升级而来。
偏向锁运行在一个线程进入同步块的情况下，当第二个线程加入锁争用的时候，偏向锁就会升级为轻量级锁。
3. **重量级锁**  
轻量级锁膨胀之后，就升级为重量级锁。  
重量级锁时依赖对象内部的monitor锁来实现的，而monitor又依赖操作系统的MutexLock（互斥锁）来实现的，所以重量级锁也被称为互斥锁（synchronized就是重量级锁）。

- 偏向锁
> 优点：加锁和解锁不需要额外的消耗  
> 缺点：线程存在竞争，会带来额外的锁撤销的消耗  
> 场景：单一线程访问同步块场景
- 轻量级锁
> 优点：竞争的线程不会阻塞，提高了程序的响应速度。  
> 缺点：线程自旋时不释放CPU  
> 场景：追求响应时间，同步块执行速度非常快。  
- 重量级锁
> 优点：线程竞争不使用自旋，释放CPU  
> 缺点：线程阻塞，响应时间缓慢。  
> 场景：追求吞吐量，同步块执行速度较长。
# Lock 接口
Lock 是一个接口，它提供了比 synchronized 更灵活的锁操作，并且允许更细粒度的锁控制。ReentrantLock 是 Lock 的一个常用实现类。

**特点**
- 显示锁操作: 需要手动获取和释放锁。
- 尝试获取锁: 提供了 tryLock() 方法，可以尝试获取锁而不会无限期等待。
- 中断锁等待: 线程可以在等待锁的过程中响应中断。
- 公平锁支持: 可选的公平锁模式可以保证先进先出的服务顺序。
- 锁绑定多个条件: 可以绑定多个条件对象，实现复杂的同步机制。
# 比较
1. 可中断性: 使用 Lock，线程在等待锁的过程中可以被中断。与 synchronized 不同，一个等待 synchronized 块的线程不能被中断。
2. 公平性: Lock 提供了可选的公平性设置，例如，ReentrantLock 支持创建公平锁和非公平锁，而 synchronized 不支持公平锁。
3. 条件变量: Lock 提供了 Condition 类，可以分离对象锁的等待集，而 synchronized 与 Object 类的 wait()、notify()、notifyAll() 方法一起工作，只有一个条件（等待集），可能不够细粒度。  
一个Reentrantlock对象可以同时绑定多个Condition对象，而在synchronized中，锁对象的wait()和notify()或notifyAll()方法可以实现一个隐含的条件。如果要和多余一个添加关联的时候，synchronized就不得不额外地添加一个锁，而Reentrantlock则无须这么做只需要多次调用new Condition()方法即可。  
4. 锁绑定: Lock 可以跨方法绑定锁，而 synchronized 锁定的范围受到方法或代码块的限制。
5. synchronized是关键字，而Lock是接口
6. synchronized关键字的两个线程1和线程2，若当前线程1获得锁，线程2等待，如果线程1阻塞，线程2会一直等待下去。  
而lock锁不一定会等待下去，如果尝试获得不到锁，线程可以不用一直等待就结束了。  
lock锁适合大量同步的代码的同步问题，synchronized锁适合代码少量的同步问题
## 内部实现
### synchronized 实现
synchronized 的实现涉及 JVM 底层的监视器锁（monitor）。在对象锁的情况下，每个对象都与一个监视器相关联，当 synchronized 方法或代码块被执行时，线程必须获得这个监视器。
```Java
// 伪代码展示 synchronized 实现的概念
monitor.enter(object) // 进入同步块
try {
    // 同步代码
} finally {
    monitor.exit(object) // 退出同步块
}
```
### Lock 实现
Lock 接口的实现通常涉及 AQS（AbstractQueuedSynchronizer）的使用。ReentrantLock 就是通过这种方式实现的。
```Java
// 伪代码展示 Lock 实现的概念
public class ReentrantLock implements Lock {
    private final Sync sync = new Sync();

    private static class Sync extends AbstractQueuedSynchronizer {
        // 实现 AQS 提供的方法来定义锁的行为
    }

    public void lock() {
        sync.acquire(1);
    }

    public void unlock() {
        sync.release(1);
    }

    // 其他方法...
}
```
ReentrantLock 通过扩展 AQS 并实现相应的方法，如 tryAcquire() 和 tryRelease()，来管理其锁状态。  
synchronized 适合简单的同步场景，它是 Java 语言级的特性。由于 JDK 的优化，它在性能上有了显著提升，对大多数情况下足够好。  
相比之下，Lock 提供的灵活性更高，它是显式的、可控的，并且拥有更多的特性。如果需要高级功能，比如可中断的锁获取、公平性、以及绑定多个条件，那么 Lock 通常是更好的选择。  
选择哪一种同步方式取决于具体的应用场景和需求。在涉及复杂同步控制逻辑或特殊需求时，Lock 接口通常会提供更好的控制和更高的灵活性。  
synchronized会多次自旋，以获得锁，在这个过程中等待的线程不会被挂起，因而节省了挂起和唤醒的上下文切换的开销而reentrantlock，不会自旋，而是直接挂起因而在线程并发量不大的情况下，synchronized因为拥有自旋锁、偏向锁和轻量级锁的原因，不用将等待线程挂起，偏向锁甚至不用自旋，所以在这种情况下要比reenttrantlock高效。   
synchronized会保证对进入同一个监视器的线程保证可见性。比如线程 t1修改了变量，退出监视器之前，会把修改变量值v1刷新的主内存当中；当线程t2进入这个监视器时，如果有某个处理器缓存了变量v1，首先缓存失效，然后必须重主内存重新加载变量值v1（这点和volatile很像）。  
这里语义的解读只是说了对于同一个监视器，变量的可见性有一定的方式可寻，非同一个监视器就不保证了。
