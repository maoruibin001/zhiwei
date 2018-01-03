/**
 * Created by lenovo on 2017/12/7.
 * 头部组件
 */
import React, {Component} from 'react';
import '../../styles/index/header.css';

import UserCard from './UserCard';

import Utils from '../utils/utils';

// 登录时显示的组件
class Logined extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserCard: false,
    }
  }

  render() {
    return <ul className="logined">
      <li className="download"><a className="btn_empty">下载APP</a></li>
      <li className="notify"><a className="notice"><img src="/images/notice.png"/></a></li>
      <li className="user-picture" onMouseEnter={() => this.setState({
        showUserCard: true
      })} onMouseLeave={() => this.setState({
        showUserCard: false
      })}>
        <a className="picture" ><img src={this.props.userInfo.imgUrl}/></a>
        {this.state.showUserCard ? <UserCard userInfo={this.props.userInfo}/> : null}
      </li>
    </ul>
  }
}

// 未登录显示的组件
class UnLogined extends Component {
  render() {
    return <ul className="unlogined">
      <li><a className="btn_empty">下载APP</a></li>
      <li><a href="/login">登录/注册</a></li>
    </ul>
  }
}

const listItem = [
  {id: '0', text: '技术分享', isActive: false, url: '/share'},
  {id: '1', text: '技术资讯', isActive: false, url: '/info'},
  {id: '2', text: '开源', isActive: false, url: '/open'},
  {id: '3', text: '程序人生', isActive: false, url: '/life'},
]
// 头部组件
class Header extends Component {
  componentDidMount() {
    let path = location.pathname;
    if (!path) return;
     let item = this.state.listItem.filter(e => e.url === path);
     if (item.length > 0) {
       this.handleListItem(item[0]);
     } else {
       this.handleListItem({})
     }
  }

  constructor(props) {
    super(props);
    this.getUserInfo();
    this.state = {
      userInfo: null,
      listItem: listItem,
      activeItem: {}
    }
  }

  getUserInfo() {
    Utils.ajax('user', null, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({'userInfo': data});
    });
  }
  handleListItem(item) {
    if (!item) {
      this.setState({
        activeItem: {}
      });
      return;
    }

    if (item.id === this.state.activeItem.id) return;

    let listItem = this.state.listItem.map(e => {
      e.isActive = e.id === item.id;
      if (e.isActive) {
        this.setState({
          activeItem: e
        })
      }
      return e;
    });
    this.setState({
      listItem: listItem
    });

  }
  showItem(item) {
    if (item.id === this.state.activeItem.id) return;
    window.location.href = item.url;
  }
  render() {
    return <div>
      <div className="header">
        <div className="logo">
          <a href="/index" target="_self" title="首页">
            <img src="/images/logo.png" alt=""/>
          </a>
        </div>
        <ul className="nav-item">
          {this.state.listItem.map(item => {
            return <li onClick={this.showItem.bind(this, item)} key={item.id} className={item.isActive ? 'item active' : 'item'}>
              <a>{item.text}</a>
            </li>
          })}
        </ul>
        <div className="search">

        </div>
        <div className="login-area">
          {this.state.userInfo ? <Logined userInfo={this.state.userInfo}/> : <UnLogined/>}
        </div>
      </div>
    </div>
  }
}


export default Header;