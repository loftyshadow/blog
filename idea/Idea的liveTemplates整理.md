# 模板live templates
![idea配置Live Templates位置](./img/Idea模板liveTemplates位置.png)
Idea配置Live Templates位置如上图

## log

```text:no-line-numbers
private static final Logger log = LoggerFactory.getLogger($CLASS_NAME$.class);
```

## test

```text:no-line-numbers
@Test
public void $METHOD_NAME$() {
    $METHOD_BODY$
}
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
