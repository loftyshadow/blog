# Nushell安装
## 1. 安装NuShell
[NuShell](https://github.com/nushell/nushell/releases)

## 2. 配置Nushell
### 2.1 通过命令配置
`nu` 进入Nushell后输入  
`$env.config.buffer_editor = "nvim"`  
输入`config nu`进行配置

### 2.2 直接修改配置文件配置
`cd $nu.default-config-dir`
可配置直接通过source xxx命令在目录中的script文件夹中
```shell
mkdir script
cd script
nvim ngr
```
```text
cd c:/SoftWare/Nginx
./nginx.exe -s reload
```
自定义在script中的脚本可以直接通过`source xxx`执行（如果直接定义自定义command也可以，不过我需要在neovim中调用该命令）

<details>
<summary>个人配置</summary>

```text
# config.nu
#
# Installed by:
# version = "0.102.0"
#
# This file is used to override default Nushell settings, define
# (or import) custom commands, or run any other startup tasks.
# See https://www.nushell.sh/book/configuration.html
#
# This file is loaded after env.nu and before login.nu
#
# You can open this file in your default editor using:
# config nu
#
# See `help config nu` for more options
#
# You can remove these comments if you want or leave
# them for future reference.

$env.STARSHIP_SHELL = "nu"

def create_left_prompt [] {
    starship prompt --cmd-duration $env.CMD_DURATION_MS $'--status=($env.LAST_EXIT_CODE)'
}

# Use nushell functions to define your right and left prompt
$env.PROMPT_COMMAND = { || create_left_prompt }
$env.PROMPT_COMMAND_RIGHT = ""

# The prompt indicators are environmental variables that represent
# the state of the prompt
$env.PROMPT_INDICATOR = ""
$env.PROMPT_INDICATOR_VI_INSERT = ": "
$env.PROMPT_INDICATOR_VI_NORMAL = "〉"
$env.PROMPT_MULTILINE_INDICATOR = "::: "

# 用nvim配置Nushell
$env.config.buffer_editor = "nvim"

# 关闭初始banner
$env.config.show_banner = false

# 集成wezterm会有换行问题，需要关闭
$env.config.shell_integration.osc133 = false

# 通过vi模式使用
$env.config.edit_mode = 'vi'

def n [file] {
  nvim $file
}

def nn [] {
  cd ~/AppData/Local/nvim
  n ./
}

def ngr [] {
  cd c:/SoftWare/Nginx
  nginx.exe -s reload
}

def ngc [] {
  cd c:/SoftWare/Nginx/conf/conf.d
  n xw.conf
}
```
</details>
