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
`@Component` ：通用的注解，可标注任意类为 Spring 组件。如果一个 Bean 不知道属于哪个层，可以使用@Component 注解标注。  
`@Repository` : 对应持久层即 Dao 层，主要用于数据库相关操作。  
`@Service` : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。  
`@Controller` : 对应 Spring MVC 控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面。  

## 1.3 `@RestController`


