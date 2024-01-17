# 后缀补全

![Idea后缀补全位置](./img/Idea后缀补全位置.png)
Idea配置Postfix Completion位置如上图

### debug

```text:no-line-numbers
log.debug($EXPR$);
```

### error

```text:no-line-numbers
log.error($EXPR$);
```

### info

```text:no-line-numbers
log.info($EXPR$);
```

### warn

```text:no-line-numbers
log.warn($EXPR$);
```

### pdebug

````text:no-line-numbers
log.debug("$EXPR$为: {}", $EXPR$);
````

### perror

```text:no-line-numbers
log.error("$EXPR$为: {}", $EXPR$);
```

### pinfo

```text:no-line-numbers
log.info("$EXPR$为: {}", $EXPR$);
```

### pwarn

```text:no-line-numbers
log.warn("$EXPR$为: {}", $EXPR$);
```

### toInteger

```text:no-line-numbers
Integer.parseInt($EXPR$)
```

### toDecimal

```text:no-line-numbers
new BigDecimal($EXPR$)
```

### isNull

```text:no-line-numbers
if (Objects.isNull($EXPR$)) {
    $END$
}
```

### fdebug

```text:no-line-numbers
.forEach(item -> log.debug("{}", item));
```
