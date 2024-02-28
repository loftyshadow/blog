# linux 安装 docker

```shell:no-line-numbers
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

## 设置端口号

```shell:no-line-numbers
sudo vim /lib/systemd/system/docker.service
```

## docker 设置端口 2375

修改下面语句

```text:no-line-numbers
ExecStart=/usr/bin/dockerd -H unix://
```

修改为：

```text:no-line-numbers
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock -H tcp://0.0.0.0:7654
```

## 重载配置和重启

```shell:no-line-numbers
sudo systemctl daemon-reload
sudo systemctl restart docker.service
```

## 镜像加速

鉴于国内网络问题，后续拉取 Docker 镜像十分缓慢，我们可以需要配置加速器来解决。
可以使用阿里云的 docker 镜像地址：<https://7qyk8phi.mirror.aliyuncs.com>
新版的 Docker 使用 `/etc/docker/daemon.json`（Linux，没有请新建）。
请在该配置文件中加入：
（没有该文件的话，请先建一个）

```json
{
  "registry-mirrors": ["https://7qyk8phi.mirror.aliyuncs.com"]
}
```

docker update --restart=always 容器名称(或者容器 ID)
