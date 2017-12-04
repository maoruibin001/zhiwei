/**
 * Created by lenovo on 2017/12/1.
 */
import React, {Component} from 'react';
import $ from 'jquery';

import '../../../styles/login/login.css';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        phone: '2324',
        password: '234243'
      }
    }
  }
  login(e) {
    e.preventDefault();
    console.log(this.refs.phone.value);
    console.log(this.refs.pwd.value);
  }
  render() {
    return <div className="login-form">
      <form autoComplete="off">
        <div className="group-inputs">
          <div className="name input" style={{display: 'none'}}>
            <input type="text" placeholder="姓名"/>
          </div>
          <div className="phone input">
            <input ref="phone"  type="text" defaultValue={this.state.userInfo.phone} placeholder="手机号"/>
          </div>
          <div className="password input">
            <input ref="pwd"  type="password" defaultValue={this.state.userInfo.password} placeholder="密码（不少于6位）"/>
          </div>
          <div className="button-login">
            <button onClick={this.login.bind(this)}>登录</button>
          </div>
        </div>
      </form>
      <p className="agreement-tip">
        <a href="">手机验证码登录</a>
      </p>
      <div className="qrcode">
        <button className="qucode-toggleButton">下载知乎</button>
      </div>
    </div>
  }
}

export default Login;