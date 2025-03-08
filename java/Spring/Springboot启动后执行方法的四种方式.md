# Spring启动后执行方法的四种实现方式

在Spring应用中，有时我们需要在容器启动完成后执行一些初始化操作，比如加载配置、初始化缓存等。Spring提供了多种方式来实现这个需求，下面我们来详细介绍这些实现方式。

## 1. 使用@PostConstruct注解

@PostConstruct是Java EE的注解，它会在Spring容器初始化时被自动调用。被@PostConstruct修饰的方法会在构造函数之后，init()方法之前运行。

```java
package com.example.demo;

import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;

@Component
public class PostConstructExample {
    
    @PostConstruct
    public void init() {
        System.out.println("使用@PostConstruct注解的初始化方法");
    }
}
```

## 2. 实现InitializingBean接口

通过实现InitializingBean接口的afterPropertiesSet()方法，可以在bean的所有属性被设置完成后执行初始化逻辑。

```java
package com.example.demo;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

@Component
public class InitializingBeanExample implements InitializingBean {

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("实现InitializingBean接口的初始化方法");
    }
}
```

## 3. 使用@Bean的initMethod属性

在@Bean注解中使用initMethod属性，指定一个初始化方法。

```java
package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanInitMethodExample {

    @Bean(initMethod = "init")
    public MyService myService() {
        return new MyService();
    }
}

class MyService {
    public void init() {
        System.out.println("使用@Bean的initMethod属性指定的初始化方法");
    }
}
```

## 4. 实现ApplicationRunner或CommandLineRunner接口

这两个接口都提供了在Spring Boot应用启动后执行代码的方式，它们会在所有Spring Beans都初始化之后，且整个应用程序已准备就绪时执行。

### 4.1 ApplicationRunner示例

```java
package com.example.demo;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationRunnerExample implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("ApplicationRunner的run方法执行");
    }
}
```

### 4.2 CommandLineRunner示例

```java
package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerExample implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        System.out.println("CommandLineRunner的run方法执行");
    }
}
```

## 执行顺序

这些方法的执行顺序通常是：

1. @PostConstruct
2. InitializingBean的afterPropertiesSet()
3. @Bean的initMethod
4. ApplicationRunner和CommandLineRunner

## 使用建议

1. 如果是简单的Bean初始化操作，推荐使用@PostConstruct注解，它最简单直观。

2. 如果需要在初始化时访问Spring的基础设施，比如ApplicationContext，可以使用InitializingBean接口。

3. 如果是第三方类的初始化，无法修改源码时，可以使用@Bean的initMethod属性。

4. 如果需要在整个应用启动完成后执行操作，或者需要访问命令行参数，可以使用ApplicationRunner或CommandLineRunner。

## 注意事项

1. @PostConstruct注解的方法不能有参数。

2. InitializingBean接口的方法可能会被调用多次，需要注意幂等性。

3. ApplicationRunner和CommandLineRunner可以通过@Order注解或实现Ordered接口来控制执行顺序。

4. 在使用这些初始化方法时，要注意避免过重的操作，以免影响应用启动时间。
