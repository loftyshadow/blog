# ThreadLocalUtils

```java
import java.util.HashMap;
import java.util.Map;

/**
 * 一个线程安全的 ThreadLocal 工具类。
 * 注意：在使用线程池的场景下（如Web服务器），必须在请求处理完成后调用 removeAll() 方法，以防内存泄漏。
 */
public final class ThreadLocalUtils {

    private ThreadLocalUtils() {
        // 私有构造函数，防止实例化
    }

    private static final ThreadLocal<Map<String, Object>> THREAD_LOCAL = ThreadLocal.withInitial(HashMap::new);

    /**
     * 获取当前线程的 ThreadLocal Map。
     *
     * @return 当前线程的 Map 实例。
     */
    public static Map<String, Object> getThreadLocalMap() {
        return THREAD_LOCAL.get();
    }

    /**
     * 从当前线程的 Map 中获取一个值。
     *
     * @param key 键
     * @param <T> 值的类型
     * @return 键对应的值，如果不存在则返回 null
     */
    @SuppressWarnings("unchecked")
    public static <T> T get(String key) {
        // 每次都从 ThreadLocal 获取当前线程的 Map
        Map<String, Object> map = THREAD_LOCAL.get();
        return (T) map.get(key);
    }

    /**
     * 从当前线程的 Map 中获取一个值，如果不存在则返回默认值。
     *
     * @param key          键
     * @param defaultValue 默认值
     * @param <T>          值的类型
     * @return 键对应的值，或默认值
     */
    @SuppressWarnings("unchecked")
    public static <T> T get(String key, T defaultValue) {
        Map<String, Object> map = THREAD_LOCAL.get();
        Object value = map.get(key);
        return value == null ? defaultValue : (T) value;
    }

    /**
     *向当前线程的 Map 中设置一个键值对。
     *
     * @param key   键
     * @param value 值
     */
    public static void set(String key, Object value) {
        THREAD_LOCAL.get().put(key, value);
    }

    /**
     * 将一个 Map 中的所有键值对设置到当前线程的 Map 中。
     *
     * @param sourceMap 源 Map
     */
    public static void setAll(Map<String, Object> sourceMap) {
        THREAD_LOCAL.get().putAll(sourceMap);
    }

    /**
     * 从当前线程的 Map 中移除一个键值对。
     *
     * @param key 要移除的键
     */
    public static void remove(String key) {
        Map<String, Object> map = THREAD_LOCAL.get();
        // map 可能为 null 的情况非常罕见，但做个检查更安全
        if (map != null) {
            map.remove(key);
        }
    }

    /**
     * 【方法一：清空所有值】清空当前线程 Map 中的所有键值对。
     * Map 对象本身依然存在，只是变为空了。
     */
    public static void clear() {
        Map<String, Object> map = THREAD_LOCAL.get();
        if (map != null) {
            map.clear();
        }
    }

    /**
     * 【方法二：移除整个 ThreadLocal】移除当前线程的整个 Map 实例。
     * 这是防止内存泄漏的最佳实践。调用后，当前线程的 ThreadLocal 就干净了。
     * 下次再调用 get() 会重新创建一个新的空 Map。
     */
    public static void removeAll() {
        THREAD_LOCAL.remove();
    }
}
```
