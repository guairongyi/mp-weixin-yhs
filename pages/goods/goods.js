var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');

Page({
  data: {
    id: 0,
    source: '',
    goods: {},
    relatedGoods: [],
    poster_qrcode: '',
    openShare: false,
    noCollectImage: '/static/images/icon_like.png',
    hasCollectImage: '/static/images/icon_like_checked.png',
    collectImage: '/static/images/icon_like.png',
    shareImage: '',
    canWrite: false, //用户是否获取了保存相册的权限
    rConfig: {},
    isGroupon: false,
    indicator: false
  },

  // 页面分享
  onShareAppMessage: function () {
    let that = this;
    let goods = that.data.goods;
    let title = '';
    if (that.data.isGroupon) {
      title = '超值团购，原价：¥' + goods.marketPrice + '--团购价：¥' + goods.price + '---' + goods.goodsName;
      return {
        title: title,
        desc: '好货分享',
        path: '/pages/index/index?teamId=' + goods.id + '&shareUserId=' + user.getSid() + "&sceneType=join"
      }
    } else {
      title = '原价：¥' + goods.marketPrice + '--现价：¥' + goods.price + '---' + goods.goodsName;
      return {
        title: title,
        desc: '好货分享',
        path: '/pages/index/index?goodId=' + goods.goodsId + '&shareUserId=' + user.getSid() + "&sceneType=goods" + "&source=" + that.data.source
      }
    }

  },

  shareFriendOrCircle: function () {
    let that = this;
    that.setData({
      shareImage: that.data.goods.goodsCarouselPictures[0]
    });

    if (that.data.openShare === false) {
      that.setData({
        openShare: !that.data.openShare
      });
    } else {
      return false;
    }
  },
  handleSetting: function (e) {
    var that = this;
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '不授权无法保存',
        showCancel: false
      })
      that.setData({ canWrite: false })
    } else {
      wx.showToast({
        title: '保存成功'
      })
      that.setData({ canWrite: true })
    }
  },
  // 保存分享图
  saveShare: function () {
    let that = this;
    var thumb_images = [
      that.data.goods.goodsCarouselPictures[0],
      // that.data.goods.goodsCarouselPictures[1],
      // that.data.goods.goodsCarouselPictures[2],
    ];
    util.request(api.yhsTransFile, thumb_images, 'POST').then(function (res) {
      if (res.code == 1) {
        var data = {
          thumb_images: res.value,
          name: that.data.goods.goodsName,
          goodsId: that.data.goods.goodsId,
          goodsType: that.data.isGroupon ? 'join' : that.data.source,
          marketPrice: that.data.goods.marketPrice,
          price: that.data.goods.price,
        }
        wx.navigateTo({
          url: '../poster/poster?data=' + encodeURIComponent(JSON.stringify(data))
        });
      }
    });
    return;
  },
  // 获取商品信息
  getGoodsInfo: function () {
    let that = this;
    if (that.data.isGroupon) {
      return;
    }
    util.request(api.yhsJtkBar,{type:2,param:'union/convert?pub_id=6016&goodsId=' + that.data.id + '&sid=' + user.getSid() + '&source=' + that.data.source},'POST').then(function (res) {
      if (res.code == 1) {
        that.setData({
          goods: JSON.parse(res.value).data
        });
        //WxParse.wxParse('goodsDetail', 'html', res.data.info.detail, that);
        //获取推荐商品
        that.getGoodsRelated();
      } else {

      }
    });
  },

  // 获取推荐商品
  getGoodsRelated: function () {
    let that = this;
    if (that.data.isGroupon) {
      return;
    }
    // 获取推荐商品
    util.request(api.yhsJtkBar,{
      type:2,param:'union/recommend?pub_id=6016&goodsId=' + that.data.id + '&source=' + that.data.source
    },'POST').then(function (res) {
      if (res.code === 1) {
        that.setData({
          relatedGoods: JSON.parse(res.value).data,
        });
      }
    });
  },
  onLoad: function (options) {
    let that = this;
    if (options.data) {
      that.setData({
        isGroupon: true,
        goods: JSON.parse(options.data)
      });
    }
    that.setData({ rConfig: wx.getStorageSync('rConfig') });
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id) {
      that.setData({
        id: options.id
      });
    }
    if (options.source) {
      that.setData({
        source: options.source
      });
    }
    that.getGoodsInfo();
    wx.getSetting({
      success: function (res) {
        //不存在相册授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function () {
              that.setData({
                canWrite: true
              })
            },
            fail: function (err) {
              that.setData({
                canWrite: false
              })
            }
          })
        } else {
          that.setData({
            canWrite: true
          });
        }
      }
    })
  },
  onShow: function () {
    // 页面显示
    var that = this;
    if (that.data.isGroupon) {
      //团购商品
      util.request(api.yhsTgGoodsLst, {
        startPage: that.data.startPage,
        pageSize: that.data.pageSize,
        teamId:that.data.goods.id
      }, 'POST').then(function (res) {
        if (res.code === 1 && res.value.recordCount > 0) {
          let product = res.value.recordList[0];
          product.goodsCarouselPictures = product.carouselPicture.split(',');
          product.goodsDetailPictures = product.detailsPicture.split(',');
          product.goodsId = product.id;
          product.marketPrice= product.originalPrice;
          product.coverPicture = product.coverPicture;
          product.price = product.joinPrice;
          that.setData({goods:product});
        }else{
          wx.showModal({
            title: '温馨提示',
            content: '该团已拼完，下次早点来吧!',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 0,
              })
            }
          });
          return;
        }
      });
    }
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  closeShare: function () {
    this.setData({
      openShare: false,
    });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },
  onReady: function () {
    // 页面渲染完成

  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getGoodsInfo();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //立即购买
  addFast: function (e) {
    let that = this;
    util.jhxLoadShow('加载中...');
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
      util.jhxLoadHide();
      return;
    }
    if (that.data.isGroupon) {
      try {
        //判断开团时间是否允许进入
        var date = new Date();
        if (that.data.goods.joinDay) {
          var systemDate = util.formatDay(date);
          if (systemDate < that.data.goods.joinDay) {
            wx.showModal({
              title: '提示',
              content: '团购未开始或已过期',
              showCancel: false
            });
            return;
          }
        }
        if (that.data.goods.joinTime) {
          var systemDate = util.formatHour(date);
          if (systemDate < that.data.goods.joinTime) {
            wx.showModal({
              title: '提示',
              content: '团购未开始或已过期',
              showCancel: false
            });
            return;
          }
        }
        wx.navigateTo({
          url: '/pages/checkout/checkout?type=1&goods=' + JSON.stringify(that.data.goods)
        })
      } catch (e) { }
      util.jhxLoadHide();
    } else {
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.appinfo.app_id,
        path: e.currentTarget.dataset.appinfo.page_path,
        complete(res) {
          util.jhxLoadHide();
        },
      })
    }
  },
  jfChange(){
    //util.showMsg('暂未开放，敬请期待！');
    let that = this;
    wx.navigateTo({
      url: '/pages/checkout/checkout?type=2&goods=' + JSON.stringify(that.data.goods)
    })
  }

})