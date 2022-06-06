var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    accountTraceList: [],
    page: 1,
    pageSize: app.globalData.pageSize,
    totalPages: 0,
    dataType: '',
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.onShow();
    wx.stopPullDownRefresh();
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示 从应用切回时会重复
    this.setData({
      accountTraceList: [],
      totalPages: 0,
      page:1
    });
    this.getRecordList();
  },
  switchTab: function(e) {
    this.setData({
      accountTraceList: [],
      dataType: e.currentTarget.dataset.index,
      page: 1,
      pageSize: app.globalData.pageSize,
      totalPages: 0
    });
    this.getRecordList();
  },
  getRecordList() {
    let that = this;
    if(that.data.dataType == '1001005'){
      //邀请奖励
      util.request(api.yhsUserAwardInfo,{"startPage":1,"pageSize":3000},'POST').then(
        function(res){
          if(res.code === 1){
            console.log(res)
            that.setData({
              accountTraceList: that.data.accountTraceList.concat(res.value.childAwardList),
              totalPages: res.value.accountRecordCount
            });
          }
        }
      );
      return;
    }
    let reqData = {
      "startPage": that.data.page,
      "accountType":'01',
      "dataType":that.data.dataType,
      "pageSize": that.data.pageSize
    };
    util.request(api.yhsUserAccountRecord, {
      requestData: util.encryptorJsonData(reqData)
    }, 'POST').then(function (res) {
      if(res.code === 1){
        if(res.value.childCount == 0){
          wx.showToast({
            title: '暂无记录！',
          });
          return;
        }
        that.setData({
          accountTraceList: that.data.accountTraceList.concat(res.value.accountRecordList),
          totalPages: res.value.accountRecordCount
        });
      }
    });
  },
  onReachBottom: function () {
    let that = this;
    if (Math.ceil(that.data.totalPages/that.data.pageSize) > that.data.page) {
      that.setData({
        page: that.data.page + 1
      });
    } else {
      wx.showToast({ title: '已经到底了!', icon: 'none', duration: 2000 });
      return false;
    }
    that.getRecordList();
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})