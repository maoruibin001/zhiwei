/**
 * Created by lenovo on 2017/12/8.
 * 用户卡片信息组件
 */
import React, {Component} from 'react';

import '../../styles/index/userCard.css';
import Utils from '../utils/utils';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
      }
    }
  }

  // 登出
  signOut() {
    Utils.ajax('signOut', null, (err, model) => {
      if (err) {
        alert(err);
      } else {
        location.href = model.url;
      }
    });
  }
  render() {
    return <div className="g-user-card">
      <div className="card-inner">
        <div className="card-header">
          <div className="user-picture">
            <a><img src={this.props.userInfo.imgUrl}/></a>
          </div>
          <div className="user-message">
            <div className="name">
              <a href="">{this.props.userInfo.name}</a>
            </div>
            <div className="meta">
              <a href="" className="experience">经验 <strong>{this.props.userInfo.experience}</strong></a>
              <a href="" className="integral">积分 <strong>{this.props.userInfo.integral}</strong></a>
            </div>
          </div>
        </div>

        <div className="card-history">
          <div>
            <dl>
              <dt>计算机</dt>
              <dd>用来计算的仪器 ... ...</dd>
            </dl>
          </div>
        </div>
        <div className="card-footer">
          <a onClick={this.signOut.bind(this)}>安全退出</a>
        </div>
      </div>

    </div>
  }
}

export default UserCard;