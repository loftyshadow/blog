# 后缀补全

![Idea后缀补全位置](./img/Idea后缀补全位置.png)
Idea配置Postfix Completion位置如上图

### debug

```text
log.debug($EXPR$);
```

### error

```text
log.error($EXPR$);
```

### info

```text
log.info($EXPR$);
```

### warn

```text
log.warn($EXPR$);
```

### pdebug

````text
log.debug("$EXPR$为: {}", $EXPR$);
````

### perror

```text
log.error("$EXPR$为: {}", $EXPR$);
```

### pinfo

```text
log.info("$EXPR$为: {}", $EXPR$);
```

### pwarn

```text
log.warn("$EXPR$为: {}", $EXPR$);
```

### toInteger

```text
Integer.parseInt($EXPR$)
```

### toDecimal

```text
new BigDecimal($EXPR$)
```

### isNull

```text
if (Objects.isNull($EXPR$)) {
    $END$
}
```

### fdebug

```text
.forEach(item -> log.debug("{}", item));
```
