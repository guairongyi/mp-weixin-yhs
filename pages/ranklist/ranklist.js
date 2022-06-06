const app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
    mode:1,
    rankList: [],
    hasReachBottom: "lower"
  },
  onShareAppMessage: function (options) { },
  onShareTimeline: function (options) { },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    that.getRankList(1);
    //that.getUserInfoByStorage();
  },
  //得到排行榜数据
  getRankList: function () {
    var that = this;
    util.request(api.yhsRank + '?type=' + that.data.mode).then(function (res) {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      if (res.code == 1) {
        that.setData({ rankList: res.value })
      }
    });
  },

  appendRankList: function () {
    let that = this;
    util.request(api.yhsRank + '?type=' + that.data.mode).then(function (res) {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      if (res.code == 1) {
        that.setData({ rankList: that.data.rankList.concat(res.value) })
      }
    });
  },

  lower: function () {
    console.log('上拉了')
    var that = this;
    //util.showMsg('没有更多数据了')
    // 显示加载图标  
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    //that.appendRankList();
  },
  reachBottom: function () {
    wx.showToast({
      title: '已经到底部啦',
      icon: 'none',
      duration: 1000
    })
  },

  yqRank: function () {
    var that = this;
    console.log("向左")
    that.setData({
      mode: 1,
      rankList:[],
      hasReachBottom: "lower"
    })
    that.getRankList();
  },
  flRank: function () {
    var that = this;
    console.log("向右")
    that.setData({
      mode: 2,
      rankList:[],
      hasReachBottom: "lower"
    })
    that.getRankList();
  },
  fhRank: function () {
    var that = this;
    console.log("向右")
    that.setData({
      mode: 3,
      rankList:[],
      hasReachBottom: "lower"
    })
    that.getRankList();
  },
})