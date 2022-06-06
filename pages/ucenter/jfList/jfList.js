var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    jfList: [],
    dataType: '1002001', // 1002002 团队,1002001 返利, 2002001 积分兑换 2 全部
    page: 1,
    pageSize: app.globalData.pageSize,
    totalResult: 0,
    scrollTop: 0,
    scrollHeight: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getJfList();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
      console.log('onPullDownRefresh');
      this.setData({jfList:[],page:1})
      this.getJfList();
      wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    if (Math.ceil(that.data.totalResult/that.data.pageSize) > that.data.page) {
      that.setData({
        page: that.data.page + 1
      });
    } else {
      wx.showToast({ title: '已经到底了!', icon: 'none', duration: 2000 });
      return false;
    }
    that.getJfList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getJfList: function() {
    let that = this;
    let reqData = {
      "startPage": that.data.page,
      "accountType":'02', 
      "dataType":that.data.dataType,
      "pageSize": that.data.pageSize
    };
    util.request(api.yhsUserAccountRecord, {
      requestData: util.encryptorJsonData(reqData)
    }, 'POST').then(function (res) {
      console.log(res);
      if(res.code === 1){
        if(res.value.childCount == 0){
          wx.showToast({
            title: '暂无记录！',
          })
        }
        that.setData({
          jfList: that.data.jfList.concat(res.value.accountRecordList),
          totalResult: res.value.accountRecordCount
        });
      }
    });
  },
  switchTab: function(e) {
    this.setData({
      jfList: [],
      dataType: e.currentTarget.dataset.index,
      page: 1,
      pageSize: app.globalData.pageSize,
      totalResult: 0
    });
    this.getJfList();
  },
})