var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    orderList: [],
    showType: 0,
    startPage: 1,
    pageSize: app.globalData.pageSize,
    totalResult: 0,
    scrollTop: 0,
    teamStatus: '',//中奖 -1:未中奖 0:待成团 1:已中奖 2:成团失败 3:待开团
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      startPage:1,
      pageSize:app.globalData.pageSize,
      orderList:[]
    });
    this.getOrderList();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  getOrderList() {
    let that = this;
    util.request(api.yhsMytgRecords, {
      startPage: that.data.startPage,
      pageSize: that.data.pageSize,
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        that.setData({
          orderList: that.data.orderList.concat(res.value.userRecordList),
          totalResult: res.value.userRecordCount
        });
      }
    });
  },
  onReachBottom() {
    let that = this;
    if (Math.ceil(that.data.totalResult/app.globalData.pageSize) > that.data.startPage) {
      that.setData({
        startPage: that.data.startPage + 1
      });
      that.getOrderList();
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  switchTab: function (event) {
    let showType = event.currentTarget.dataset.index;
    this.setData({
      showType: showType
    });
    this.getOrderList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.setData({
      startPage:1,
      pageSize:app.globalData.pageSize,
      orderList:[]
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