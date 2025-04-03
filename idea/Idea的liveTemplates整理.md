![idea配置Live Templates位置](./img/Idea模板liveTemplates位置.png)
Idea配置Live Templates位置如上图
# File and Code Templates
## Includes
### File Header
```text
/**
* @description $description
* @author: 聂明智
* @date: ${DATE}-${TIME}
*/
```
## Code
### Junit5 Test Class
```text
#set($SOURCE_NAME_INDEX= $NAME.length() - 4)
#set($SOURCE_CLASS_NAME = $NAME.substring(0,$SOURCE_NAME_INDEX))
#set($BEAN_NAME = $SOURCE_CLASS_NAME.substring(0,1).toLowerCase() + $SOURCE_CLASS_NAME.substring(1))
import lombok.extern.slf4j.Slf4j;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;

#parse("File Header.java")

@ExtendWith(SpringExtension.class)
@Slf4j
class ${NAME} {

    @Autowired
    ${SOURCE_CLASS_NAME} ${BEAN_NAME};
  
    @TestConfiguration
    static class TestConfig {
        @Bean
        ${SOURCE_CLASS_NAME} ${BEAN_NAME}() {
            return new ${SOURCE_CLASS_NAME}();
        }
    }
    
  ${BODY}
}
```

# live templates

## log

```text:no-line-numbers
private static final Logger log = LoggerFactory.getLogger($CLASS_NAME$.class);
```

## test

```text:no-line-numbers
@Test
@SneakyThrows
@DisplayName("")
public void $METHOD_NAME$() {
    $METHOD_BODY$
}
```

## gwt
```text:no-line-numbers
// given

// when

// then

```

## sleep

```text:no-line-numbers
try { TimeUnit.SECONDS.sleep($SECONDS$); } catch (InterruptedException e) { throw new RuntimeException(e); }
```

## thread 新建一个线程:

```text:no-line-numbers
new Thread(() -> {
        $threadBody$
    }, $threadName$).start();
```

## @DNA

```text:no-line-numbers
@Data
@NoArgsConstructor
@AllArgsConstructor
```

## getEnum
```
public static Optional<$CLASS_NAME$> getEnumByCode(Integer code) {
    return Arrays.stream(values())
                .filter(e -> e.code.equals(code))
                .findFirst();
}
```
枚举类`$CLASS_NAME$`会失效获取不到ClassName需要自己配置
![](img/2024-04-12-16-01-46.png)
