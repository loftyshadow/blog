# 下载docker-compose

```shell:no-line-numbers
#运行此命令以下载 Docker Compose 的当前稳定版本
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#对二进制文件应用可执行权限
sudo chmod +x /usr/local/bin/docker-compose
#测试安装
docker-compose --version
#若有docker-compose version 1.29.2, build 5becea4c，则安装成功
```

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
