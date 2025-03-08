import os

# 获取当前工作目录
current_dir = os.getcwd()

# 获取当前目录下的所有文件
files = os.listdir(current_dir)

# 过滤出所有的 .md 文件
md_files = [f for f in files if f.endswith('.md') and f != 'menu.md']

# 生成 menu.md 文件的内容
menu_content = ""
for md_file in md_files:
    menu_content += f"- [{md_file.split('.')[0]}](./{md_file})\n"

# 写入 menu.md 文件
with open('menu.md', 'w', encoding='utf-8') as menu_file:
    menu_file.write(menu_content)
