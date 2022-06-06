var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var check = require('../../../utils/check.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data: {
    amt: 0.00,
    mobile: '',
    name: '',
    next: false,
    isPasswdFocus: false,
    passwd: '',
    type: ''
  },
  setPasswdValue: function (e) {
    var that = this;
    that.setData({ passwd: e.detail.value });
  },
  onFocus: function (e) {
    var that = this;
    that.setData({ isPasswdFocus: true });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      amt: options.remainAmount,
      mobile: userInfo.userPhone,
      type: options.type
    });
    // 页面渲染完成

  },
  onReady: function () {

  },
  next: function () {
    let that = this;
    if (that.data.type == 1) {
      that.setData({ next: true })
    } else {
      //发起支付 调用后台生成订单 返回支付参数
      util.request(api.yhsWePay, { requestData: util.encryptorJsonData({ 'amount': that.data.amt }) }, 'POST').then(function (res) {
        if (res.code === 1) {
          console.log("支付过程开始");
          wx.requestPayment({
            "appId": "wx16bf8a93a4331952",
            "timeStamp": res.value.timeStamp,
            "nonceStr": res.value.nonceStr,
            "package": res.value.packageValue,
            "signType": res.value.signType,
            "paySign": res.value.paySign,
            'success': function (res) {
              console.log("支付过程成功");
              wx.navigateBack({
                delta: 1,
              })
            },
            'fail': function (res) {
              console.log("支付过程失败" + JSON.stringify(res));
            },
            'complete': function (res) {
              console.log("支付过程结束")
            }
          });
        }else{
          wx.showModal({
            title:'提示',
            content:res.msg,
            showCancel:false
          })
        }
      });
    }

  },
  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  confirm: function () {
    var that = this;
    if (that.data.passwd.length == 6) {
      that.goWithdrawal();
    } else {
      wx.showToast({
        title: '密码长度不正确',
      })
    }

  },
  goWithdrawal: function () {
    var that = this;
    if (this.data.mobile.length == 0) {
      wx.showModal({
        title: '错误信息',
        content: '手机号和验证码不能为空',
        showCancel: false
      });
      return false;
    }

    if (!check.isValidPhone(this.data.mobile)) {
      wx.showModal({
        title: '错误信息',
        content: '手机号输入不正确',
        showCancel: false
      });
      return false;
    }
    //调用后台申请提现接口
    let reqData = {
      "amountNum": that.data.amt,
      "accountType": "01",
      "paymentAccount": that.data.mobile,
      "paymentName": that.data.name,
      "tradePassword": that.data.passwd
    };
    util.request(api.yhsWechatwd, {
      requestData: util.encryptorJsonData(reqData)
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        util.showMsg('提现操作已成功');
        util.redirect('/pages/brokerage/record/record');
      } else {
        util.showMsg(res.msg);
      }
      that.setData({
        next: false,
        passwd:''
      });
    });
  },
  getAmtInputValue: function (e) {
    this.setData({
      amt: e.detail.value
    });
  },
  getNameInputValue: function (e) {
    this.setData({
      name: e.detail.value
    });
  }
})