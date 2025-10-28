# jq常用命令整理
[jq官方手册](https://jqlang.org/manual)

只取数组的前两位
```bash
jq -r '.data.list[0:2]' my.json
```

遍历数组的每个元素
```bash
jq -r '.data.list[]' my.json
```
遍历后收集成成数组
```bash
jq -r '[.data.list[]]' my.json
```

字符串插值
```bash
jq -r '"\(.itemCount)"' my.json
```

遍历数组时的插值处理
```bash
jq -r '.data.list[] | "\(.serviceType) \(.serviceTypeName)"' my.json
```

数组去重
```bash
jq -r '.data.list | unique_by(.serviceType) | .[] | "\(.serviceType)+\(.serviceTypeName)"' my.json
```
