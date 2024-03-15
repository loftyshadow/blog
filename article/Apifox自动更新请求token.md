# Apifox自动更新请求token
## 配置环境变量

![](img/2024-03-14-18-29-29.png)

```text
LOGIN_USERNAME 登录用户名
LOGIN_PASSWORD 登录密码
LOGIN_ADDRESS 登录请求地址
ACCESS_TOKEN 获取到的token
ACCESS_TOKEN_EXPIRES token过期时间
```

可以设置浏览器离线查看具体登录请求

![](img/2024-03-15-09-32-46.png)


## 配置全局前置操作

![](img/2024-03-14-18-31-27.png)

## 全局刷新脚本

![](img/2024-03-14-18-34-23.png)

```js
// 定义发送登录接口请求方法
function sendLoginRequest() {
  // 获取环境里的 前置URL  
  const loginAddress = pm.environment.get("LOGIN_ADDRESS");

  // 登录用户名，这里从环境变量 LOGIN_USERNAME 获取，也可以写死（但是不建议）  
  const username = pm.environment.get("LOGIN_USERNAME");
  // 登录密码，这里从环境变量 LOGIN_PASSWORD 获取，也可以写死（但是不建议）  
  const password = pm.environment.get("LOGIN_PASSWORD");
  // 构造一个 POST x-www-form-urlencoded 格式请求。这里需要改成你们实际登录接口的请求参数。  
  const loginRequest = {
    url: loginAddress,
    method: "POST",

    // body 为 json 格式
    header: {
      "Content-Type": "application/json", // 注意：header 需要加上 Content-Type
    },
    body: {
      mode: 'raw',// 此处为 raw
      raw: JSON.stringify({ account: username, password: password }), // 序列化后的 json 字符串
    }
  };
  // 发送请求。  
  // pm.sendrequest 参考文档: https://www.apifox.cn/help/app/scripts/api-references/pm-reference/#pm-sendrequest  
  pm.sendRequest(loginRequest, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      // 读取接口返回的 json 数据。      
      // 如果你的 token 信息是存放在 cookie 的，可以使用 res.cookies.get('token') 方式获取。      
      // cookies 参考文档：https://www.apifox.cn/help/app/scripts/api-references/pm-reference/#pm-cookies      
      const jsonData = res.json();
      // 将 accessToken 写入环境变量 ACCESS_TOKEN      
      pm.environment.set("ACCESS_TOKEN", jsonData.data);
      // 将 accessTokenExpires 过期时间写入环境变量 ACCESS_TOKEN_EXPIRES  
      pm.environment.set(
        "ACCESS_TOKEN_EXPIRES",
        jsonData.data.accessTokenExpires
      );
    }
  });
}

// 获取环境变量里的 ACCESS_TOKEN
const accessToken = pm.environment.get("ACCESS_TOKEN");

// 获取环境变量里的 ACCESS_TOKEN_EXPIRES
const accessTokenExpires = pm.environment.get("ACCESS_TOKEN_EXPIRES");

// 如 ACCESS_TOKEN 没有值，或 ACCESS_TOKEN_EXPIRES 已过期，则执行发送登录接口请求
if (
  !accessToken || (accessTokenExpires && new Date(accessTokenExpires) <= new Date())
) {
  sendLoginRequest();
}
```

## 设置全局请求前增加请求头token

![](img/2024-03-15-09-17-06.png)

![](img/2024-03-15-09-17-40.png)
