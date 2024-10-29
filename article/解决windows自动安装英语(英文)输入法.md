# 解决windows自动安装英语(英文)输入法

[原链接](https://superuser.com/questions/1092246/how-to-prevent-windows-10-from-automatically-adding-keyboard-layouts-i-e-us-ke)

编辑reg文件 
RemovePreload.reg
```reg
Windows Registry Editor Version 5.00

[-HKEY_USERS\.DEFAULT\Keyboard Layout\Preload]
```
