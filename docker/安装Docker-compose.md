```shell:no-line-numbers
#运行此命令以下载 Docker Compose 的当前稳定版本
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#对二进制文件应用可执行权限
sudo chmod +x /usr/local/bin/docker-compose
#测试安装
docker-compose --version
#若有docker-compose version 1.29.2, build 5becea4c，则安装成功
```

[windows下载](https://github.com/docker/compose)

```shell:no-line-numbers
# 1. 基于docker-compose.yml启动管理的容器
docker-compose up -d
# 2. 关闭并删除容器
docker-compose down
# 3. 开启|关闭|重启已经存在的由docker-compose维护的容器
docker-compose start|stop|restart
# 4. 查看由docker-compose管理的容器
docker-compose ps
# 5. 查看日志
docker-compose logs -f
```

<details>
<summary>个人配置</summary>

```
version: "3.5"

services:
  mysql:
    image: mysql:8.2.0
    container_name: mysql
    restart: "no"
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - TZ=Asia/Shanghai
    ports:
      - 3306:3306
    volumes:
      - ./mysql/data:/var/lib/mysql
      - ./mysql/conf.d:/etc/mysql/conf.d
      - ./mysql/log:/var/log/mysql
      - ./mysql/initdb:/docker-entrypoint-initdb.d

  redis:
    image: redis:7.2.3
    container_name: redis
    restart: "no"
    ports:
      - 6379:6379
    volumes:
      - ./redis/data:/data
      - ./redis/redis.conf:/etc/redis/redis.conf

  nacos:
    image: nacos/nacos-server:v2.3.0
    container_name: nacos
    restart: "no"
    privileged: true
    depends_on:
      - mysql
    ports:
      - 8848:8848
      - 8849:8849
      - 9848:9848
      - 9849:9849
    environment:
      - JVM_XMS=256m
      - JVM_XMX=256m
      - MODE=standalone
      - PREFER_HOST_MODE=hostname
    volumes:
      - ./nacos/logs:/home/nacos/logs
      - ./nacos/init.d/custom.properties:/home/nacos/init.d/custom.properties

  elasticsearch:
    image: elasticsearch:8.11.1
    container_name: elasticsearch
    restart: "no"
    ports:
      - 9200:9200
      - 9300:9300
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
      - TZ=Asia/Shanghai
    volumes:
      - ./elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
      - ./elasticsearch/data:/usr/share/elasticsearch/data
      - ./elasticsearch/plugins:/usr/share/elasticsearch/plugins
    networks:
      - elastic_net

  kibana:
    image: kibana:8.11.1
    container_name: kibana
    restart: "no"
    ports:
      - 5601:5601
    links:
      - elasticsearch:elasticsearch
    environment:
      - SERVER_HOST=0.0.0.0
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - I18N_LOCALE=zh-CN
      - TZ=Asia/Shanghai
    #或者通过配置文件   volumes:
    #      - ./kibana/img/kibana.yml:/usr/share/kibana/img/kibana.yml
    networks:
      - elastic_net
    depends_on:
      - elasticsearch

  #  canal:
  #    image: canal/canal-server:v1.1.6
  #    container_name: canal
  #    restart: "no"
  #    ports:
  #      - 11111:11111
  #    volumes:
  #      - ./canal/conf/example:/home/admin/canal-server/conf/example
  #      - ./canal/conf/canal.properties:/home/admin/canal-server/conf/canal.properties
  #      - ./canal/logs:/home/admin/canal-server/logs

  postgres:
    image: postgres:16.1
    container_name: postgresql
    restart: "no"
    ports:
      - 5432:5432
    volumes:
      - ./postgres/data:/var/lib/postgresql/data
      - ./postgres/initdb:/docker-entrypoint-initdb.d
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=123456

  mongo:
    image: mongo:7.0.4
    container_name: mongo
    restart: "no"
    ports:
      - 27017:27017

  rabbitmq:
    image: rabbitmq:3.12.10-management
    container_name: rabbitmq
    restart: "no"
    privileged: true
    ports:
      - 5672:5672
      - 15672:15672
    volumes:
      - ./rabbitmq/plugins/rabbitmq_delayed_message_exchange-3.12.0.ez:/plugins/rabbitmq_delayed_message_exchange-3.12.0.ez
    environment:
      - RABBITMQ_DELAYED_MESSAGE_ENABLED=true
      - RABBITMQ_DEFAULT_USER=root
      - RABBITMQ_DEFAULT_PASS=123456
      - RABBITMQ_PLUGINS=enable --offline rabbitmq_delayed_message_exchange

#  excalidraw:
#    image: excalidraw/excalidraw:latest
#    container_name: excalidraw
#    restart: "no"
#    ports:
#      - 5000:80
# 网络配置
networks:
  elastic_net:
    driver: bridge
```
</details>
