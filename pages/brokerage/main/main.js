var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    today_type: "active",
    yestoday_type: "disable",
    week_type: "disable",
    month_type: "disable",
    value: {},
    inviteUserCount: 0,//推广人数
    rmbEstimate: 0,//预估现
    integralEstimate: 0,//预估积分,
    startDate: '',
    endDay: '',
    hasLogin: false
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      startDate: this.getCurrentMonthFirst(),
      endDay: this.getCurrentMonthFirst()
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    //获取用户的登录信息
    if (app.globalData.hasLogin) {
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });

      let that = this;
      util.request(api.yhsAccountInfo, { requestData: util.encryptorJsonData({ "accountType": null }) }, 'POST').then(function (res) {
        if (res.code === 1) {
          that.setData({
            value: res.value
          });
        }
      });
      this.getYuGuData();
    }
  },
  //获取当前时间
  getCurrentMonthFirst: function () {
    var date = new Date();
    var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    return todate;
  },
  dateAdd: function (startDate, days, type) {
    startDate = new Date(startDate);
    if (type === 1) {
      startDate = +startDate + days * 1000 * 60 * 60 * 24;
    } else {
      startDate = +startDate - days * 1000 * 60 * 60 * 24;
    }
    startDate = new Date(startDate);
    var nextStartDate = startDate.getFullYear() + "-" + ((startDate.getMonth() + 1) < 10 ? ("0" + (startDate.getMonth() + 1)) : startDate.getMonth() + 1) + "-" + (startDate.getDate() < 10 ? ("0" + startDate.getDate()) : startDate.getDate());
    return nextStartDate;
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  switchTabType: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    var currType;
    var today_type = "disable";
    var yestoday_type = "disable";
    var week_type = "disable";
    var month_type = "disable";
    if (type == 1) {
      that.setData({
        startDate: that.getCurrentMonthFirst(),
        endDay: that.getCurrentMonthFirst()
      });
      today_type = "active";
    } else if (type == 2) {
      yestoday_type = "active";
      var date = that.dateAdd(that.getCurrentMonthFirst(), 1, 2);
      that.setData({
        startDate: date,
        endDay: date
      });

    } else if (type == 3) {
      week_type = "active";
      var date = that.dateAdd(that.getCurrentMonthFirst(), 7, 2);
      that.setData({
        startDate: date,
        endDay: that.getCurrentMonthFirst()
      });
    } else if (type == 4) {
      month_type = "active";
      var date = that.dateAdd(that.getCurrentMonthFirst(), 30, 2);
      that.setData({
        startDate: that.getCurrentMonthFirst(),
        endDay: date
      });
    }
    this.setData({
      today_type: today_type,
      yestoday_type: yestoday_type,
      week_type: week_type,
      month_type: month_type
    });
    this.getYuGuData();
  },
  getYuGuData: function () {
    var that = this;
    util.request(api.yhsYuGu, {
      "startDay": that.data.startDate,
      "endDay": that.data.endDay
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        that.setData({
          inviteUserCount: res.value.inviteUserCount,//推广人数
          rmbEstimate: res.value.rmbEstimate,//预估现
          integralEstimate: res.value.integralEstimate,//预估积分
        });
      }
    });
  },
  goOrderList: function () {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/brokerage/order/order"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goExtract: function () {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/brokerage/record/record"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  extractMoney: function (e) {
    let type = e.currentTarget.dataset.type;
    if (this.data.hasLogin) {
      if(type == 2){
        wx.navigateTo({
          url: "/pages/brokerage/withdrawal/withdrawal?type=" + type
        });
      }else{
        if (this.data.value.rmbAccount >= 1) {
          wx.navigateTo({
            url: "/pages/brokerage/withdrawal/withdrawal?type=1&remainAmount=" + this.data.value.rmbAccount
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '您的可提现金额小于1元，暂时无法申请提现！',
            showCancel: false,
            success(res) {
              //暂时不做处理
            }
          });
        }
      }
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  }
})