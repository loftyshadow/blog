import { defineConfig } from 'vitepress'
import {nav} from "./config/navbar";
import {sidebar} from "./config/sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: 'Blog',
  description: '基于VitePress个人博客整理站点',
  head: [['link', {rel: 'icon', href: 'favicon.ico'}]],
  themeConfig: {
    logo: '/favicon.ico',
    logoLink: '/favicon.ico',
    //默认主题所有配置请写在这里！！！
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/loftyshadow' }],
  },
  markdown: {
    math: true
  }
})
