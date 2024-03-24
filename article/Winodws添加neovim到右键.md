# Winodws添加neovim到右键

## 1. 打开注册表

![](img/2024-03-23-13-14-39.png)

在`\HKEY_CLASSES_ROOT\*\shell`新建项`Open with Neovim`

![](img/2024-03-23-13-15-19.png)

新建String类型名为icon值为neovim地址

![](img/2024-03-23-13-22-30.png)

在`Open with Neovim`下创建`command`项

![](img/2024-03-23-13-32-16.png)

修改值为"Neovim地址" "%1"
