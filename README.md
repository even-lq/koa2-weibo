# koa2-weibo

使用koa2开发仿微博的服务端项目

## ejs

### 变量

如果不确定变量是否存在却需要渲染时，需要加上locals前缀，否则渲染时会报错

### 组件

每个组件是一个ejs文件，文件内使用模板引擎，同时也可以使用script标签（因为ejs最终产出的是html）

## session

### session存储在nodejs内存中的问题

- 操作系统会限制一个进程（nodejs）的最大可用内存，单开一个进程的内存量不满足项目的需求，如果内存占用量变大时会影响性能。

- 线上环境是多进程的，而进程之间互相隔离，用户每次登录时访问的nodejs进程可能不一样，会造重复登录的bug。

### 为什么redis适合存储session

- session访问频繁，对性能要求极高
- session可不考虑断电丢失数据的问题(内存的硬伤)
- session数据量不会太大(相比于mysq|中存储的数据)

### cookie session redis 通信

以登录为例：

用户输入正确的账号密码 => 设置cookie（key：自定义，value：插件创建的唯一值唯一值）、设置session并存储至redis中（key：用户cookie对应的value，value：自定义内容）

设置cookie、设置session：

```js
cookie： {
    'weibo.sid'：插件创建的唯一值（value）
}
session： {
    用户cookie对应的value：session内容
}
```

下次访问时查询redis即可自动登录