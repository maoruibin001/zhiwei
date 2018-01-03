/**
 * Created by lenovo on 2017/12/1.
 * 注册表单
 */
import React, {Component} from 'react';
import '../../../styles/login/register.css';
import Valid from '../../utils/valid/valid';
import Utils from '../../utils/utils';
// 校验规则
const FIELDRULLS = [
  {
    require: true,
    name: 'name',
    label: '姓名'
  },
  {
    require: true,
    name: 'phone',
    rex: /\d{11}/,
    emptyErr: '电话号码不能为空',
    err: '请输入正确的电话号码'
  },
  {
    require: true,
    name: 'pwd',
    label: '密码'
  },
];

// 注册表单
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      formData: {
        name: '',
        phone: '',
        pwd: ''
      }
    }
  }
   download() {
    this.setState({
      name: 'mao'
    })
  }
// 点击注册按钮
  register(e) {
    e.preventDefault();

    const formData = {
      name: this.refs.register_name.value,
      phone: this.refs.register_phone.value,
      pwd: this.refs.register_pwd.value
    };
    // 校验提交数据
    let invalids = Valid.check(FIELDRULLS, formData, this.refs, {
      position: 'absolute',
      filled: 'register_',
    });
    if (invalids) return;
    Utils.ajax('register', formData,  (err, model) => {
      if (err) {
        alert(err);
      } else {
        location.href = model.url;
      }
    });
  }

  render() {
    return <div className="register-form">
      <form action="/los/register" method="POST" ref="register_form">
        <div className="group-inputs">
          <div className="name input">
            <input ref="register_name" name="name" type="text" placeholder="姓名"/>
          </div>
          <div className="phone input">
            <input ref="register_phone" name="phone" type="text" placeholder="手机号"/>
          </div>
          <div className="passworld input">
            <input ref="register_pwd" type="password" name="pwd" placeholder="密码（不少于6位）"/>
          </div>
          <div className="button-register">
            <button onClick={this.register.bind(this)}>注册知微</button>
          </div>
        </div>
      </form>
      <p className="agreement-tip">
        点击「注册」按钮，即代表你同意 <a href="">《知微协议》</a>
      </p>
      <div className="qrcode">
        <button className="qucode-toggleButton" onClick={this.download.bind(this)}>下载知微</button>
      </div>
    </div>
  }
}

export default Register;