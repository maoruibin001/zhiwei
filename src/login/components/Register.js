/**
 * Created by lenovo on 2017/12/1.
 */
import React, {Component} from 'react';
import '../../../styles/login/register.css';
import $ from 'jquery';
import Valid from '../../components/valid/valid';

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

function serializeData(data) {
  return serialize(data, {
    isJSON:true
  });
}

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
  register(e) {
    e.preventDefault();

    const formData = {
      name: this.refs.register_name.value,
      phone: this.refs.register_phone.value,
      pwd: this.refs.register_pwd.value
    }
    let invalids = Valid.check(FIELDRULLS, formData, this.refs, {
      position: 'absolute',
      filled: 'register_',
    });

    console.log('invalids: ', invalids);
    if (invalids) return;
    $.ajax({
      url: '/los/register',
      type: 'post',
      data: formData,
      success: (data) => {
        this.setState({
          name: data.name
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
  render() {
    return <div className="register-form">
      <form action="">
        <div className="group-inputs">
          <div className="name input">
            <input ref="register_name" type="text" placeholder="姓名"/>
          </div>
          <div className="phone input">
            <input ref="register_phone" type="text" placeholder="手机号"/>
          </div>
          <div className="passworld input">
            <input ref="register_pwd" type="password" placeholder="密码（不少于6位）"/>
          </div>
          <div className="button-register">
            <button onClick={this.register.bind(this)}>注册知乎</button>
          </div>
        </div>
      </form>
      <p className="agreement-tip">
        点击「注册」按钮，即代表你同意 <a href="">《知乎协议》</a>
      </p>
      <div className="qrcode">
        <button className="qucode-toggleButton">下载知乎</button>
      </div>
    </div>
  }
}

export default Register;