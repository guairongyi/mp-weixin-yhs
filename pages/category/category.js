var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    navList: [],
    goodsList: [],
    id: 1,
    source: '',
    sid: '',
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    rConfig: {},
    page: 1,
    pageSize: 10,
    totalResult: 1
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({ rConfig: wx.getStorageSync('rConfig') });
    if (options.id) {
      that.setData({
        id: parseInt(options.id),
        source: options.source,
        sid: options.sid
      });
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getCategoryInfo();

  },
  getCategoryInfo: function () {
    let that = this;
    util.request(api.yhsJtkBar,{type:2,param:'union/goods_category?pub_id=6016&source=' + that.data.source},'POST').then(function (res) {
      if (res.code == 1) {
        that.setData({
          navList: JSON.parse(res.value).data,
        });
        //nav位置
        let currentIndex = 0;
        let navListCount = that.data.navList.length;
        for (let i = 0; i < navListCount; i++) {
          currentIndex += 1;
          if (that.data.navList[i].index == that.data.id) {
            break;
          }
        }
        if (currentIndex > navListCount / 2 && navListCount > 5) {
          that.setData({
            scrollLeft: currentIndex * 60
          });
        }
        that.getGoodsList();
      } else {
        //显示错误信息
      }
    });
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
  getGoodsList: function () {
    var that = this;
    //来源 jd-京东,vip-唯品会,pdd-拼多多,kaola-考拉,taobao-淘宝 默认vip
    util.request(api.yhsJtkBar, {
      type:2,
      param:'union/query_goods?pub_id=6016&page='+that.data.page + '&pageSize='+that.data.pageSize + '&source=' + that.data.source + '&cat=' + that.data.id
    }, 'POST').then(function (res) {
      console.log(res);
      that.setData({
        goodsList: that.data.goodsList.concat(JSON.parse(res.value).data),
        totalResult: JSON.parse(res.value).total_results
      });
    });
  },
  onUnload: function () {
    // 页面关闭
  },
  switchCate: function (event) {
    if (this.data.id == event.currentTarget.dataset.id) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      id: event.currentTarget.dataset.id,
      goodsList: [],
      page: 1
    });
    this.getGoodsList();
  },
  onReachBottom: function () {
    if (Math.ceil(this.data.totalResult / this.data.pageSize) > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
    } else {
      wx.showToast({
        title: '已经到底了!',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    this.getGoodsList();
  }
})