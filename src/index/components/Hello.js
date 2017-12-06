/**
 * Created by lenovo on 2017/12/4.
 */
import React, {Component} from 'react';
import Utils from '../../utils/utils';

class Hello extends Component {
  getMsg() {
    Utils.ajax('user', null, function (err, model) {
      if (err) {
        alert(err);
      } else {
        console.log(model);
      }
    });
  }

  render() {
    return <div>
      <button onClick={this.getMsg.bind(this)}>getMsg</button>
    </div>
  }
}

export default Hello;