# Docker安装PostgreSQL

## 创建相关文件

```shell:no-line-numbers
mkdir -p /mydata/postgresql/data
```

## docker 启动postgres16.1

```shell:no-line-numbers
docker pull postgres:16.1

docker run --name postgresql \
-e POSTGRES_PASSWORD=123456 \
-e ALLOW_IP_RANGE=0.0.0.0/0  \
-p 5432:5432 \
-v /mydata/postgresql/data:/var/lib/postgresql/data \
-d postgres:16.1
```