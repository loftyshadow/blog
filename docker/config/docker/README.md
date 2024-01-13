> 如果不清楚如何安装docker-compose的，可以看下《centos安装docker》文档

1.在文件编辑器上，使用全局替换的方式，将文件夹下的所有 `192.168.1.14`替换为服务器的ip

2.执行授权命令

```shell
chmod -R 777 /usr/docker
```

3.启动容器

```shell
docker-compose up -d --build
```

4.各个端访问路径及其密码

请自行192.168.1.14替换为服务器ip

- mysql: 使用数据库连接工具进行连接， 端口3306 账号及密码 root/123456
- postgresql: 使用数据库连接工具进行连接， 端口5432 账号及密码 postgres/123456
- redis: 端口6379，没有密码
- mongo: 27017，没有密码
- nacos: http://192.168.1.14:8848/nacos 账号及密码 nacos/nacos
- rabbitmq: http://192.168.1.14:15672/ 账号及密码 root/123456
- excalidraw: http://192.168.1.14:5000

4.启用RabbitMQ延迟插件

```shell
# 进入容器
docker exec  -it rabbitmq  bash
# 开启插件
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
# 查看开启的插件
rabbitmq-plugins list
```

5.新建索引

新建索引


