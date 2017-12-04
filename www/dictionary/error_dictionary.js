/**
 * Created by lenovo on 2017/12/4.
 */
function findDescByCode(code, msg) {
  switch (code) {
    case 2:
      return '必输字段为空，请检查下列字段： ' + msg;
    default:
      return '校验不通过： ' + msg;
  }
}

module.exports = findDescByCode;