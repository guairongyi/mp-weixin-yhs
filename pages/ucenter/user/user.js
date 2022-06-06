var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasLogin: false,
    userSharedUrl: ''
  },

  /**
      * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    let that = this;
    //获取用户的登录信息
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo,
      hasLogin: true
    });
    //如果无分享推广码,则需要获取分享二维码
    if (this.data.hasLogin && this.data.userSharedUrl == '') {
      that.getUserSharedUrl();
    }
  },
  getUserSharedUrl: function () {
    let that = this;
    if (!that.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
    util.request(api.yhsQcode).then(function (res) {
      that.setData({
        userSharedUrl: res.value
      });
    });
  },
  getPhoneNumber: function (e) {
    let that = this;
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      // 拒绝授权
      return;
    }

    if (!this.data.hasLogin) {
      wx.showToast({
        title: '绑定失败：请先登录',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    util.request(api.AuthBindPhone, {
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        let userInfo = wx.getStorageSync('userInfo');
        userInfo.phone = res.data.phone;//设置手机号码
        wx.setStorageSync('userInfo', userInfo);
        wx.setStorageSync('lodingLogin', false);
        that.setData({
          userInfo: userInfo,
          hasLogin: true
        });
        wx.showToast({
          title: '绑定手机号码成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
  // 保存推广码到相册
  saveShare: function () {
    util.jhxLoadShow('加载中...');
    let that = this;
    wx.downloadFile({
      url: that.data.userSharedUrl,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showModal({
              title: '推广码下载',
              content: '推广二维码成功保存到相册!!',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#a78845',
              success: function (res) {
                util.jhxLoadHide();
                if (res.confirm) {
                  console.log('用户点击确定');
                }
              }
            })
          },
          fail: function (err) {
            util.jhxLoadHide();
            if (err.errMsg) {//重新授权弹框确认
              wx.showModal({
                title: '提示',
                content: '您好,请先授权后在保存图片。',
                showCancel: false,
                success(res) {
                  if (res.confirm) {//重新授权弹框用户点击了确定
                    wx.openSetting({//进入小程序授权设置页面
                      success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 2000
                          })
                        } else {//用户未打开保存图片到相册的授权开关
                          wx.showModal({
                            title: '温馨提示',
                            content: '授权失败，请稍后重新获取',
                            showCancel: false,
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
      fail: function (err) {
        util.jhxLoadHide();
      }
    })
  },
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (!res.confirm) {
          return;
        }
        util.request(api.yhsLogout).then(function (res) {
          app.globalData.hasLogin = false;
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.reLaunch({
            url: '/pages/index/index'
          });
        });

      }
    })
  }
})