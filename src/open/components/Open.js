/**
 * Created by lenovo on 2017/12/15.
 */
import React, {Component} from 'react';

import Header from '../../index/components/Header';
import Recommend from './Recommend';
import Utils from '../../utils/utils';

class Open extends Component {
  constructor(props) {
    super(props);
    let phone = Utils.url2object().phone || '';
    this.state = {
      phone: phone
    }
    this.getOpenMsg(phone);
  }
  getOpenMsg(phone) {
    Utils.ajax('openMsg', {phone: phone}, (err, data) => {
      this.setState({'userInfo': data});
    });
  }
  render() {
    return <div>
      <Header/>
      <Recommend slogan={this.state.slogan}/>
    </div>
  }
}

export default Open;