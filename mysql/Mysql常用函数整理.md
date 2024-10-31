#Mysql常用函数整理

## COALESCE函数

COALESCE函数会按照参数的顺序依次判断值是否为空。如果找到一个非空值，则返回该值；如果所有参数都为空，则返回NULL

```sql
-- 给字段提供默认值
SELECT COALESCE(db.field, 'default_value')

-- 两个字段中第一个不为NULL的
SELECT COALESCE(db.field1, db.field2)

-- UPDATE语句中使用COALESCE函数来更新表中的列。例如，我们有一个表格存储了用户的姓名和电话号码，其中电话号码可能为空。我们希望在更新电话号码时，只使用非空的新值。以下是一个示例：

UPDATE users SET phone = COALESCE(new_phone, phone) WHERE id = 1;

-- 在以上示例中，COALESCE函数会检查new_phone的值是否为空。如果new_phone不为空，则使用new_phone的值来更新phone列；如果new_phone为空，则保持phone列的原值不变。
```
