[actionList](./ideaActionList.md)

```text
" =========插件配置 (Plugins config) https://github.com/JetBrains/ideavim/wiki/IdeaVim-Plugins========
" NerdTree
Plug 'preservim/nerdtree'
" 高亮插件
Plug 'machakann/vim-highlightedyank'
" 支持[surround](https://github.com/tpope/vim-surround) vi'/ci'/di'/cs'" 快速选择范围内内容
Plug 'tpope/vim-surround'
"set multiple-cursors
" 支持[commentary](https://github.com/tpope/vim-commentary) gcc/gci{/gcw 生成注释
Plug 'tpope/vim-commentary'
" 支持[argtextobj](https://www.vim.org/scripts/script.php?script_id=2699)  cia/dia/caa/daa 快捷修改参数
Plug 'vim-scripts/argtextobj.vim'
" 支持[easymotion](https://plugins.jetbrains.com/plugin/13360-ideavim-easymotion/)
Plug 'easymotion/vim-easymotion'

"===============================================
let g:argtextobj_pairs="[:],(:),<:>"

" =============Base settings===========
"设置在光标距离窗口顶部或底部一定行数时，开始滚动屏幕内容的行为
set scrolloff=6

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
"重构保持模式
set idearefactormode=keep
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

:set keep-english-in-normal
:set keep-english-in-normal-and-restore-in-insert
"======================map映射==========
"将 jk 映射为 <Esc>
imap jk <Esc>
nmap <c-o> <action>(Back)
nmap <c-i> <action>(Forward)
" Goto
"跳转到下一个错误或警告
nmap ]e <action>(GotoNextError)
let g:WhichKeyDesc_GotoNextError = "]e 跳转到下一个错误或警告"
"跳转到上一个错误或警告
map [e <Action>(GotoPreviousError)
let g:WhichKeyDesc_GotoPrevError = "[e 跳转到上一个错误或警告"
"在源代码和测试代码之间快速切换
nmap gt <action>(GotoTest)
"将光标移动到上一个方法的声明处
nmap [m <action>(MethodUp)
"将光标移动到下一个方法的声明处
nmap ]m <action>(MethodDown)
"跳转到当前接口或抽象类的实现处
nmap gi <action>(GotoImplementation)
"跳转到声明
map gd <Action>(GotoDeclaration)
"hover
map gh <Action>(QuickJavaDoc)
"跳转到父方法
map gs <Action>(GotoSuperMethod)
"跳转到使用
map gr <Action>(ShowUsages)
"查找所以引用
map gR <Action>(FindUsages)

"跳转到下一个改变
map ]c <action>(VcsShowNextChangeMarker)
map [c <action>(VcsShowPrevChangeMarker)
" 切换标签页
nmap H <action>(PreviousTab)
nmap L <action>(NextTab)
" 代码折叠/展开 (Code fold/expand)
map zc <Action>(CollapseRegion)
map zo <Action>(ExpandRegion)
map zC <Action>(CollapseAllRegions)
map zO <Action>(ExpandAllRegions)

map J ^
map K $
"==================leader映射============
" 启用whichkey
set which-key
set notimeout
"leader映射
let mapleader = " "
let g:WhichKeyDesc_LeaderKeymap= "<leader> 🦝LeaderKeymap🦝"
" 显示延迟
let g:WhichKey_DefaultDelay = 500
" 输入未配置按键直接关闭窗口
let g:WhichKey_ProcessUnknownMappings = "false"
" which-key颜色
let g:WhichKey_KeyColor = "blue"

nmap <leader>1 <Action>(GoToTab1)
nmap <leader>2 <Action>(GoToTab2)
nmap <leader>3 <Action>(GoToTab3)
nmap <leader>4 <Action>(GoToTab4)
nmap <leader>5 <Action>(GoToTab5)
nmap <leader>6 <Action>(GoToTab6)
nmap <leader>7 <Action>(GoToTab7)
nmap <leader>8 <Action>(GoToTab8)
nmap <leader>9 <Action>(GoToTab9)
"复制到该行最后
nmap <leader>a A<Esc>p
let g:WhichKeyDesc_AppendToLineEnd = "<leader>a 复制到该行最后"
let g:WhichKeyDesc_Buffer = "<leader>b 标签页相关"
"关闭当前标签页
nmap <leader>bd :action CloseEditor<CR>
let g:WhichKeyDesc_CloseEditors = "<leader>bd 关闭当前标签"
"关闭除当前标签外的所有标签
nmap <leader>bo <action>(CloseAllEditorsButActive)
let g:WhichKeyDesc_CloseAllEditorsButActive = "<leader>bo 关闭除当前标签外的所有标签"
"关闭所有标签
nmap <leader>ba <action>(CloseAllEditors)
let g:WhichKeyDesc_CloseAllEditors = "<leader>ba 关闭所有标签"
"固定当前标签页
nmap <leader>bp <action>(PinActiveEditorTab)
let g:WhichKeyDesc_PinEditors = "<leader>bp 固定当前标签"
let g:WhichKeyDesc_Choose = "<leader>c 选择相关"
"选择运行/debug
nmap <leader>cr <action>(RunConfiguration)
let g:WhichKeyDesc_RunConfiguration = "<leader>cr 选择运行/debug"
"使焦点转移到 NERDTree 窗口
map <leader>e :NERDTreeFocus<CR>
let g:WhichKeyDesc_NERDTreeFocus = "<leader>e 打开文件目录"
map <leader>E <action>(SelectInProjectView)
let g:WhichKeyDesc_SelectInProjectView = "<leader>E 打开目录树锁定当前文件"
"extract method/function 将选中的代码片段提取为一个独立的方法(Ctrl + Alt + M)
vmap <leader>em <action>(ExtractMethod)
let g:WhichKeyDesc_ExtractMethod = "<leader>em 提取选中方法"
"extract constant （引入常量）的重构操作:将选中的代码片段抽取为一个常量，并自动替换选中的代码片段为新的常量引用(Ctrl + Alt + C)
vmap <leader>ec <action>(IntroduceConstant)
let g:WhichKeyDesc_IntroduceConstant = "<leader>ec 提取常量"
"extract field （引入字段）的重构操作:将选中的代码片段转化为一个新的字段，并自动将选中的代码片段替换为对该字段的引用(Ctrl + Alt + F)
vmap <leader>ef <action>(IntroduceField)
let g:WhichKeyDesc_IntroduceConstant = "<leader>ef 提取新字段"
"extract variable （引入变量）的重构操作:将选中的代码片段抽取为一个新的变量，并自动替换选中的代码片段为新的变量引用(Ctrl + Alt + V)
vmap <leader>ev <action>(IntroduceVariable)
let g:WhichKeyDesc_IntroduceVariable = "<leader>ev 提取变量"

let g:WhichKeyDesc_Debug = "<leader>d Debug相关"
"打断点/解除断点
nmap <leader>dp <Action>(ToggleLineBreakpoint)
let g:WhichKeyDesc_ToggleLineBreakpoint = "<leader>dp 设置断点"
"查看指定变量值
nmap <leader>de <Action>(QuickEvaluateExpression)
let g:WhichKeyDesc_DebugQuickEvaluateExpression = "<leader>de 查看指定变量值"
"运行到光标处
nmap <leader>dr <Action>(RunToCursor)
let g:WhichKeyDesc_DebugRunToCursor = "<leader>dr 运行到光标处"
"停止
nmap <leader>sc <Action>(Stop)
let g:WhichKeyDesc_StopClass = "sc停止运行类"
"查找
nmap <leader>sd <Plug>(easymotion-bd-f2)
let g:WhichKeyDesc_SearchTwoChar = "<leader>sd easymotion查找两个字符"
"在。。。中选择
nmap <leader>si <Action>(SelectIn)
let g:WhichKeyDesc_SelectIn = "<leader>si 在。。。中选择"
"显示所有书签
nmap <leader>sm <Action>(ShowBookmarks)
et g:WhichKeyDesc_ShowBookmarks = "显示所有书签"
let g:WhichKeyDesc_Find = "<leader>f 查找相关"
let g:WhichKeyDesc_GitAndGenerate = "<leader>g Git版本控制"
"寻找EndPoint
nmap <leader>fe <action>(GotoUrlAction)
let g:WhichKeyDesc_GotoUrlAction = "<leader>fe 寻找EndPoints"
"寻找文件
nmap <leader>ff <action>(SearchEverywhere)
let g:WhichKeyDesc_GitAndGenerate = "<leader>ff 寻找文件"
"在文件中查找
nmap <leader>fw <action>(FindInPath)
let g:WhichKeyDesc_GitAndGenerate = "<leader>fw 在文件中查找"
"生成Code
nmap <leader>gc <action>(Generate)
let g:WhichKeyDesc_GenerateCode = "<leader>gc 生成Code"
"执行版本控制（VCS）的回滚操作，将修改的代码还原到之前的版本
nmap <leader>gh <action>(Vcs.ShowTabbedFileHistory)
let g:WhichKeyDesc_ShowTabbedFileHistory = "<leader>gh 展示历史"
"版本控制（VCS）
nmap <leader>gg <action>(Git.Branches)
let g:WhichKeyDesc_ShowGitBranches = "<leader>gg 展示Git"
"Git Blame
nmap <leader>gb <action>(Annotate)
let g:WhichKeyDesc_ShowGitBlame = "<leader>gb Git Blame"
"执行版本控制（VCS）的回滚操作，将修改的代码还原到之前的版本
nmap <leader>gr <action>(Vcs.RollbackChangedLines)
let g:WhichKeyDesc_VcsRollbackChangedLines = "<leader>gr 回滚修改"
"HotSwap
nmap <leader>hs <action>(UpdateRunningApplication)
let g:WhichKeyDesc_UpdateRunningApplication = "<leader>hs HotSwap"
"关闭活动标签
nmap <leader>ha <action>(HideActiveWindow)
let g:WhichKeyDesc_HideActiveWindow = "<leader>ha 关闭活动标签"
"内联方法
nmap <leader>il <action>(Inline)
let g:WhichKeyDesc_Inline = "<leader>il 内联方法"
"展示JsonTree
nmap <leader>jt <action>(JsonAssistant.Action.JsonStructureAction)
let g:WhichKeyDesc_Inline = "<leader>il 内联方法"
let g:WhichKeyDesc_NerdTree = "<leader>n NerdTree相关和取消高亮"
"在当前目录新建类
nmap <leader>nc <action>(NewClass)
let g:WhichKeyDesc_NERDTreeOrNew_NewClasd = "<leader>nc 在当前目录新建类"
"在当前目录新建文件夹
nmap <leader>nd <action>(NewDir)
let g:WhichKeyDesc_NERDTreeOrNew_NewDir = "<leader>nd 在当前目录新建文件夹"
"取消搜索高亮显示(No light)
nmap <leader>nh :nohlsearch<CR>
let g:WhichKeyDesc_NoHighlight = "<leader>nh 取消搜索高亮显示"
"文件资源管理器中定位当前编辑文件所在的节
map <leader>o :NERDTreeFind<CR>
let g:WhichKeyDesc_NERDTreeFind = "<leader>o 定位当前编辑文件所在的节点"
"浮动显示目录结构
map <leader>ol <action>(FileStructurePopup)
let g:WhichKeyDesc_FileStructurePopup = "<leader>ol 浮动显示目录结构"
"复制到下一行
nmap <leader>p o<Esc>p
let g:WhichKeyDesc_CopyToNextLine = "<leader>ol 复制到下一行"
let g:WhichKeyDesc_RunRollBackAndRename = "<leader>r 运行、回滚和重命名"
"运行当前编辑器中的文件或类
nmap <leader>rc <action>(RunClass)
let g:WhichKeyDesc_RunClass = "<leader>rc 运行当前编辑器中的文件或类"
"复制当前位置
nmap <leader>rf <action>(CopyReference)
let g:WhichKeyDesc_CopyReference = "<leader>rf 复制当前位置"
"最近打开项目
nmap <leader>rp <Action>(ManageRecentProjects)
let g:WhichKeyDesc_ManageRecentProjects = "<leader>rp 最近打开项目"
"重新Debug最近一次运行的程序或测试
nmap <leader>rd <action>(Debug)
let g:WhichKeyDesc_Debug = "重新Debug最近一次运行的程序或测试"
"重新运行最近一次运行的程序或测试(Ctrl+Shift + F10)
nmap <leader>rr <action>(Rerun)
let g:WhichKeyDesc_Rerun = "<leader>rr 重新运行最近一次运行的程序或测试"
"重新运行最近一次运行的测试（Unit Tests）(Ctrl + Shift + F10)
nmap <leader>rt <action>(RerunTests)
let g:WhichKeyDesc_RerunTests = "<leader>rt 重新运行最近一次运行的测试（Unit Tests）"
"在代码中快速更改一个标识符的名称，并自动处理所有相关的引用(Shift + F6)
map <leader>rn <action>(RenameElement)
let g:WhichKeyDesc_RenameElement = "<leader>rn 在代码中快速更改一个标识符的名称，并自动处理所有相关的引用"
let g:WhichKeyDesc_Split = "<leader>s 分屏相关"
" 分屏 垂直/水平/关闭 (Pane vertically split/horizontally split/close)
map <leader>sv <Action>(SplitVertically)
let g:WhichKeyDesc_SplitVertically = "<leader>sv 分屏 垂直"
map <leader>sh <Action>(SplitHorizontally)
let g:WhichKeyDesc_SplitHorizontally = "<leader>sh 分屏 水平"
" 打开终端并进入项目根目录 (ActivateTerminal with project root dir)
map <leader>tt <Action>(ActivateTerminalToolWindow)
let g:WhichKeyDesc_ActivateTerminalToolWindow = "<leader>tt 打开终端并进入项目根目录"
"翻译选中文字
map <leader>ts <Action>(Translation.EditorTranslateAction)
let g:WhichKeyDesc_Translate = "<leader>ts 翻译选中文字"
let g:WhichKeyDesc_Window = "<leader>w Window相关"
" 分屏切换
map <leader>wj <Action>(PrevSplitter)
let g:WhichKeyDesc_NextSplitter = "<leader>wj 分屏切换"
map <leader>wk <Action>(NextSplitter)
let g:WhichKeyDesc_PrevSplitter = "<leader>wk 分屏切换"
" zen-mode
nmap <leader>z <Action>(ToggleZenMode)
let g:WhichKeyDesc_ToggleZenMode = "<leader>z 禅模式"


"========================sethandler
sethandler <C-2> a:ide
sethandler <c-s-2> a:ide
sethandler <c-6> a:ide
sethandler <c-s-6> a:ide
sethandler <c-a> a:ide
sethandler <c-b> a:ide
sethandler <c-e> a:ide
sethandler <c-f> a:ide
sethandler <c-g> a:ide
sethandler <c-h> a:ide
sethandler <c-j> a:ide
sethandler <c-k> a:ide
sethandler <c-l> a:ide
sethandler <c-m> a:ide
sethandler <c-n> a:ide
sethandler <c-p> a:ide
sethandler <c-q> a:ide
sethandler <c-r> a:ide
sethandler <c-s> a:ide
sethandler <c-t> a:ide
sethandler <c-w> a:ide
sethandler <c-x> a:ide
sethandler <c-y> a:ide
sethandler <c-\> a:ide
sethandler <c-[> a:ide
sethandler <c-]> a:ide
sethandler <C-;> a:ide
sethandler <A-P> a:ide
sethandler <C-S-;> a:ide
sethandler <c-v> a:ide
sethandler <c-c> a:ide
sethandler <C-CR> a:ide
sethandler <S-CR> a:ide
sethandler <A-CR> a:ide

sethandler <c-d> a:vim
sethandler <c-u> a:vim
sethandler <c-o> a:vim
sethandler <c-i> a:vim
```
