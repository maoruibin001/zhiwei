/**
 * Created by lenovo on 2017/12/15.
 */
import React, {Component} from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContentBox from '../../components/ContentBox';
import Content from './Content';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoList: []
    }
  }
  render() {
    return <div>
      <Header/>
      <ContentBox>
        <Content/>
      </ContentBox>
      <Footer/>
    </div>
  }
}

export default Info;