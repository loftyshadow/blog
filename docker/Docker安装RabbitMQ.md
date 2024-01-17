# Docker安装RabbitMQ

```shell:no-line-numbers
docker run --restart=always \
--privileged=true \
-p 5672:5672 -p 15672:15672 --name rabbitmq -d rabbitmq:3.12.10-management
```

## 开启延迟队列插件

```shell:no-line-numbers
# 拷贝至docker容器内
docker cp /mydata/rabbitmq/plugins/rabbitmq_delayed_message_exchange-3.12.0.ez rabbitmq:/plugins/
# 进入docker容器内
docker exec  -it rabbitmq  bash
# 赋予权限
chmod 777 /plugins/rabbitmq_delayed_message_exchange-3.12.0.ez
# 启动延时插件
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```