const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');
const localData = require('../../data/localData.js');

//获取应用实例
const app = getApp();

Page({
  data: {
    jtkApikey:'EihnJgvMlr2IKUYCQC2N8SZzwTS8fPUV',
    jdGoods: [],//京东商品
    pddGoods: [],//拼多多
    pddTotalResult: 0,
    pddPage: 1,
    groupons: [],//团购商品
    banner: [],//广告
    coupon: [],//优惠券
    articles: [],//公告
    goodsCount: 0,
    indicatorDots: false,
    window: false,
    colseCoupon: false,
    navigateIconData: [],
    rConfig: {},
    grouponList: []
  },

  navigateToMiniProgram(e) {
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.appid,
      path: e.currentTarget.dataset.path,
      success(res) {
        // 打开其他小程序成功同步触发
        // wx.showToast({
        //  title: '跳转成功'
        // })
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '云好省',
      desc: '您的省钱利器',
      path: '/pages/index/index?shareUserId=' + user.getSid()
    }
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      pddGoods: [],
      pddTotalResult: 0,
      pddPage: 1,
      banner:[]
    });
    this.getBanner();
    this.getIndexData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  getBannerIndexData: function () {
    let that = this;
    that.setData({ rConfig: wx.getStorageSync('rConfig') });
    var sid = user.getSid();
    var apiKey = that.data.jtkApikey;
    //拼多多 话费
    util.request(api.yhsJtkBar,{
      type:1,
      param:'Pdd/act?apikey='+apiKey+'&resource_type=39997&sid=' + sid
    },'POST').then(function (res) {
      if (res.code == 0) {return;}
      let pddhf = {
        app_id: JSON.parse(res.value).data.we_app_info.app_id,
        page_path: JSON.parse(res.value).data.we_app_info.page_path,
        icon: '/static/images/svg/home_icon_hf.svg',
        title: '话费充值'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(pddhf)
      });
    });
    //拼多多 火车票
    util.request(api.yhsJtkBar,{type:1,param: 'Pdd/act?apikey='+apiKey+ '&resource_type=50005&sid=' + sid},'POST').then(function (res) {
      if (res.code == 0) {return;}
      let pddhcp = {
        app_id: JSON.parse(res.value).data.we_app_info.app_id,
        page_path: JSON.parse(res.value).data.we_app_info.page_path,
        icon: '/static/images/svg/home_icon_hcp.svg',
        title: '火车票'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(pddhcp)
      });
    });
    //美团酒店
    util.request(api.yhsJtkBar,{type:1,param:'Meituan/act?apikey='+apiKey + '&type=6&sid=' + sid},'POST' ).then(function (res) {
      if (res.code == 0) {return;}
      let mtjiudian = {
        app_id: JSON.parse(res.value).data.we_app_info.app_id,
        page_path: JSON.parse(res.value).data.we_app_info.page_path,
        icon: '/static/images/svg/home_icon_jiudian.svg',
        title: '美团酒店'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(mtjiudian)
      });
    });
    //美团外卖
    util.request(api.yhsJtkBar,{type:1,param:'Meituan/act?apikey='+apiKey + '&type=1&sid=' + sid},'POST').then(function (res) {
      if (res.code == 0) {
        return;
      }
      let mtwaimai = {
        app_id: JSON.parse(res.value).data.we_app_info.app_id,
        page_path: JSON.parse(res.value).data.we_app_info.page_path,
        icon: '/static/images/svg/home_icon_mt.svg',
        title: '美团外卖'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(mtwaimai)
      });
    });
    //饿了么外卖
    util.request(api.yhsJtkBar,{type:1,param:'Ele/act?apikey='+apiKey+'&type=3'+ '&sid=' + sid},'POST').then(function (res) {
      if (res.code == 0) {
        return;
      }
      let elmwaimai = {
        app_id: JSON.parse(res.value).data.app_id,
        page_path: JSON.parse(res.value).data.wx_miniprogram_path,
        icon: '/static/images/svg/home_icon_elm.svg',
        title: '饿了么'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(elmwaimai)
      });
    });
    //滴滴打车
    util.request(api.yhsJtkBar,{type:1,param: 'didi/act?apikey=' +apiKey+ '&type=1&sid=' + sid},'POST').then(function (res) {
      if (res.code == 0) {
        return;
      }
      let dddache = {
        app_id: JSON.parse(res.value).data.app_id,
        page_path: JSON.parse(res.value).data.wx_miniprogram_path,
        icon: '/static/images/svg/dache.svg',
        title: '滴滴打车'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(dddache)
      });
    });
    //滴滴加油
    util.request(api.yhsJtkBar,{type:1,param: 'didi/act?apikey=' + apiKey + '&type=2&sid=' + sid},'POST').then(function (res) {
      if (res.code == 0) {
        return;
      }
      let ddjiayou = {
        app_id: JSON.parse(res.value).data.app_id,
        page_path: JSON.parse(res.value).data.wx_miniprogram_path,
        icon: '/static/images/svg/jiayou.svg',
        title: '优惠加油'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(ddjiayou)
      });
    });
    //滴滴货运
    util.request(api.yhsJtkBar,{type:1,param: 'didi/act?apikey=' +apiKey+ '&type=3&sid=' + sid},'POST').then(function (res) {
      if (res.code == 0) {
        return;
      }
      let ddhy = {
        app_id: JSON.parse(res.value).data.app_id,
        page_path: JSON.parse(res.value).data.wx_miniprogram_path,
        icon: '/static/images/svg/huoyun.svg',
        title: '货运搬家'
      }
      that.setData({
        navigateIconData: that.data.navigateIconData.concat(ddhy)
      });
    });
    //饿了么生鲜
    util.request(api.yhsJtkBar,{type:1,param :'Ele/act?apikey='+apiKey+ '&type=5&sid=' + sid},'POST').then(function (res) {
      that.setData({
        elmsx: JSON.parse(res.value).data
      });
    });
    util.request(api.yhsAffiche, {
      "type": '2',
      "startPage": 1,
      "pageSize": 50
    }, 'POST').then(function (res) {
      that.setData({
        articles: res.value.list
      });
    });
  },
  openMoviec() {
    //这里打开的链接仅用于演示，正式部署线上之后，当用户点击时该链接需要通过接口来实时获取，接口文档：https://www.jutuike.com/doc/21
    wx.navigateTo({
      url: '/pages/web/web?url=' + encodeURIComponent('https://qz-m.dtsoft.cn/cinema/?platformId=10435&token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQ1MjQyODgsInVzZXJJZCI6MjMxODI5MDMsInVzZXJOYW1lIjoianV0dWlrZSIsInRva2VuVHlwZSI6MH0.VnCzpcYftwOwb9SU025zq1ds4Gsx4Q0ceAXDm34Ov1s&backIndex=true&backIndexType=0'),
    })
  },
  handleClick: function (e) {
    let data = e.currentTarget.dataset.value;
    let source = e.currentTarget.dataset.source;
    // 商品
    wx.navigateTo({
      url: '../goods/goods?id=' + data.goodsId + '&source=' + source + '&sid=' + user.getSid()
    });
  },
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getIndexData: function () {
    let that = this;
    that.setData({ rConfig: wx.getStorageSync('rConfig') });
    util.request(api.yhsJtkBar,{
      type:2,
      param:'union/query_goods?pub_id=6016&cat=' + that.getRandomInt(1, 5) + '&source=vip&pageSize=20'
    },'POST').then(function (res) {
      that.setData({
        vip: JSON.parse(res.value).data,//唯品会
      });
    });

    util.request(api.yhsJtkBar,{
      type:2,
      param:'union/query_goods?pub_id=6016&cat=' + that.getRandomInt(1, 5) + '&source=jd&pageSize=20'
    },'POST').then(function (res) {
      that.setData({
        jdGoods: JSON.parse(res.value).data,//唯品会
      });
    });

    util.request(api.yhsJtkBar,{
      type:2,
      param:'union/query_goods?pub_id=6016&cat=' + that.getRandomInt(1, 5) + '&source=pdd&pageSize=20'
    },'POST').then(function (res) {
      that.setData({
        pddGoods: JSON.parse(res.value).data,
        pddTotalResult: JSON.parse(res.value).total_results,
      });
    });
  },
  getBanner(){
    let that = this;
    util.request(api.yhsActivity,{"type":"2","startPage":1,"pageSize":20},'POST').then(function(res){
      if(res.code == 1){
        that.setData({
          banner: res.value,//首页广告
        });
      }
    });
  },
  onLoad: function (options) {
    let that = this;
    that.getBanner();
    that.getBannerIndexData();
    that.getIndexData();
    util.request(api.yhsReturnConfig + '?cpsType=1002').then(function (res) {
      let rConfig;
      if (res.code === 1) {
        rConfig = res.value;
      } else {
        rConfig = { "returnRmbScale": 0.5, "returnIntegralScale": 0.5 }
      }
      wx.setStorageSync('rConfig', rConfig);
    });
    // 页面初始化 options为页面跳转所带来的参数
    if (options.scene) {
      //扫码绑定
      const scene = decodeURIComponent(options.scene);
      // 这个是处理图片二维码分享
      if(scene.split(',').length == 2){
        // 个人中心邀请二维码
        wx.setStorageSync('shareUserId', scene.split(',')[1]);
      }else{
        // 商品的图片分享
        util.request(api.yhsGetShareParam + '?key=' + decodeURIComponent(scene)).then(function(res) {
          if(res.code == 1){
            let str = res.value.split("@");
            wx.setStorageSync('shareUserId', str[0]); 
            if (str.length == 3 && str[2] == 'join') {
              util.request(api.yhsTgGoodsLst, {
                startPage: 1,
                pageSize: app.globalData.pageSize,
                teamId: str[1]
              }, 'POST').then(function (res) {
                if (res.code === 1 && res.value.recordCount > 0) {
                  that.goJoinGoods(res);
                }
              });
            } else if(str.length == 3){
              wx.navigateTo({
                url: '../goods/goods?id=' + str[1] + "&source=" + str[2] + "&sid=" + user.getSid()
              });
            }
          }
          
        });
      }
    }
    // 这个是处理小程序分享 如果有分享用户，则设置
    if (options.shareUserId) {
      wx.setStorageSync('shareUserId', options.shareUserId);
    }
    if (options.sceneType) {
      if (options.sceneType == 'goods') {
        // 分享出去的商品 如果用户登录了就不用分享的id
        wx.navigateTo({
          url: '../goods/goods?id=' + options.goodId + "&source=" + options.source + "&sid=" + user.getSid()
        });
      } else if (options.sceneType == 'join') {
        util.request(api.yhsTgGoodsLst, {
          startPage: 1,
          pageSize: app.globalData.pageSize,
          teamId: options.teamId
        }, 'POST').then(function (res) {
          if (res.code === 1 && res.value.recordCount > 0) {
            that.goJoinGoods(res);
            return;
          }
        });
      } else {
        wx.navigateTo({
          url: '../index/index'
        });
      }
    }
  },
  onReady: function () {

  },
  goJoinGoods: function (res) {

    let goods = res.value.recordList[0];
    goods.goodsCarouselPictures = goods.carouselPicture.split(',');
    goods.goodsDetailPictures = goods.detailsPicture.split(',');
    goods.marketPrice = goods.originalPrice;
    goods.price = goods.joinPrice;
    goods.goodsId = goods.id;
    wx.navigateTo({
      url: '/pages/goods/goods?data=' + JSON.stringify(goods)
    })
  },
  onShow: function () {
    // 页面渲染完成
    let that = this;
    // 判断是否弹出领取窗口
    util.request(api.yhsAwardConfig + '?awardType=12').then(function (res) {
      if (res.code === 1 && res.value.selfAwardSwitch != 0) {
        var date = new Date();
        var dt = util.formatHour(date);
        if (dt >= res.value.miniAwardTimeLimit.split(',')[0] && dt <= res.value.miniAwardTimeLimit.split(',')[1]) {
          that.setData({ window: true });
        }
      }
    });
    util.request(api.yhsTgGoodsLst, {
      startPage: 1,
      pageSize: 8
    }, 'POST').then(function (res) {
      if (res.code === 1) {
        var grouponList = [];
        for (var index in res.value.recordList) {
          var obj = {
            goodsThumbUrl: res.value.recordList[index].coverPicture,
            marketPrice: res.value.recordList[index].originalPrice,
            price: res.value.recordList[index].joinPrice,
            goodsName: res.value.recordList[index].goodsName,
            goodsId: res.value.recordList[index].id
          }
          grouponList.push(obj)
        }
        that.setData({
          grouponList: grouponList,
        });
      }
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onColse: function () {
    this.setData({
      window: false,
      colseCoupon: true
    });
  },
  onReachBottom() {
    let that = this;
    if (Math.ceil(that.data.pddTotalResult / 20) > that.data.pddPage) {
      that.setData({
        pddPage: that.data.pddPage + 1
      });
      util.request(api.yhsJtkBar,{
        type:2,
        param:'union/query_goods?pub_id=6016&cat=' + that.getRandomInt(1, 5) + '&source=vip&pageSize=20&page=' + that.data.pddPage
      },'POST').then(function (res) {
        that.setData({
          pddGoods: that.data.pddGoods.concat(JSON.parse(res.value).data),
          pddTotalResult: JSON.parse(res.value).total_results,
        });
      });
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  goGroupon() {
    wx.switchTab({
      url: '/pages/groupon/grouponList/grouponList'
    });
  },
  goGoods(e) {
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
      return;
    }
    let data = e.currentTarget.dataset.value;
    let goods = {
      id: data.goodsId
    }
    try {
      wx.navigateTo({
        url: '/pages/goods/goods?data=' + JSON.stringify(goods)
      })
    } catch (e) { }
  }
})