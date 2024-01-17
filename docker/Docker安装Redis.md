# Docker安装Redis

## 创建redis配置

```shell:no-line-numbers
mkdir -p /mydata/redis/conf
touch /mydata/redis/conf/redis.conf
```

## 启动redis docker

```shell:no-line-numbers
docker pull redis:7.2.3

docker run --restart=always --privileged=true -p 6379:6379 --name redis \
-v /mydata/redis/data:/data  \
-v /mydata/redis/redis.conf:/etc/redis/redis.conf \
-d redis:7.2.3 redis-server /etc/redis/redis.conf
```
