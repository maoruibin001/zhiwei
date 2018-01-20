/**
 * Created by lenovo on 2018/1/20.
 */
import React, {Component} from 'react';
import Utils from '../../utils/utils';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      infoList: []
    }
  }
  componentDidMount() {
    Utils.ajax('info', {pageSize: 2, pageNo: 2}, (err, data) => {
      this.setState({'infoList': data});
    });
  }
  render() {
    return <div>
      <div>
        {this.state.infoList.map(e => {
          console.log(e)
          return <div>
            <h1><a href={e.url}>{e.title}</a></h1>
            <div>{e.desc}</div>
          </div>
        })}
      </div>
    </div>
  }
}

export default Content