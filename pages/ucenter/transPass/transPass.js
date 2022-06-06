var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var interval = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iptValue: '',
    passwd: '',
    isFocus: false,
    isPasswdFocus: false,
    userPhone: wx.getStorageSync('userInfo').userPhone,
    time: 60,
    reget: false,
    type: 0,// 0 验证码，1交易密码
  },
  next: function () {
    this.setData({
      type: 1
    });
  },
  confirm: function () {
    var that = this;
    let reqData = {
      "smsCode": that.data.iptValue,
      "newPassword": that.data.passwd,
      "userPhone": that.data.userPhone
    }
    util.request(api.yhsUpdateTransPasswd, {
      requestData: util.encryptorJsonData(reqData)
    }, 'POST').then(function (res) {
        if (res.code === 1) {
          wx.showToast({
            title: '设置成功',
          })
          wx.navigateBack();
        } else {
          util.showErrorToast(res.msg)
        }
        that.setData({
          type: 0,
          isFocus: false,
          isPasswdFocus: false,
          iptValue: '',
          passwd: '',
          reget: false
        });
      });
  },
  //倒计时函数
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.time
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: "",
          currentTime: 11,
          disabled: false,
          reget: true,//改变字体样式颜色
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  //重新获取验证码
  getSmsCode: function () {
    var that = this;
    util.request(api.yhsGetSmsCode, {
      "userPhone": this.data.userPhone,
      "smsType": "3",
      "isWeChat": 1,
      "code": "",
      "uuid": ""
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        that.getCode();
        wx.showToast({
          title: '短信验证码发送成功',
        })
      }
    });
  },
  onFocus: function (e) {
    var that = this;
    if (that.data.type === 0) {
      that.setData({ isFocus: true });
    } else {
      that.setData({ isPasswdFocus: true });
    }
  },
  onShow: function () {
    if (this.data.type == 0) {
      this.getSmsCode();
    }
  },
  setValue: function (e) {
    var that = this;
    that.setData({ iptValue: e.detail.value });
  },
  setPasswdValue: function (e) {
    var that = this;
    that.setData({ passwd: e.detail.value });
  },
})