var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    orderList: [],
    status: 99,//订单统一状态，0：未付款 1：已付款 2：待结算 3：系统待结算 4：无效订单 66：订单已反积分
    page: 1,
    pageSize: app.globalData.pageSize,
    totalResult: 1,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    try {
      var tab = wx.getStorageSync('tab');
      that.setData({
        status: tab
      });
    } catch (e) { }

  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.setData({page:1,orderList:[]})
    this.getOrderList();
    wx.stopPullDownRefresh();
  },
  getOrderList() {
    let that = this;
    util.request(api.jhOrders, {
      startPage: that.data.page,
      pageSize: that.data.pageSize,
      status: that.data.status == 99 ? '' : that.data.status
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        that.setData({
          orderList: that.data.orderList.concat(res.value.orderList),
          totalResult: res.value.orderCount
        });
      }
    });
  },
  onReachBottom() {
    if (Math.ceil(this.data.totalResult / this.data.pageSize) > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
      this.getOrderList();
    } else {
      wx.showToast({
        title: '没有更多订单了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  switchTab: function (event) {
    let status = event.currentTarget.dataset.index;
    this.setData({
      orderList: [],
      status: status,
      page: 1,
      pageSize: app.globalData.pageSize,
      totalResult: 1
    });
    this.getOrderList();
  },
  detailExpress: function (e) {
    let orderId = e.currentTarget.dataset.index;
    wx.navigateTo({ url: '/pages/ucenter/expressInfo/expressInfo?orderId=' + orderId });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.setData({
      orderList: [],
      page: 1,
      pageSize: app.globalData.pageSize,
      totalResult: 1
    });
    this.getOrderList();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})