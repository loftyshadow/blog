# Linux环境变量配置

## 在`/etc/profile.d`目录下创建sh脚本
```bash
cd /etc/profile.d
vi my_env.sh
```

```bash
export JAVA_HOME="/usr/java/jdk1.8.0_202"

export PATH=$PATH:$JAVA_HOME/bin
```

## 给脚本增加执行权限
```bash
chmod +x my_env.sh
```
