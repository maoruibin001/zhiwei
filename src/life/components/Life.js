/**
 * Created by lenovo on 2017/12/15.
 */
import React, {Component} from 'react';

import Header from '../../components/Header';
import Utils from '../../utils/utils';

class Life extends Component {
  constructor(props) {
    super(props);
    let phone = Utils.url2object().phone || '';
    this.state = {
      phone: phone
    }
  }
  render() {
    return <div>
      <Header/>
      <h1>hello i am life</h1>
    </div>
  }
}

export default Life;