# IdeaVim 配置

```text
"" Source your .vimrc
"source ~/.vimrc

"" -- Suggested options --
" Show a few lines of context around the cursor. Note that this makes the
" text scroll if you mouse-click near the start or end of the window.
set scrolloff=5

" Do incremental searching.
set incsearch

" Don't use Ex mode, use Q for formatting.
map Q gq

"" -- Map IDE actions to IdeaVim -- https://jb.gg/abva4t
"" Map \r to the Reformat Code action
"map \r <Action>(ReformatCode)

"" Map <leader>d to start debug
"map <leader>d <Action>(Debug)

"" Map \b to toggle the breakpoint on the current line
"map \b <Action>(ToggleLineBreakpoint)


" Find more examples here: https://jb.gg/share-ideavimrc
" ================================================================================================
" 🍰🍰🍰 Extensions 🍰🍰🍰
" ================================================================================================
Plug 'preservim/nerdtree'

"下列插件需要在IDEA中下载
"ideaVim
"IdeaVim-EasyMotion
"IdeaVimExtension
"which-key
"CodeGlance Pro
"TranslateAction



" ================================================================================================
" 🐧🐧🐧 Basic settings 🐧🐧🐧
" ================================================================================================
"设置在光标距离窗口顶部或底部一定行数时，开始滚动屏幕内容的行为
set scrolloff=10

"--递增搜索功能：在执行搜索（使用 / 或 ? 命令）时，
"Vim 会在您输入搜索模式的过程中逐步匹配并高亮显示匹配的文本。
set incsearch

"--在搜索时忽略大小写
set ignorecase

"--将搜索匹配的文本高亮显示
set hlsearch

"--设置相对行号 和 当前行的绝对行号
set number relativenumber

"--设置返回normal模式时回到英文输入法
set keep-english-in-normal

"语法高亮
syntax on
"显示光标所在位置的行号和列号
set ruler
set wrap                      "自动折行
set shiftwidth=3
set tabstop=3
set softtabstop=3
set expandtab                  "将tab替换为相应数量空格
set smartindent
set backspace=1
set co=4
"设置匹配模式 类似当输入一个左括号时会匹配相应的那个右括号
set showmatch
set clipboard^=unnamed,unnamedplus
"set laststatus=1   "命令行为两行
"set fenc=utf-9     "文件编码
set mouse=a        "启用鼠标
"set ignorecase     "忽略大小写
set cursorline     "突出显示当前行
"set cursorcolumn   "突出显示当前列
set fdm=marker

" ================================================================================================
" 🌍🌍🌍 No Leader Keymaps 🌍🌍🌍
" ================================================================================================
"--普通模式下使用回车键，向下/向上 增加一行
"nmap <CR> o<Esc>
"nmap <S-Enter> O<Esc>

"--在普通和插入模式下，向下交换行/向上交换行
"nnoremap <C-j> :m +1<CR>
"nnoremap <C-k> :m -2<CR>
"inoremap <C-j> <Esc> :m +1<CR>gi
"inoremap <C-k> <Esc> :m -2<CR>gi

"--将 jk 映射为 <Esc>
imap jk <Esc>

"--格式化（规范化）文本，即对选定的文本进行换行或重排，适应指定的文本宽度。
"全文规范化：Ctrl+Alt+l
map Q gq
"跳转到下一个错误或警告
nmap ge <action>(GotoNextError)
"在源代码和测试代码之间快速切换
nmap gt <action>(GotoTest)
"将光标移动到上一个方法的声明处
nmap gm <action>(MethodUp)
" last changed in current buffer(file)
"跳转到当前接口或抽象类的实现处
nmap gi <action>(GotoImplementation)

"切换标签页
nmap J <action>(PreviousTab)
nmap K <action>(NextTab)

" e: Extract
" extract method/function 将选中的代码片段提取为一个独立的方法(Ctrl + Alt + M)
"vmap <leader>em <action>(ExtractMethod)
" extract constant （引入常量）的重构操作:将选中的代码片段抽取为一个常量，并自动替换选中的代码片段为新的常量引用(Ctrl + Alt + C) vmap <leader>ec <action>(IntroduceConstant)
" extract field （引入字段）的重构操作:将选中的代码片段转化为一个新的字段，并自动将选中的代码片段替换为对该字段的引用(Ctrl + Alt + F)
"vmap <leader>ef <action>(IntroduceField)
" extract variable （引入变量）的重构操作:将选中的代码片段抽取为一个新的变量，并自动替换选中的代码片段为新的变量引用(Ctrl + Alt + V)
"vmap <leader>ev <action>(IntroduceVariable)



" ================================================================================================
" ⭐️⭐️⭐️ Leader Keymaps ⭐️⭐️⭐️ =====================================
" ================================================================================================
"--将<leader>设置为 空格 键
"可自行更改，只需更改双引号内的内容即可
"推荐<leader>:  "空格"  ";"  "\"  "-"  ","
let mapleader = " "

" ================================================================================================
" 👻👻👻 Which-Key 👻👻👻
" ================================================================================================

"which-key的官方推荐配置
set which-key
set notimeout


" ================================================================================================
" 🌟🌟🌟 <leader>详细配置 🌟🌟🌟
" ================================================================================================
"========= NULL ========
"这一行为在按下<leader>后显示的,甭管就行
let g:WhichKeyDesc_LeaderKeymap= "<leader> 🌟🌟🌟LeaderKeymap🌟🌟🌟"


"========== b ==========


"========== c ==========
let g:WhichKeyDesc_CodeAndClose = "<leader>c CodeAndClose"

"关闭所有标签页
let g:WhichKeyDesc_CodeAndClose_CloseAllEditors = "<leader>ca CloseAllEditors"
nmap <leader>ca <action>(CloseAllEditors)
"关闭当前标签页
let g:WhichKeyDesc_CodeAndClose_CloseEditor = "<leader>ce CloseEditor"
nmap <leader>ce :action CloseEditor<CR>


"========== d ==========
let g:WhichKeyDesc_DeBugOrDelete= "<leader>d DebugOrDelete"
"打断点/解除断点
let g:WhichKeyDesc_DebugOrDelete_BreakPoint = "<leader>dp BreakPoint"
nmap <leader>dp <Action>(ToggleLineBreakpoint)
"调试
let g:WhichKeyDesc_DebugOrDelete_DeBug = "<leader>db DeBug"
nmap <leader>db <Action>(Debug)


"========== f ==========
let g:WhichKeyDesc_FindOrFormat = "<leader>f FindOrFormat"

"重新格式化代码，使其符合预定义的代码样式和规范 \| 优化导入语句，删除未使用的导入，并将导入语句按字母顺序进行排列
let g:WhichKeyDesc_FindOrFormat_Format = "<leader>fm Format"
nmap <leader>fm <action>(ReformatCode) \| <action>(OptimizeImports)


"========== g ==========
let g:WhichKeyDesc_GitOrGenerate = "<leader>g GitOrGenerate"

"执行版本控制（VCS）的回滚操作，将修改的代码还原到之前的版本
let g:WhichKeyDesc_GitOrGenerate_RollbackHunk = "<leader>gr RollbackHunk"
nmap <leader>gr :action Vcs.RollbackChangedLines<CR>
"生成构造器
let g:WhichKeyDesc_GitOrGenerate_GenerateConstructor = "<leader>gc GenerateConstructor"
nmap <leader>gc :action GenerateConstructor<CR>
"生成getter
let g:WhichKeyDesc_GitOrGenerate_GenerateGetter = "<leader>gg GenerateGetter"
nmap <leader>gg :action GenerateGetter<CR>
"生成setter
let g:WhichKeyDesc_GitOrGenerate_GenerateSetter = "<leader>gs GenerateSetter"
nmap <leader>gs :action GenerateSetter<CR>
"生成setter和getter
let g:WhichKeyDesc_GitOrGenerate_GenerateGetterAndSetter = "<leader>ga GenerateGetterAndSetter"
nmap <leader>ga <action>(GenerateGetterAndSetter)
"生成 equals() 和 hashcode() 的重写方法
let g:WhichKeyDesc_GitOrGenerate_GenerateEquals = "<leader>ge GenerateEquals"
nmap <leader>ge <action>(GenerateEquals)
"生成toString
let g:WhichKeyDesc_GitOrGenerate_GenerateToString = "<leader>ge GenerateToString"
nmap <leader>gt <action>(Actions.ActionsPlugin.GenerateToString)
"diff 显示文件的版本控制历史(git)
nmap <leader>gd <action>(Vcs.ShowTabbedFileHistory)
let g:WhichKeyDesc_DebugOrDelete_ShowTabbedFileHistory = "<leader>gd ShowTabbedFileHistory"


"========== i ==========
"快速查找并跳转到下一个以 ( 开始的函数或方法调用的位置️
let g:WhichKeyDesc_InsertAfterBrackets = "<leader>i InsertAfterBrackets"
nmap <leader>i f(a


"========== j ==========
"普通模式下在行尾一个分号，然后进入插入模式并在当前行的下方新建一行
let g:WhichKeyDesc_InsertSemicolon = "<leader>j InsertSemicolon"
nmap <leader>j A;<ESC>o


"========== n ==========
let g:WhichKeyDesc_NERDTreeOrNew = "<leader>n NERDTreeOrNew"

"取消搜索高亮显示(No light)
let g:WhichKeyDesc_NERDTreeOrNew_Highlight = "<leader>nl NoHighlight"
nmap <leader>nl :nohlsearch<CR>
"在当前目录新建文件夹
let g:WhichKeyDesc_NERDTreeOrNew_NewDir = "<leader>nd NewDir"
nmap <leader>nd <action>(NewDir)
"在当前目录新建类
let g:WhichKeyDesc_NERDTreeOrNew_NewClass = "<leader>nc NewClass"
nmap <leader>nc <action>(NewClass)


"========== r ==========
let g:WhichKeyDesc_RunOrRe = "<leader>r RunOrRe"

"运行当前编辑器中的文件或类(Shift + F10)
let g:WhichKeyDesc_RunOrRe_RunCalss = "<leader>ru RunClass"
nmap <leader>ru :action RunClass<CR>
"重新运行最近一次运行的程序或测试(Ctrl+Shift + F10)
let g:WhichKeyDesc_RunOrRe_ReRun = "<leader>rr ReRun"
nmap <leader>rr <action>(Rerun)
"重新运行最近一次运行的测试（Unit Tests）(Ctrl + Shift + F10)
let g:WhichKeyDesc_RunOrRe_ReRunTests = "<leader>rt ReRunTests"
nmap <leader>rt <action>(RerunTests)
"在代码中快速更改一个标识符的名称，并自动处理所有相关的引用(Shift + F6)
let g:WhichKeyDesc_RunOrRe_Rename = "<leader>rn Rename"
map <leader>rn <action>(RenameElement)

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
