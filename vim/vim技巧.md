[Vim Cheat Sheet](https://vim.rtorr.com/lang/zh_cn)  
1. 按\<C-g>可以在可视模式及选择模式间切换。切换后看到的唯一不同是屏幕下方的提示信息会在 
“-- 可视 --”（-- VISUAL --）及“--选择--”（--SELECT--）间转换。
但是，如果在选择模式中输入任意可见字符，此字符会替换所选内容并切换到插入模式
2. gr/R 替换后切换回noremal模式
3. \<C-r>= 调用计算器
4. \<C-r>* 调用系统寄存器
5. \<C-a>增加数字，会找当前行的数字，减少光标移动\<C-x> 减少数字
6. insert模式\<C-o>退出insert模式后执行命令后重新进入insert模式，可用于zz后继续输入
7. gv 重选上次的高亮选区
8. neovim中执行zsh命令 `:! zsh -ic "ZSHCOMMAND"`
9. cib等效于ci(, ciB等效于ci{
10. 跳转指定行可以直接输入数字加G,等效于:指定行
11. vim放在后台\<C-z>再次输入fg重新进入vim
12. ZZ保存并退出，ZQ不保存退出
<Counter/>
<script setup>
  // 局部注册组件
  import HelloWorld from '../components/HelloWorld.vue';
</script>
<HelloWorld/>
