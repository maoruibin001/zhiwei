/**
 * Created by lenovo on 2018/1/20.
 */
import React, {Component} from 'react';

const ContentBox = (props) => {
  let height = props.height || window.screen.availHeight - 72 - 122 + 'px';
  return <div style={{height: height}}>
    {props.children}
  </div>
}

export default ContentBox;