/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {
  return new Promise(function(resolve, reject) {
    return login().then((resp) => {
      //登录远程服务器 调用微信登录成功
      util.request(api.yhsAuthWxLogin, {
        code: resp.code,
        nickName: userInfo.nickName,
        avatarUrl:userInfo.avatarUrl
    }, 'POST').then(res => {
      if(res.code === 1){
        //返回状态 1:登录成功，2:需授权手机号
        if(res.value.resType === 2){  // 还需要绑定手机号
          resolve(res);
        }else{
          //已经登录成功了 存储用户信息
          wx.setStorageSync('lodingLogin', false);
          wx.setStorageSync('token', res.value.loginMap.token);
          resolve(res);
        }
      }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function(resolve, reject) {
      checkSession().then(() => {
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
          resolve(true);
        } else {
          reject(false);
        }
      }).catch(() => {
        reject(false);
      });
  });
}

function getSid(){
  var sid = 'mwpdvbfk';
  let userInfo = wx.getStorageSync('userInfo');
  if (userInfo && userInfo.recommendedCode) {
    sid = userInfo.recommendedCode;
  }else if(wx.getStorageSync('shareUserId')){
    sid = wx.getStorageSync('shareUserId')
  }
  return sid;
}

module.exports = {
  loginByWeixin,
  checkLogin,
  getSid,
};