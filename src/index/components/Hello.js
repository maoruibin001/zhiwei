/**
 * Created by lenovo on 2017/12/4.
 */
import React, {Component} from 'react';
import Utils from '../../utils/utils';

class Hello extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        name: '',
        phone: ''
      }
    }
  }
  componentDidMount() {
    this.getMsg();
  }
  getMsg() {
    Utils.ajax('user', null,  (err, model) => {
      if (err) {
        alert(err);
      } else {
        this.setState({
          userInfo: model
        })
      }
    });
  }

  render() {
    return <div>
      <h1>hello {this.state.userInfo.name}. your phone is {this.state.userInfo.phone}, and welcome to you.</h1>
      <button onClick={this.getMsg.bind(this)}>getMsg</button>
    </div>
  }
}

export default Hello;