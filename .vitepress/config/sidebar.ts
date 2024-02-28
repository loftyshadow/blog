import { Sidebar } from 'vitepress/types/default-theme'

export const sidebar: Sidebar = {
  '/mysql/': [
    {
      text: 'MySQL的MVCC',
      link: '/mysql/MySQL的MVCC.md',
    },
    {
      text: 'MySQL的Explain执行计划',
      link: '/mysql/MySQL的Explain执行计划.md',
    },
    {
      text: 'MySQL索引失效',
      link: '/mysql/MySQL索引失效.md',
    },
    {
      text: 'MySQL优化',
      link: '/mysql/MySQL优化.md',
    }
  ],
  '/docker/': [
    {
      text: '安装Docker',
      link: '/docker/安装Docker.md',
    },
    {
      text: '安装docker-compose',
      link: '/docker/安装Docker-compose.md',
    },
    {
      text: 'Docker安装Mysql.md',
      link: '/docker/Docker安装Mysql.md',
    },
    {
      text: 'Docker安装Redis.md',
      link: '/docker/Docker安装Redis.md',
    },
    {
      text: 'Docker安装mongodb.md',
      link: '/docker/Docker安装mongodb.md',
    },
    {
      text: 'Docker安装Nacos',
      link: '/docker/Docker安装Nacos.md',
    },
    {
      text: 'Docker安装PostgreSQL',
      link: '/docker/Docker安装PostgreSQL.md',
    },
    {
      text: 'Docker安装RabbitMQ',
      link: '/docker/Docker安装RabbitMQ.md',
    },
    {
      text: 'Docker安装ElasticSearch',
      link: '/docker/Docker安装ElasticSearch.md',
    },
    {
      text: 'Docker安装Kibana',
      link: '/docker/Docker安装Kibana.md',
    },
    {
      text: 'Docker安装Canal',
      link: '/docker/Docker安装Canal.md',
    },
    {
      text: 'Docker安装ExcaliDraw',
      link: '/docker/Docker安装ExcaliDraw.md',
    },
  ],
  '/idea/': [
    {
      text: '模板Live Templates',
      link: '/idea/Idea的liveTemplates整理.md',
    },
    {
      text: '后缀补全Postfix Completion',
      link: '/idea/Idea后缀补全Postfix Completion整理.md',
    },
    {
      text: '注册表Registry配置',
      link: '/idea/Idea注册表配置整理.md',
    },
    {
      text: 'Idea插件整理',
      link: '/idea/Idea插件整理.md',
    },
    {
      text: 'IdeaVim配置',
      link: '/idea/IdeaVim配置.md',
    },
  ],
  '/wsl/': [
    {
      text: 'WSL安装整理',
      link: '/wsl/WSL安装整理.md',
    },
    {
      text: 'WSL支持systemctl命令',
      link: '/wsl/WSL支持systemctl命令.md',
    },
    {
      text: 'WSL实现桥接网络并固定IP地址',
      link: '/wsl/WSL实现桥接网络并固定IP地址.md',
    },
    {
      text: 'WSL已知错误整理',
      link: '/wsl/已知错误整理.md',
    },
  ],
  '/rust/': [
    {
      text: 'Rust环境安装',
      link: '/rust/rust环境安装.md',
    },
    {
      text: 'Rust相关书籍',
      link: '/rust/rust相关书籍.md',
    },
  ],
  '/article/': [ 
    {
      text: 'Zsh安装',
      link: '/article/Zsh安装.md'
    },
    {
      text: 'MSYS2安装gcc、gmake',
      link: '/article/MSYS2安装gcc、gmake.md'
    }

  ],
  '/java/': [ 
      {
          text: 'Java',
          collapsed: false,
          items: [

              {
                  text: '线程池相关',
                  link: '/java/线程池相关.md',
              },
              {
                  text: '常用的JVM参数和命令',
                  link: '/java/常用的JVM参数和命令.md',
              },
              {
                  text: 'ThreadLocal整理',
                  link: '/java/ThreadLocal整理.md',
              },
          ]
      },
      {
          text: 'Redis',
          collapsed: false,
          items: [
              {
                  text: 'Redis内存淘汰策略',
                  link: '/java/Redis内存淘汰策略.md',
              },

          ]
      },
      {
          text: 'ElasticSearch',
          collapsed: false,
          items: [
              {
                  text: 'ES自定义ik分词配置',
                  link: '/java/ES自定义ik分词配置.md',
              },
          ]
      },
      {
          text: 'Nacos',
          collapsed: false,
          items: [
              {
                  text: 'Nacos做配置中心',
                  link: '/java/Nacos做配置中心.md',
              },
          ]
      },
      {
          text: 'Spring',
          collapsed: false,
          items: [

              {
                  text: 'Sping解决循环依赖',
                  link: '/java/Sping解决循环依赖.md',
              },
              {
                  text: 'Spring的事务及传播机制',
                  link: '/java/Spring的事务及传播机制.md',
              },
          ]
      },
      // {
      //     text: 'RabbitMQ',
      //     items: [
      //
      //         {
      //             text: 'RabbitMQ防止消息丢失',
      //             link: '/java/RabbitMQ防止消息丢失.md',
      //         },
      //     ]
      // }
  ],
  '/utils/': [
    {
      text: '计算工具类ArithUtils',
      link: '/utils/计算工具类ArithUtils.md',
    },
    {
      text: '日期工具类DateUtils',
      link: '/utils/日期工具类DateUtils.md',
    },
    {
      text: '序列化工具类JacksonUtils',
      link: '/utils/序列化工具类JacksonUtils.md',
    },
    {
      text: 'SpringContextUtils',
      link: '/utils/SpringContextUtils.md',
    },
    {
      text: 'ThreadLocalUtils',
      link: '/utils/ThreadLocalUtils.md',
    },
  ],
  '/leetcode/': [
    {
      text: '一维动态规划',
      collapsed: false,
      activeMatch: '/leetcode/one-dimensionalDynamicProgramming/',
      items: [
        {
          text: '爬楼梯',
          link: '/leetcode/one-dimensionalDynamicProgramming/爬楼梯climbStairs.md',
        },
        {
          text: '打家劫舍',
          link: '/leetcode/one-dimensionalDynamicProgramming/打家劫舍rob.md',
        },
      ],
    },
    {
      text: '二分查找',
      collapsed: false,
      activeMatch: '/leetcode/binarySearch/',
      items: [
        {
          text: '搜索插入位置',
          link: '/leetcode/binarySearch/搜索插入位置searchInsert.md',
        },
        {
          text: '寻找峰值',
          link: '/leetcode/binarySearch/寻找峰值findPeakElement.md',
        },
      ],
    },
    {
      text: '双指针',
      collapsed: false,
      activeMatch: '/leetcode/dualPointers/',
      items: [
        {
          text: '验证回文串',
          link: '/leetcode/dualPointers/验证回文串isPalindrome.md',
        },
        {
          text: '是否子序列',
          link: '/leetcode/dualPointers/isSubsequence.md',
        },
      ],
    },
  ],
}
