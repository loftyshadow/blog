# 对象数组的某一个属性去重看个数
```js
const fieldSet = new Set([].map(data => data.field))
console.log(fieldSet.size)
```
