/**
 * Created by lenovo on 2017/12/8.
 * 单页面示例
 */
import React from 'react';
import { render } from 'react-dom'

import {BrowserRouter as Router, Route, IndexRoute, Link} from 'react-router-dom';

// 必须用link才能正确匹配路由，使用地址栏直接输入则不行

const App = () => {
  return <div>
    <h1>hello i am App</h1>
    <Link to="/hot">热门</Link>
  </div>
};

const Hot = () => {
  return <div>
    <h1>hello i am Hot</h1>
    <Link to="/zhuanlan">专栏</Link>
  </div>
};

const Zhuanlan = () => {
  return <div>
    <h1>hello i am Zhuanlan</h1>
    <Link to="/">主页</Link>
  </div>
};


render( (<Router basename="/singlePage">
  <div>
      <Route  exact path="/" component={App}></Route>
      <Route path="/hot" component={Hot} ></Route>
      <Route path="/zhuanlan" component={Zhuanlan}></Route>
  </div>
</Router>), document.getElementById('app'))