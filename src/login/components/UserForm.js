/**
 * Created by lenovo on 2017/12/1.
 * 登录页
 */
import React, {Component} from 'react';

import '../../../styles/base.css';
import '../../../styles/login/userform.css';
import Login from './Login';
import Register from './Register';

// 登陆页组件
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegster: true
    }
  }
  // 切换为注册
  registerTab(e) {
    e.preventDefault();
    this.state.isRegster ? this.setState(null) : this.setState({
      isRegster: true
    })
  }
  // 切换为登陆
  loginTab(e) {
    e.preventDefault();
    !this.state.isRegster ? this.setState(null) : this.setState({
      isRegster: false
    })
  }
  render() {
    return <div className="login_outer">
        <div className="login_box">
          <div className="login-header">
            <h1>知 微</h1>
            <h2>程序员的开源提升平台</h2>
          </div>
          <div className="login-content">
            <div className="login-tab-navs">
              <div className="navs-slider">
                  <a className={this.state.isRegster ? 'active': ''} onClick={this.registerTab.bind(this)}>注册</a>
                  <a className={!this.state.isRegster ? 'active': ''} onClick={this.loginTab.bind(this)}>登录</a>
              </div>
            </div>
            {this.state.isRegster ? <Register/> : <Login/>}
          </div>
        </div>
    </div>
  }
}

export default UserForm;