/**
 * Created by lenovo on 2017/12/15.
 */
import React, {Component} from 'react';

class Recommend extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="slogan">
      <span>{this.props.slogan}</span>
      <a href="" className="btn">我要推荐</a>
    </div>
  }
}

export default Recommend;