/**
 * Created by lenovo on 2017/12/4.
 */
function findDescByCode(code, msg) {
  switch (code) {
    case 2:
      return '必输字段为空，请检查下列字段： ' + msg;
    default:
      return '必输字段 ' + msg + ' 不能为空';
  }
}

module.exports = findDescByCode;