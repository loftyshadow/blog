# Docker安装ElasticSearch

## 下载镜像
```shell:no-line-numbers
docker pull elasticsearch:8.11.1
```

## 创建相关文件
```shell:no-line-numbers
mkdir -p /mydata/elasticsearch/img
mkdir -p /mydata/elasticsearch/data
mkdir -p /mydata/elasticsearch/logs

chmod 777 /mydata/elasticsearch/img
chmod 777 /mydata/elasticsearch/data
chmod 777 /mydata/elasticsearch/plugins
chmod 777 /mydata/elasticsearch/logs

echo "# 监听ip
http.host: 0.0.0.0
# 集群名
cluster.name: docker-cluster
# 节点名
node.name: node
# 开启x-pack插件,用于添加账号密码、安全控制等配置
xpack.security.enabled: false #最关键的一句
xpack.security.transport.ssl.enabled: false
xpack.security.enrollment.enabled: false" >>//mydata/elasticsearch/img/elasticsearch.yml
```

## 启动es

```shell:no-line-numbers
docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
--restart=always \
-e "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms64m -Xmx128m" \
-v /mydata/elasticsearch/img/elasticsearch.yml:/usr/share/elasticsearch/img/elasticsearch.yml \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch/logs:/usr/share/elasticsearch/logs \
-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:8.11.1
```

## 测试es健康状态

[测试es健康状态](http://192.168.1.14:9200/_cat/health?v)
