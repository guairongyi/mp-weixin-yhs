var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    childList: [],
    page: 1,
    pageSize: app.globalData.pageSize,
    totalPages: 1
  },
  onReachBottom: function () {
    let that = this;
    if (Math.ceil(that.data.totalPages / that.data.pageSize) > that.data.page) {
      that.setData({
        page: that.data.page + 1
      });
    } else {
      wx.showToast({ title: '已经到底了!', icon: 'none', duration: 2000 });
      return false;
    }
    that.getRecordList();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getRecordList();
  },
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh');
    this.setData({childList:[],page:1})
    this.getRecordList();
    wx.stopPullDownRefresh();
},
  getRecordList() {
    let that = this;
    util.request(api.yhsDirectUser, {
      "startPage": that.data.page, "pageSize": that.data.pageSize
    }, 'POST').then(function (res) {
      console.log(res);
      if (res.code === 1) {
        if (res.value.childCount == 0) {
          wx.showToast({
            title: '您还没有好友！',
          })
        }
        that.setData({
          childList: that.data.childList.concat(res.value.childList),
          totalPages: res.value.childCount
        });
      }

    });
  },

  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})