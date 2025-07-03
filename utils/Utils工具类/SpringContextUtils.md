# SpringContextUtils

```java
@Component // 1. 将此类声明为 Spring Bean，以便 Spring 容器管理它
public class SpringContextUtils {

    // 2. 定义一个静态变量来持有 ApplicationContext
    private static ApplicationContext applicationContext;

    // 3. 使用构造函数注入 ApplicationContext
    // Spring 容器会自动找到一个 ApplicationContext 类型的 Bean 并注入进来。
    public SpringContextUtil(ApplicationContext context) {
        SpringContextUtil.applicationContext = context;
    }
    
    // 4. 提供静态方法来获取 Bean
    public static <T> T getBean(Class<T> clazz) {
        return applicationContext.getBean(clazz);
    }

    public static Object getBean(String name) {
        return applicationContext.getBean(name);
    }

    public static <T> T getBean(String name, Class<T> clazz) {
        return applicationContext.getBean(name, clazz);
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }
}
```
