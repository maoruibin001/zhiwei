/**
 * Created by lenovo on 2018/1/20.
 */
import React, {Component} from 'react';
import Utils from '../../utils/utils';
import '../../../styles/info/content.css';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      infoList: []
    }
  }
  componentDidMount() {
    Utils.ajax('info', {pageSize: 40, pageNo: 1}, (err, data) => {
      this.setState({'infoList': data});
    });
  }
  render() {
    return <div>
      <div className="content-itemBox">
        {this.state.infoList.map((e, k) => {
          return <div key={k}>
            <div  className="content-item"><a className="content-itemText" href={e.href}>{e.title}</a></div>
          </div>
        })}
      </div>
    </div>
  }
}

export default Content