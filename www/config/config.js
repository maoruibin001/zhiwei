/**
 * Created by lenovo on 2017/12/8.
 */

const SUCCESSCODE = '000000'; //成功返回code
const SUCCESSMSG = '成功'; //成功描述
const ERRORCODE = '999999';//失败返回code
const ERRORMSG = '失败';//失败描述
const CHECKERRORCODE = '333333';//校验失败返回code
const CHECKERRORMSG = '校验不通过';//校验失败描述

const OPENSESSION = true; //是否开启session校验。
const REPONSE_CODE_LOGIN_INVALID = 'user.invalid'; // 响应编码 - 用户失效
const REPONSE_DESC_LOGIN_INVALID = '登录过期';

const REDISPORT = 6379; //redis 端口
const REDISHOST = '127.0.0.1'; //redis主机
const REDISEXPIRES = 1000 * 60; //redis内容过期时间 (默认设置为1000分钟过期)

const PAGESIZE = 10; //一页10条
const PAGENO = 1; //第一页
const HOST = '127.0.0.1';
const PORT = 8089;

const IMGDEFAULTURL = 'http://' + HOST + ':' + PORT + '/images/run.png'; //如果用户没用上传头像图片，返回的默认头像图片

const config = {
  HOST,
  PORT,
  IMGDEFAULTURL,
  REPONSE_CODE_LOGIN_INVALID,
  REPONSE_DESC_LOGIN_INVALID,
  REDISPORT,
  REDISHOST,
  REDISEXPIRES,
  OPENSESSION,
  CHECKERRORCODE,
  CHECKERRORMSG,
  SUCCESSCODE,
  SUCCESSMSG,
  ERRORCODE,
  ERRORMSG,
  PAGESIZE,
  PAGENO,

};

module.exports =  config;