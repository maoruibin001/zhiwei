/**
 * Created by lenovo on 2017/12/7.
 */
import React, {Component} from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Utils from '../../utils/utils';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: null
    }
  }
  componentDidMount() {
    Utils.ajax('user', null, (err, data) => {
      this.setState({'userInfo': data});
    });
  }

  render() {
    return <div>
      <Header userInfo={this.state.userInfo}/>
      <Content/>
      <Footer/>
    </div>
  }
}

export default Index;