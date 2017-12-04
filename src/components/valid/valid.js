/**
 * Created by lenovo on 2017/7/31.
 * 校验工具
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

function absolute(newElement, targetElement) {
  let parent = targetElement.parentNode;
  parent.appendChild(newElement);
  addClass(newElement, 'ab_right');
}

/* 去除所有指定class
 **@params {string} className 指定的类名
 */
function removeAllClass(className) {
    let tip = document.getElementsByClassName(className);
    if (tip.length < 1) return;
    tip = [].slice.apply(tip);
    tip.forEach(function(e) {
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
     * **@params {Object} ref 传入的this.$refs
     */
    check (fieldRulls, data, ref, options) {
        let ret = {}, fildRullList = fieldRulls || [], inValid = false;
        removeAllClass('error_tip');
        fildRullList.forEach(function (e) {
            if (!ref[e.name])return;
            let val = data[e.name];
            // 此处不进行空检验
            if (e.rex && !e.rex.test(val) && val) {
                ret[e.name] = e.err || '';
                addClass(ref[e.name], 'border-red');
                inValid = true;
            }
            // 此处校验必填字段
            if (e.require && !val) {
                ret[e.name] = e.emptyErr || (e.label ? (e.label + '不能为空') : '') || '';
                addClass(ref[e.name], 'border-red');
                inValid = true;
            }
            ref[e.name].addEventListener('focus', function() {
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
                        absolute(span, ref[e.name]);
                        break;
                      default:
                          after(span, ref[e.name]);
                    }
                } else {
                  after(span, ref[e.name]);
                }
            }
        });

        // 返回值分两种 1、校验通过返回null；2、校验不通过返回具体有哪些不通过的。
        return inValid ? ret : null;
    }
}
