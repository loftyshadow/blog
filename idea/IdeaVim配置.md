# IdeaVim 配置

```text
let mapleader=" "

" =========插件配置 (Plugins config) https://github.com/JetBrains/ideavim/wiki/IdeaVim-Plugins========
" NerdTree
Plug 'preservim/nerdtree'
" 高亮插件
Plug 'machakann/vim-highlightedyank'
" 支持[surround](https://github.com/tpope/vim-surround) vi'/ci'/di'/cs'" 快速选择范围内内容
Plug 'tpope/vim-surround'
set multiple-cursors
" 支持[commentary](https://github.com/tpope/vim-commentary) gcc/gci{/gcw 生成注释
Plug 'tpope/vim-commentary'
" 支持[argtextobj](https://www.vim.org/scripts/script.php?script_id=2699)  cia/dia/caa/daa 快捷修改参数
Plug 'vim-scripts/argtextobj.vim'
" 支持[easymotion](https://github.com/easymotion/vim-easymotion)
Plug 'easymotion/vim-easymotion'
" 支持[textobj-entire](https://github.com/kana/vim-textobj-entire) vae/vie 快速选择全部内容，替代ggvG
Plug 'kana/vim-textobj-entire'
" 支持[ReplaceWithRegiste](https://www.vim.org/scripts/script.php?script_id=2703) griw(go replace inner word) 用寄存器内容替换操作
Plug 'vim-scripts/ReplaceWithRegister'
" 支持[exchange](https://github.com/tommcdo/vim-exchange) cx进行替换
Plug 'tommcdo/vim-exchange'

"===============================================
let g:argtextobj_pairs="[:],(:),<:>"

" =============Base settings============
"设置在光标距离窗口顶部或底部一定行数时，开始滚动屏幕内容的行为
set scrolloff=10

"--------search
"递增搜索功能：在执行搜索（使用 / 或 ? 命令）时，Vim 会在您输入搜索模式的过程中逐步匹配并高亮显示匹配的文本。
set incsearch
"在搜索时忽略大小写
set ignorecase
"如果搜索模式包含大写字母，则搜索将区分大小写。如果搜索模式全部为小写字母，则搜索将不区分大小写。
set smartcase
"寻找忽略大小写的匹配时('ignorecase' 必须先被设定)，但仍然采用已键入部分的大小写。这样，如果你键入 "For" 而 Vim 找到了匹配 "fortunately"，所产生的结果将是 "Fortunately"。
set infercase
"将搜索匹配的文本高亮显示
set hlsearch
"------------

"--------ident
set breakindent
set autoindent
set smartindent
"-------------

"---------tab
"将tab替换为相应数量空格
set expandtab
set smarttab
"-----------
"设置相对行号 和 当前行的绝对行号
set number relativenumber
"设置返回normal模式时回到英文输入法
set keep-english-in-normal-and-restore-in-insert
"显示光标所在位置的行号和列号
set ruler
"自动折行
set wrap
set backspace=1
set co=4
"设置匹配模式 类似当输入一个左括号时会匹配相应的那个右括号
set showmatch
"使用系统粘贴板
set clipboard^=unnamed,unnamedplus
"启用鼠标
set mouse=a
"突出显示当前行
set cursorline
set fdm=marker

"======================map映射==========
"将 jk 映射为 <Esc>
imap jk <Esc>
"格式化（规范化）文本，即对选定的文本进行换行或重排，适应指定的文本宽度。全文规范化：Ctrl+Alt+l
map Q gq
" Goto
"跳转到下一个错误或警告
nmap ge <action>(GotoNextError)
"在源代码和测试代码之间快速切换
nmap gt <action>(GotoTest)
"将光标移动到上一个方法的声明处
nmap gm <action>(MethodUp)
"跳转到当前接口或抽象类的实现处
nmap gi <action>(GotoImplementation)
"跳转到声明
map gd <Action>(GotoDeclaration)
"跳转到父方法
map gs <Action>(GotoSuperMethod)
"跳转到使用
map gf <Action>(ShowUsages)

" 切换标签页
nmap J <action>(PreviousTab)
nmap K <action>(NextTab)
" 代码折叠/展开 (Code fold/expand)
map zm <Action>(CollapseRegion)
map za <Action>(ExpandRegion)
map zM <Action>(CollapseAllRegions)
map zR <Action>(ExpandAllRegions)

"==================leader映射============
"关闭所有标签
nmap <leader>ca <action>(CloseAllEditors)
"extract method/function 将选中的代码片段提取为一个独立的方法(Ctrl + Alt + M)
vmap <leader>em <action>(ExtractMethod)
"extract constant （引入常量）的重构操作:将选中的代码片段抽取为一个常量，并自动替换选中的代码片段为新的常量引用(Ctrl + Alt + C)
vmap <leader>ec <action>(IntroduceConstant)
"extract field （引入字段）的重构操作:将选中的代码片段转化为一个新的字段，并自动将选中的代码片段替换为对该字段的引用(Ctrl + Alt + F)
vmap <leader>ef <action>(IntroduceField)
"extract variable （引入变量）的重构操作:将选中的代码片段抽取为一个新的变量，并自动替换选中的代码片段为新的变量引用(Ctrl + Alt + V)
vmap <leader>ev <action>(IntroduceVariable)
"打断点/解除断点
nmap <leader>dp <Action>(ToggleLineBreakpoint)
"调试
nmap <leader>db <Action>(Debug)
"查找
nmap <leader><leader>f <Plug>(easymotion-bd-f)
"重新格式化代码，使其符合预定义的代码样式和规范 \| 优化导入语句，删除未使用的导入，并将导入语句按字母顺序进行排列
nmap <leader>fm <action>(ReformatCode) \| <action>(OptimizeImports)
"执行版本控制（VCS）的回滚操作，将修改的代码还原到之前的版本
nmap <leader>gr :action Vcs.RollbackChangedLines<CR>
"生成构造器
nmap <leader>gc :action GenerateConstructor<CR>
"生成getter
nmap <leader>gg :action GenerateGetter<CR>
"生成setter
nmap <leader>gs :action GenerateSetter<CR>
"生成setter和getter
nmap <leader>ga <action>(GenerateGetterAndSetter)
"生成 equals() 和 hashcode() 的重写方法
nmap <leader>ge <action>(GenerateEquals)
"生成toString
nmap <leader>gt <action>(Actions.ActionsPlugin.GenerateToString)
"快速查找并跳转到下一个以 ( 开始的函数或方法调用的位置️
nmap <leader>i f(a
"普通模式下在行尾一个分号，然后进入插入模式并在当前行的下方新建一行
nmap <leader>j A;<ESC>o
nmap <leader>m <Plug>NextWholeOccurrence
"取消搜索高亮显示(No light)
nmap <leader>nh :nohlsearch<CR>
"在当前目录新建文件夹
nmap <leader>nd <action>(NewDir)
"在当前目录新建类
nmap <leader>nc <action>(NewClass)
"运行当前编辑器中的文件或类(Shift + F10)
nmap <leader>ru :action RunClass<CR>
"最近打开项目
nmap <leader>rp <Action>(ManageRecentProjects)
"重新运行最近一次运行的程序或测试(Ctrl+Shift + F10)
nmap <leader>rr <action>(Rerun)
"重新运行最近一次运行的测试（Unit Tests）(Ctrl + Shift + F10)
nmap <leader>rt <action>(RerunTests)
"在代码中快速更改一个标识符的名称，并自动处理所有相关的引用(Shift + F6)
map <leader>rn <action>(RenameElement)
" 打开终端并进入项目根目录 (ActivateTerminal with project root dir)
map <leader>tt <Action>(ActivateTerminalToolWindow)
" 分屏 垂直/水平/关闭 (Pane vertically split/horizontally split/close)
map <leader>wv <Action>(SplitVertically)
map <leader>ws <Action>(SplitHorizontally);
"关闭当前标签页
nmap <leader>wc :action CloseEditor<CR>
" 分屏切换
map <leader>wj <Action>(PrevSplitter)
map <leader>wk <Action>(NextSplitter)
" zen-mode
nnoremap <leader>z :action ToggleDistractionFreeMode<CR>

"========================sethandler
" Use ctrl-c as an ide shortcut in normal and visual modes
sethandler <C-2> a:ide
sethandler <c-s-2> a:ide
sethandler <c-6> a:ide
sethandler <c-s-6> a:ide
sethandler <c-a> a:ide
sethandler <c-b> a:ide
sethandler <c-c> a:ide
sethandler <c-d> a:ide
sethandler <c-e> a:ide
sethandler <c-f> a:ide
sethandler <c-g> a:ide
sethandler <c-h> a:ide
sethandler <c-i> a:ide
sethandler <c-j> a:ide
sethandler <c-k> a:ide
sethandler <c-l> a:ide
sethandler <c-m> a:ide
sethandler <c-n> a:ide
sethandler <c-o> a:ide
sethandler <c-p> a:ide
sethandler <c-q> a:ide
sethandler <c-r> a:ide
sethandler <c-s> a:ide
sethandler <c-t> a:ide
sethandler <c-u> a:ide
sethandler <c-v> a:ide
sethandler <c-w> a:ide
sethandler <c-x> a:ide
sethandler <c-y> a:ide
sethandler <c-\> a:ide
sethandler <c-[> a:ide
sethandler <c-]> a:ide
```
