# SpringContextUtils

```java
@Component
public class SpringContextUtils implements ApplicationContextAware {

    private SpringContextUtils() {
    }
    
    private static ApplicationContext applicationContext;

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    // 下面的这个方法上加了@Override注解，原因是继承ApplicationContextAware接口是必须实现的方法,
    /*在正常使用Spring框架时，实现了 ApplicationContextAware 接口的类，在Spring容器启动的过程中会自动注册为Bean，
    并且 setApplicationContext() 方法会自动被调用来设置ApplicationContext对象。因此，对于大部分情况下，setApplicationContext() 方法会被正确的调用，
    并且 applicationContext 静态变量会被正确的设置。
    但是，如果存在以下情况，setApplicationContext() 方法可能无法被调用：
    该类没有被注册为Bean，如果没有注册为Bean，就不会调用 setApplicationContext() 方法。
    如果该类被注册为Bean，但是 Spring 容器没有被正确的初始化，setApplicationContext() 方法也会失败。
    因此，从理论上讲，存在一定的风险 setApplicationContext() 方法不能被正确地调用。但在大多数情况下，该方法被调用的概率极高，
    所以 SpringContextUtil.getBean() 方法在大多数情况下能够正常工作。
    */
    @Override
    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
        SpringContextUtils.applicationContext = applicationContext;
    }

    public static Object getBean(String name)
            throws BeansException {
        return applicationContext.getBean(name);
    }

    public static Object getBean(String name, Class<?> requiredType)
            throws BeansException {

        return applicationContext.getBean(name, requiredType);
    }

    public static <T> T getBean(Class<T> clazz)
            throws BeansException {
        return applicationContext.getBean(clazz);
    }

    public static boolean containsBean(String name) {
        return applicationContext.containsBean(name);
    }

    public static boolean isSingleton(String name)
            throws NoSuchBeanDefinitionException {
        return applicationContext.isSingleton(name);
    }

    public static Class<?> getType(String name)
            throws NoSuchBeanDefinitionException {
        return applicationContext.getType(name);
    }

    public static String[] getAliases(String name)
            throws NoSuchBeanDefinitionException {
        return applicationContext.getAliases(name);
    }

    public static HttpServletRequest getHttpServletRequest() {
        return ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes())
                .getRequest();
    }

}
```
