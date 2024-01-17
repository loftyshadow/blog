# Docker安装mysql
## 创建mysql配置

```shell:no-line-numbers
mkdir -p /mydata/mysql/data
mkdir -p /mydata/mysql/log
mkdir -p /mydata/mysql/conf
vim /mydata/mysql/conf/my.cnf
```

## docker mysql配置（my.cnf）

```text
[client]
default-character-set=utf8mb4
[mysql]
default-character-set=utf8mb4
[mysqld]
default-time-zone='+8:00'
skip-host-cache
skip-name-resolve
default-authentication-plugin=mysql_native_password
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
table_open_cache=512
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci
# 开启 binlog
log-bin=mysql-binlog
# 选择 ROW 模式
binlog-format=ROW
# 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
server_id=1
max_connections=1000
max_user_connections=1000
mysqlx_max_connections=1000
thread_cache_size=64
```

## docker 启动mysql8.2.0

```shell:no-line-numbers
docker pull mysql:8.2.0

docker run --restart=always --privileged=true -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql:8.2.0
```

## docker启动mysql5.7

```shell:no-line-numbers
docker run --restart=always --privileged=true -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql:5.7
```
