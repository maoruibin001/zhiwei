# 知 微
## 项目介绍
* 前端使用react + redux + webpack + 单双混合页面以及其他。
* 后端采用nginx + nodejs。
* 本项目旨在打造一个开源学习平台，前期主攻前端方向，有兴趣的朋友可以一起搞
* 本项目预计明年三月左右上线。

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

## 单页面应用的写法参考

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
