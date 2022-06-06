var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    id: 0,
    orderInfo: {},
    expressInfo: {},
    startPage:1,
    pageSize:0,
    totalResult:0,
    flag: false,
    cardNo:''
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: options.id
    });
    this.getOrderDetail();
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getOrderDetail();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  detailExpress: function (e) {
    let expressNo = e.currentTarget.dataset.index;
    wx.navigateTo({ url: '/pages/ucenter/expressInfo/expressInfo?expressNo=' + expressNo });
  },
  getOrderDetail: function () {
    let that = this;
    util.request(api.yhsTgOrder, {
      startPage: that.data.startPage,
      pageSize: app.globalData.pageSize,
      moduleId: that.data.id
    }, 'POST').then(function (res) {
      if (res.code == 1) {
        if (res.value.orderListCount == 0) {
          wx.showModal({
            title: '温馨提示',
            content: '查无订单信息!',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 0,
              })
            }
          });
          return;
        } else {
          that.setData({
            orderInfo: res.value.orderList[0]
          });
          that.setData({
            cardNo:that.data.orderInfo.consigneeIdCard.substring(0,3) + '*********' + that.data.orderInfo.consigneeIdCard.substring(14,18)
          });
        }
      }
    });
  },
  // “确认收货”点击效果
  confirmOrder: function () {

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
});