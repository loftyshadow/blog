[原文连接](https://muxiner.github.io/using-scoop/)  
[ScoopInstaller](https://github.com/ScoopInstaller/Install#for-admin)
```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Run this command from a non-admin PowerShell to install scoop with default configuration, scoop will be install to C:\Users\<YOUR USERNAME>\scoop.  
从非管理员 PowerShell 运行此命令以使用默认配置安装 scoop，scoop 将安装到 C:\Users\<您的用户名>\scoop。
```shell
irm get.scoop.sh | iex
```
