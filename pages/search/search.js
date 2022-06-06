var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
var app = getApp()
Page({
  data: {
    keyword: '',
    searchStatus: false,
    goodsList: [],
    currentChan: '',
    page: 1,
    pageSize: 20,
    totalPages: 0
  },
  //事件处理函数
  closeSearch: function () {
    wx.navigateBack()
  },
  clearKeyword: function () {
    let that = this;
    that.setData({
      keyword: '',
      searchStatus: false
    });
  },
  onLoad: function () {
  },
  onShow:function (){
    let that = this;
    that.getGoodsList()
  },
  inputChange: function (e) {
    let that = this;
    that.setData({
      keyword: e.detail.value,
      searchStatus: false
    });
  },
  inputFocus: function () {
    let that = this;
    that.setData({
      searchStatus: false,
      goodsList: []
    });
  },
  getGoodsList: function () {
    let that = this;
    util.request(api.yhsJtkBar,{type:2,param:'union/search?pub_id=6016&sid='+user.getSid()+'&keyword=' + encodeURIComponent(that.data.keyword)
    + '&page='+ that.data.page + '&source='+that.data.currentChan},'POST').then(function (res) {
      debugger;
      if (res.code === 1) {
        that.setData({
          searchStatus: true,
          goodsList: that.data.goodsList.concat(JSON.parse(res.value).data),
          totalPages: JSON.parse(res.value).total_results
        });
        if(JSON.parse(res.value).total_results == 0){
          that.setData({currentChan:''});
        }
      }
    });
  },
  onKeywordTap: function (event) {
    let that = this;
    that.getSearchResult(event.target.dataset.keyword);
  },
  getSearchResult(keyword) {
    let that = this;
    that.setData({
      keyword: keyword,
      page: 1,
      totalPages: 1,
      goodsList: []
    });
    that.getGoodsList();
  },
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    let that = this;
    that.setData({
      currentChan:currentId,
      goodsList:[]
    });
    that.getGoodsList();
  },
  onKeywordConfirm(event) {
    let that = this;
    that.getSearchResult(event.detail.value);
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
    that.getGoodsList();
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    let that = this;
    that.setData({
      currentChan:that.data.currentChan,
      goodsList:[]
    });
    that.getGoodsList();
    wx.stopPullDownRefresh();
  },
})