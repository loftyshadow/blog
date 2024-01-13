# ThreadLocalUtils

```java
public class ThreadLocalUtils {

    private ThreadLocalUtils() {
    }

    private static final ThreadLocal<Map<Object, Object>> MAP_THREAD_LOCAL = ThreadLocal.withInitial(HashMap::new);

    private static final Map<Object, Object> cacheMap;

    static {
        cacheMap = MAP_THREAD_LOCAL.get();
    }

    public static Map<Object, Object> getThreadLocal() {
        return MAP_THREAD_LOCAL.get();
    }

    public static <T> T get(Object key) {
        if (cacheMap == null) {
            return null;
        }
        return (T) cacheMap.get(key);
    }

    public static <T> T get(Object key, Object defaultValue) {
        if (cacheMap == null) {
            return (T) defaultValue;
        }
        return (T) cacheMap.get(key);
    }

    public static Object set(Object key, Object value) {
        return cacheMap.put(key, value);
    }

    public static void set(Map<Object, Object> map) {
        cacheMap.putAll(map);
    }

    public static void removeValue(Object key) {
        MAP_THREAD_LOCAL.remove();
        if (!Objects.isNull(cacheMap.get(key))) {
            cacheMap.remove(key);
        }
    }

}
```  