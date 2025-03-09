import os

def add_navigation_links(directory):
    # 获取目录下所有md文件并排序
    md_files = sorted([f for f in os.listdir(directory) if f.endswith('.md') and f != 'menu.md'])

    for i, file_name in enumerate(md_files):
        file_path = os.path.join(directory, file_name)
        with open(file_path, 'a', encoding='utf-8') as file:

            # 提取文件名的编号部分
            prev_number = md_files[i-1].split('.')[0] if i > 0 else ""
            next_number = md_files[i+1].split('.')[0] if i < len(md_files) - 1 else ""

            # 构建链接
            prev_link = f"\n上一章:[{prev_number}](./{md_files[i-1]})" if i > 0 else ""
            next_link = f"\n下一章:[{next_number}](./{md_files[i+1]})" if i < len(md_files) - 1 else ""

            if prev_link:
                next_link = "\n" + next_link
            file.write(prev_link + next_link)
            file.truncate()

# 使用当前目录
current_directory = os.path.dirname(os.path.abspath(__file__))
add_navigation_links(current_directory)
