# 知 微
## 项目介绍
* 前端使用react + redux + webpack + 单双混合页面以及其他。
* 后端采用nginx + nodejs。
* 本项目旨在打造一个开源学习平台，前期主攻前端方向，有兴趣的朋友可以一起搞
* 关于项目的详细介绍，大家可以参考这篇文章：http://blog.csdn.net/weixin_38150378/article/details/78737707
* 知微app地址：https://github.com/maoruibin001/zhiwei-app

## 目录结构
```
+build  项目构建配置目录
+src    源代码目录
+test   单元测试目录
+dist   发布代码生成目录
+example 测试例子目录
+styles 样式目录
+ www   服务器部署相关api及服务目录

```

## 注意事项
* JS统一使用ES6语法
* 第三方库，例如react、react-dom等需要配置在package.json和webpack打包中，在打包时自动引入

## 第三方库参考文档
* webpack https://webpack.js.org/
* react https://hulufei.gitbooks.io/react-tutorial/content/introduction.html
* react-dom https://reactjs.org/docs/react-dom.html
* redux https://redux.js.org/docs/introduction/

## 单页面实例
* 参考/singlePage里面有对应的react-router单页面示例
* 建议参考网址https://www.cnblogs.com/dudeyouth/p/6617059.html

## 依赖安装
* 安装node
* 安装mysql
* 安装全局的npm
* 安装工程依赖
```
cd path/to/project
npm install
```

## 打包
* 开发环境实时打包, 并启动本地热更新热替换。
```
npm start
```

* 上线打包，代码将生成到dist目录，并且对代码进行压缩混淆、inline等
```
npm run build
```
## 项目安装软件说明
# mysql
* 要本地安装mysql并且创建一个user_info的database 用户名:root 密码:123456 然后npm start就可以运行（项目会在初始化的时候自动创建user_base_info的表）。如果你不是这样配置，请在www/utils/database/databaseOperation.js文件的query方法中自行修改。mysql安装使用可以参考网站：https://jingyan.baidu.com/article/cd4c2979033a17756f6e6047.html
# redis
* 要本地安装redis并且保持启动, 安装使用参考http://blog.csdn.net/jinwufeiyang/article/details/52156817。redis端口为6379，redis主机：'127.0.0.1' redis内容过期时间：默认设置为10分钟过期。如果要修改redis相关配置，请移步www/utils/utils.js进行修改。