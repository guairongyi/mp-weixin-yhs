// pages/groupon/grouponList/grouponList.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const localData = require('../../../data/localData.js');

var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    grouponList: [],
    indicatorDots: false,
    startPage: 1,
    pageSize:app.globalData.pageSize,
    totalResult: 0,
    scrollTop: 0,
    scrollHeight:0,
    banner: [],//广告
    subUserInfo:[]
  },
  getBanner(){
    let that = this;
    util.request(api.yhsActivity,{"type":"4","startPage":1,"pageSize":20},'POST').then(function(res){
      if(res.code == 1){
        that.setData({
          banner: res.value,//首页广告
        });
      }
    });
  },
  onLoad: function (options) {
    //this.getGrouponList();
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    that.getBanner();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.setData({
      scrollTop: 0,
      startPage: 1,
      grouponList: []
    });
    that.getGrouponList();
    util.request(api.yhsSubUser).then(function (res) {
      that.setData({
        subUserInfo:res.value
      });
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onBottom() {
    let that = this;
    if (Math.ceil(that.data.totalResult / that.data.pageSize) > that.data.startPage) {
      that.setData({
        startPage: that.data.startPage + 1
      });
      that.getGrouponList();
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getGrouponList: function () {
    let that = this;
    util.request(api.yhsTgGoodsLst, {
      startPage: that.data.startPage,
      pageSize: that.data.pageSize
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        that.setData({
          grouponList: that.data.grouponList.concat(res.value.recordList),
          totalResult: res.value.recordCount
        });
      }
    });
  },
  goGoods(e) {
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
      return;
    }
    let product = e.currentTarget.dataset.product;
    let goods = {
      id: product.id
    }
    try {
      wx.navigateTo({
        url: '/pages/goods/goods?data=' + JSON.stringify(goods)
      })
    } catch (e) { }
  }
})