# 1. JSON_LENGTH

获取json数组长度

```sql
SELECT JSON_LENGTH(field) AS array_length
FROM table
```

# 2. JSON_EXTRACT

`JSON_EXTRACT()` 是JSON提取函数，`$.name`就是一个`JSON path`，表示定位文档的 `name`字段.`JSON path`是以 `$`开头

```text
{
    "num": 123,
    "arr": [1,2],
    "obj": {
        "a": 3,
        "b": 4
    }
}
$.num //结果：123
$.arr //结果：[1, 2]
$.arr[1] //结果：1
$.obj.a //结果：3
```
# 4. JSON_TABLE

## 基本语法
```sql
JSON_TABLE(
    json_doc,           -- JSON文档
    path                -- JSON路径表达式
    COLUMNS (           -- 列定义
        column_list
    )
) AS alias
```
## 主要组成部分
### 1. JSON文档 (json_doc)
- 可以是JSON字符串、JSON列或返回JSON的表达式
- 在您的代码中是`s1.source_id`，存储的是JSON数组

### 2. 路径表达式 (path)
- 使用JSONPath语法定义如何遍历JSON
- `'$[*]'` 表示遍历根数组的所有元素
- `'$.key'` 表示访问对象的key属性
- `'$.array[*]'` 表示遍历数组的所有元素
### 3. COLUMNS子句
定义要提取的列及其数据类型：
```sql
COLUMNS (
column_name datatype PATH 'json_path',
column_name datatype EXISTS PATH 'json_path',
column_name FOR ORDINALITY
)
```
## 常用的COLUMNS选项
### PATH子句
```sql
-- 提取具体值
source_value VARCHAR(50) PATH '$'
-- 提取对象属性
name VARCHAR(100) PATH '$.name'
-- 提取嵌套值
price DECIMAL(10,2) PATH '$.product.price'
```
### EXISTS子句
```sql
-- 检查路径是否存在，返回1或0
has_discount BOOLEAN EXISTS PATH '$.discount'
```
### FOR ORDINALITY子句
```sql
-- 生成行号
row_number FOR ORDINALITY
```
## 实际应用示例
### 1. 基础用法
```sql
-- JSON数据：["value1", "value2", "value3"]
SELECT jt.* 
FROM JSON_TABLE(
    '["value1", "value2", "value3"]',
    '$[*]' COLUMNS (
        row_id FOR ORDINALITY,
        value VARCHAR(50) PATH '$'
    )
) AS jt;
```

### 2. 复杂对象处理
```sql
-- JSON数据：[{"id":1,"name":"商品1","price":100},{"id":2,"name":"商品2","price":200}]
SELECT jt.*
FROM JSON_TABLE(
    '[{"id":1,"name":"商品1","price":100},{"id":2,"name":"商品2","price":200}]',
    '$[*]' COLUMNS (
        product_id INT PATH '$.id',
        product_name VARCHAR(100) PATH '$.name',
        price DECIMAL(10,2) PATH '$.price'
    )
) AS jt;
```
### 3. 嵌套JSON处理
```sql
-- 处理嵌套的JSON结构
SELECT jt.*
FROM JSON_TABLE(
    '{"orders": [{"id": 1, "items": [{"sku": "A001", "qty": 10}]}]}',
    '$.orders[*].items[*]' COLUMNS (
        sku VARCHAR(50) PATH '$.sku',
        quantity INT PATH '$.qty'
    )
) AS jt;
```
