/**
 * Created by lenovo on 2017/7/31.
 * 校验工具，对表单提交数据进行校验
 */
import './valid.css';

/* 去前后空格
 **@params {string} str 字符串
 **
 */
function trim(str) {
  return str.replace(/^\s|\s$/, '');
}

/* 在一个元素后面生成一个兄弟元素
 **@params {Object} newElement 生成的DOM元素
 **@params {Object} targetElement 目标DOM元素
 */

function after(newElement, targetElement) {
  let parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

/* 在一个元素后生成一个兄弟元素，并绝对定位
 **@params {Object} newElement 生成的DOM元素
 **@params {Object} targetElement 目标DOM元素
 * ****————ab_right————在valid.css文件中。***
 */
function absolute(newElement, targetElement) {
  let parent = targetElement.parentNode;
  let position = getComputedStyle(parent).position;
  if (position === 'relative' || position === 'absolute' || position === 'fixed') {
    parent.appendChild(newElement);
    addClass(newElement, 'ab_right');
  } else {
    console.error(parent);
    throw new Error('添加position元素的父必须定位', parent);
  }

}

/* 去除所有指定class
 **@params {string} className 指定的类名
 */
function removeAllClass(className) {
  let tip = document.getElementsByClassName(className);
  if (tip.length < 1) return;
  tip = [].slice.apply(tip);
  tip.forEach(function (e) {
    remove(e);
  })
}

/* 新增一个class
 **@params {Object} ele 当前DOM元素
 **@params {String} className 类名
 */
function addClass(ele, className) {
  if (className && ele.className.indexOf(className) === -1) {
    ele.className += ' ' + className;
  }
}

/* 删除一个class
 **@params {Object} ele 当前DOM元素
 **@params {String} className 类名
 */
function removeClass(ele, className) {
  if (className && ele.className.indexOf(className) !== -1) {
    ele.className = trim(ele.className.replace(className, ''));
  }
}

/* 删除一个元素
 **@params {Object} e 待删除DOM元素
 */
function remove(e) {
  e.parentNode.removeChild(e);
}

export default {
  /* 校验
   **@params {Object} fieldRulls 校验规则
   **@params {Object} data 带校验的数据
   **@params {Object} ref 传入的this.refs
   * （TODO：refs中的所有名字都必须和传入的data属性名一致，如果不一致需要通过options的filled属性进行填充，可以参考login components下面的register文件）
   **@params {Object || Undefined} options 传入的扩展参数，可不传。options: {
   *            filled: '', //表示是否对refs进行填充，默认不填充。
   *            position: '' //表示是否开启定位功能，默认不开启。
   *            filledDirection: '' //填充方向，值为+或-，默认正向（+）填充
   *          }
   ****
   * 示例：const FIELDRULLS = [
   {
   require: true,
   name: 'phone',
   rex: /\d{11}/,
   emptyErr: '电话号码不能为空',
   err: '请输入正确的电话号码'
   },
   {
   require: true,
   name: 'pwd',
   label: '密码'
   },
   ];
   */
  check (fieldRulls, data, ref, options) {
    options = options || {};
    let ret = {}, fildRullList = fieldRulls || [], inValid = false;
    let filledDirection = options.filledDirection ? options.filledDirection : '+';
    removeAllClass('error_tip');
    fildRullList.forEach(function (e) {
      let refName = '';
      refName = options.filled ? (filledDirection === '+' ? (options.filled + e.name) : (e.name + options.filled)) : e.name;
      if (!ref[refName])return;
      let val = data[e.name];
      // 此处不进行空检验
      if (e.rex && !e.rex.test(val) && val) {
        ret[e.name] = e.err || '';
        addClass(ref[refName], 'border-red');
        inValid = true;
      }
      // 此处校验必填字段
      if (e.require && !val) {
        ret[e.name] = e.emptyErr || (e.label ? (e.label + '不能为空') : '') || '';
        addClass(ref[refName], 'border-red');
        inValid = true;
      }
      ref[refName].addEventListener('focus', function () {
        if (this.nextSibling && this.nextSibling.className.indexOf('error_tip') !== -1) {
          remove(this.nextSibling);
        }
        removeClass(this, 'border-red');
      })
      if (inValid) {
        let span = document.createElement('span');
        span.className = "error_tip";
        span.innerHTML = ret[e.name] || '';
        if (options && options.position) {
          switch (options.position) {
            case 'absolute':
              absolute(span, ref[refName]);
              break;
            default:
              after(span, ref[refName]);
          }
        } else {
          after(span, ref[refName]);
        }
      }
    });

    // 返回值分两种 1、校验通过返回null；2、校验不通过返回具体有哪些不通过的。
    return inValid ? ret : null;
  }
}
