// @ts-ignore
import { NavItem } from "vitepress/types/default-theme";

export const nav: NavItem[] = [
  {
    text: "主页",
    link: "/",
  },
  {
    text: "Java整理",
    activeMatch: "^/java/",
    link: "/java/常用的JVM参数和命令.md",
  },
  {
    text: "算法整理",
    activeMatch: "^/leetcode/",
    link: "/leetcode/menu.md",
  },
  {
    text: "Rust整理",
    activeMatch: "^/rust/",
    link: "/rust/rust环境安装.md",
  },
  {
    text: "书籍整理",
    activeMatch: "^/books/",
    link: "/books/menu.md",
  },
  {
    text: "文章整理",
    activeMatch: "^/article/",
    link: "/article/Zsh安装.md",
  },
  {
    text: "常用工具类Utils整理",
    activeMatch: "^/utils/",
    link: "/utils/计算工具类ArithUtils.md",
  },
  {
    text: "杂项",
    activeMatch: "^/snippets/",
    items: [
      {
        text: "常用软件",
        link: "/snippets/常用软件.md",
      },
      {
        text: "Chrome插件",
        link: "/snippets/Chrome浏览器插件.md",
      },
      {
        text: "油猴插件",
        link: "/snippets/油猴脚本.md",
      },
      {
        text: "双拼输入法",
        link: "/snippets/设置双拼输入法.md",
      },
      {
        text: "Idea整理",
        activeMatch: "^/idea/",
        link: "/idea/Idea的liveTemplates整理.md",
      },
    ],
  },
];
