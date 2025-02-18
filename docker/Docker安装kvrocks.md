```shell
docker run -d --name kvrocks -p 6666:6666 apache/kvrocks:2.8.0
```

如果整合RedisTemplate需要将lettuce实现更改为jedis实现
```groovy [gradle]
implementation(group: 'org.springframework.boot', name: 'spring-boot-starter-data-redis', version: '3.2.4') {
    // lettuce连接kvrocks会报错, 需要改用jedis
    exclude group: "io.lettuce"
}
// https://mvnrepository.com/artifact/redis.clients/jedis
implementation group: 'redis.clients', name: 'jedis', version: '5.2.0-beta1'
```
