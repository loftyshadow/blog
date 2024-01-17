# Docker安装Kibana

## 下载镜像
```shell:no-line-numbers
docker pull kibana:8.11.1
```

```shell:no-line-numbers
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://192.168.1.14:9200 \
-e SERVER_HOST=0.0.0.0 \
-e I18N_LOCALE=zh-CN \
#或者通过配置文件 -v /mydata/kibana/img/kibana.yml:/usr/share/kibana/img/kibana.yml \
-p 5601:5601 kibana:8.11.1
```
