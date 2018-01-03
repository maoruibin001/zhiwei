/**
 * Created by lenovo on 2017/12/8.
 * 页脚组件
 */
import React, {Component} from 'react';
import '../../styles/index/footer.css';

class Footer extends Component {
  render() {
    return <div className="footer idx-minwidth">
      <div className="container">
        <div className="footer-link">
          <div className="link-content">
            <a href="">开源社区</a>
            <a href="">人才招募</a>
            <a href="">联系我们</a>
            <a href="">常见问题</a>
            <a href="">意见反馈</a>
            <a href="">友情链接</a>
          </div>
          <div className="link-download">

          </div>
        </div>
        <div className="footer-copyright">
          <span>© 2017 zhiwei.com  京ICP备 xxx号-x</span>
        </div>
      </div>
    </div>
  }
}

export default Footer;