var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    categoryList: [],
    currentCategory: '',
    goodsList: [],
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function(options) {
    this.getCatalog();
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCatalog();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  getCatalog: function() {
    //CatalogList
    let that = this;
    util.request(api.yhsJtkBar,{type:1,
      param:'jd/get_super_category?apikey=EihnJgvMlr2IKUYCQC2N8SZzwTS8fPUV'
    },'POST').then(function(res) {
      that.setData({
        categoryList: JSON.parse(res.value).data,
        currentCategory: JSON.parse(res.value).data[0].J_cid
      });
      that.getGoodsList(that.data.currentCategory);
    });
  },
  getGoodsList: function (id) {
    var that = this;
    util.request(api.yhsJtkBar,{type:1,
      param:'jd/subsidy_goods?apikey=EihnJgvMlr2IKUYCQC2N8SZzwTS8fPUV&pageIndex=1&pageSize=100&goods_type=' + id
    },'POST').then(function (res) {
      console.log(res);
      that.setData({
        goodsList: JSON.parse(res.value).data,
        totalResult: JSON.parse(res.value).total
      });
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  navigateToMiniProgram(e) {
    wx.navigateToMiniProgram({
      appId: e.we_app_info.app_id,
      path: e.we_app_info.page_path,
      success(res) {
        // 打开其他小程序成功同步触发
        // wx.showToast({
        //  title: '跳转成功'
        // })
      }
    })
  },
  gotoGoods:function(event){
    let that = this;
    var link = event.currentTarget.dataset.link;
    util.request(api.yhsJtkBar,{
      type:1,
      param:'jd/get_goods_link?apikey=EihnJgvMlr2IKUYCQC2N8SZzwTS8fPUV&sid=888888&goods_link=' + encodeURIComponent(link)},'POST').then(function (res) {
      console.log(res);
      if(res.code == 1){
        that.navigateToMiniProgram(JSON.parse(res.value).data);
      }else{

      }
    });
  },
  switchCate: function(event) {
    var that = this;
    if (this.data.currentCategory == event.currentTarget.dataset.id) {
      return false;
    }
    that.setData({
      currentCategory:event.currentTarget.dataset.index
    })
    this.getGoodsList(event.currentTarget.dataset.id);
  }
})