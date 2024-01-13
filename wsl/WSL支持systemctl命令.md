1.首先，需要确认你使用的是WSL2版本，可以在PowerShell中执行如下命令查看：

```shell
wsl -l -v
```
2.如果默认版本是1，可以使用如下命令进行配置
```shell
wsl --set-default-version 2
```

还可以使用如下方式设置默认的Linux发行版，其中distro-name替换为要配置的Linux发行版名称。例如
```shell
wsl --set-version Ubuntu-20.04 2
```
会将Ubuntu20.04发行版设置为使用WSL2：

```shell
wsl --set-version distro-name 2
```

3.在/etc目录新建wsl.conf文件，添加如下内容：
```text
[boot]
systemd=true
```

