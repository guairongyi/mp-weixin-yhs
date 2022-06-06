var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data: {
    canIUseGetUserProfile: false, // 用于向前兼容
    loginUuid:null,
    recommendedCode:''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if(options.recommendedCode){
      this.setData({
        recommendedCode:options.recommendedCode
      });
    }
  },
  onReady: function() {
    
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  getPhoneNumber: function (e) {
    let that = this;
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      // 拒绝授权
      wx.showToast({
        title: "授权失败"
      });
      return;
    }
    util.request(api.yhsRegOrBind, {
      uuid:that.data.loginUuid,
      userInfoBody: JSON.stringify(e.detail),
      recommendedCode: user.getSid() 
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        wx.setStorageSync('token', res.value.token);
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        });
        wx.setStorageSync('lodingLogin', false);
        app.globalData.hasLogin = true;
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.showErrorToast({
          title: "登录失败请重试"
        });
      }
    });
  },
  getUserProfile(e) {
    let that = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // user.checkLogin().catch(() => {
          user.loginByWeixin(res.userInfo).then(res => {
            if(res.value.resType === 2){
              that.setData({
                loginUuid:res.value.getPhoneMap.uuid
              });
              app.globalData.hasLogin = false;
            }else{
              wx.setStorageSync('lodingLogin', false);
              app.globalData.hasLogin = true;
              wx.navigateBack({
                delta: 1
              })
            }
          }).catch((err) => {
            app.globalData.hasLogin = false;
            util.showErrorToast('微信登录失败');
          });
        // });
      },
      fail: (res) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      }
    });
  },
  accountLogin: function() {
    wx.navigateTo({
      url: "/pages/auth/accountLogin/accountLogin"
    });
  }
})