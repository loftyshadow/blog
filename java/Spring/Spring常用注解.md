[原文链接 ](https://juejin.cn/post/6844904136492711950?searchId=20250218102211153475206B5DBBD5511C)
# 1. Spring Bean相关
## 1.1 `@Autowired`
自动导入对象到类中，被注入进的类同样要被 Spring 容器管理比如：Service 类注入到 Controller 类中。
```java
@Service
public class UserService {
    // xxx
}

@RestController
@GetMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
}
```

## 1.2 `Component`, `@Repository`, `@Service`, `@Controller`
我们一般使用 `@Autowired` 注解让 Spring 容器帮我们自动装配 bean。要想把类标识成可用于 `@Autowired` 注解自动装配的 bean 的类,可以采用以下注解实现：  
- `@Component` ：通用的注解，可标注任意类为 Spring 组件。如果一个 Bean 不知道属于哪个层，可以使用@Component 注解标注。  
- `@Repository` : 对应持久层即 Dao 层，主要用于数据库相关操作。  
- `@Service` : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。  
- `@Controller` : 对应 Spring MVC 控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面。  

## 1.3 `@RestController`
`@RestController`注解是`@Controller`和`@ResponseBody`的合集,表示这是个控制器 bean,并且是将函数的返回值直 接填入 HTTP 响应体中,是 REST 风格的控制器。
## 1.4 `@Scope`
声明 Spring Bean 的作用域，使用方法:
```java
@Bean
@Scope("singleton")
public Person personSingleton() {
    return new Person();
}
```
**四种常见的 Spring Bean 的作用域**：

- singleton : 唯一 bean 实例，Spring 中的 bean 默认都是单例的。
- prototype : 每次请求都会创建一个新的 bean 实例。
- request : 每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP request 内有效。
- session : 每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP session 内有效。
## 1.5 `@Configuration`
一般用来声明配置类，可以使用 `@Component`注解替代，不过使用Configuration注解声明配置类更加语义化。
```java
@Configuration
public class AppConfig {
    @Bean        
    public TransferService transferService() {
        return new TransferService();
    }
}
```
## 1.6 `@value`
使用`@Value("${property}")`  读取比较简单的配置信息：  
```java
@Value("${test}")
String test;
```
## 1.7 `@ConfigurationProperties`
通过`@ConfigurationProperties`读取配置信息并与 bean 绑定。
```java
@Component
@ConfigurationProperties(prefix = "test")
public class ConfigurationPropertiesTest {
    private String name;
    private int age;
}
```
