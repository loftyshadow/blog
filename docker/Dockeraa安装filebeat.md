# Dockeraa安装filebeat

下载镜像
```shell
docker pull elastic/filebeat:8.11.1
```

在宿主机创建文件夹和文件

```shell
mkdir -p /usr/local/src/elk/filebeat/data
mkdir -p /usr/local/src/elk/filebeat/config
touch /usr/local/elk/filebeat/config/filebeat.yml
```

```yaml
filebeat.inputs:
- input_type: log
  enable: true
  paths:  # 采集日志的路径这里是容器内的path
   - /Users/lihaodong/Desktop/log/**
  multiline.pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
  multiline.negate: true
  multiline.match: after
  multiline.timeout: 10s
  # 为每个项目标识,或者分组，可区分不同格式的日志
  tags: ["pre-logs"]
  # 这个文件记录日志读取的位置，如果容器重启，可以从记录的位置开始取日志
  registry_file: /usr/share/filebeat/data/
  fields:
    logsource: node1
    logtype: pre

# 输出到logstash中,logstash更换为自己的ip
output.logstash:
  enabled: true
  hosts: ["ip:5044"]
```

修改权限
```shell
chmod 777 /usr/local/src/elk/filebeat/data
```

启动命令
```shell
docker run --name filebeat -d \
-v /Users/lihaodong/Desktop/log:/Users/lihaodong/Desktop/log \
-v /usr/local/src/elk/filebeat/config/filebeat.yml:/usr/share/filebeat/filebeat.yml \
-v /usr/local/src/elk/filebeat/data:/usr/share/filebeat/data \
elastic/filebeat:8.11.1
```
