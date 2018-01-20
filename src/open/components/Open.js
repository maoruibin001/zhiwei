/**
 * Created by lenovo on 2017/12/15.
 */
import React, {Component} from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContentBox from '../../components/ContentBox';

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
      <ContentBox>
        <Recommend slogan={this.state.slogan}/>
      </ContentBox>
      <Footer/>
    </div>
  }
}

export default Open;