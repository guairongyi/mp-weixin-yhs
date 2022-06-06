var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
var lastTime = null;

Page({
  data: {
    checkedAddress: {},
    addrdata: {},
    goods: {},
    type: '',
    next:false,
    isPasswdFocus: false,
    passwd: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.goods) {
      this.setData({
        goods: JSON.parse(options.goods)
      });
    }
    if (options.type) {
      this.setData({
        type: options.type
      });
      if(options.type == 2){
        util.request(api.yhsChangeList, {
          startPage:1,
          pageSize:10,
          serialNumber:this.data.goods.serialNumber
          //requestData: util.encryptorJsonData(reqData)
        }, 'POST').then(res => {
          if(res.code == 1){
            let product = res.value.exchangeGoodsList[0];
            product.goodsCarouselPictures = product.carouselPicture.split(',');
            product.goodsDetailPictures = product.detailsPicture.split(',');
            product.goodsId = product.id;
            product.marketPrice= product.originalPrice;
            product.coverPicture = product.coverPicture;
            product.price = product.unitPriceIntegral;
            this.setData({goods:product});
          }
        });
      }
    }
  },

  //获取checkou信息
  getCheckoutInfo: function () {
  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/ucenter/address/address?isJoin=true',
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    try {
      var addrdata = wx.getStorageSync('addrdata');
      if (addrdata) {
        this.setData({
          'addrdata': addrdata
        });
      }
    } catch (e) {
      console.log(e);
    }
    this.getCheckoutInfo();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  submitOrder: function () {
    let that = this;
    if (that.data.addrdata.id <= 0) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    //如果是海淘商品，需检查地址中是否有身份证信息

    let nowTime = + new Date();
    if (nowTime - lastTime > 5000 || !lastTime) { //5秒内避免重复提交订单
      lastTime = nowTime;
    } else {
      return false;
    }
    if (that.data.type == 1) {
      // 团购
      let reqData = {
        teamId: that.data.goods.id,
        addressId: that.data.addrdata.id
      }
      util.request(api.yhsJoinTeam, {
        requestData: util.encryptorJsonData(reqData)
      }, 'POST').then(res => {
        if (res.code === 1) {
          wx.showModal({
            title: '提示',
            content: '参团成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2,
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '参团失败',
            content: res.msg,
            showCancel: false
          });
        }
      });
    } else {
      if (that.data.addrdata.id <= 0) {
        util.showErrorToast('请选择收货地址');
        return false;
      }
      that.setData({ next: true })
    }
  },
  setPasswdValue: function (e) {
    var that = this;
    that.setData({ passwd: e.detail.value });
  },
  onFocus: function (e) {
    var that = this;
    that.setData({ isPasswdFocus: true });
  },
  confirm: function () {
    var that = this;
    if (that.data.passwd.length == 6) {
      var reqData = {
          exchangeId: that.data.goods.exchangeId,
          serialNumber: that.data.goods.serialNumber,
          count: 1,
          tradePassword: that.data.passwd,
          payType: 2,
          addressId: that.data.addrdata.id
      }
      util.request(api.yhsGoodsChange, {
        requestData: util.encryptorJsonData(reqData)
      }, 'POST').then(res => {
        if(res.code == 1){
          wx.showModal({
            title: '提示',
            content: '兑换成功，请到个人中心兑换订单中查看详情！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2,
                })
              }
            }
          })
        }else{
          wx.showModal({
            title: '操作失败',
            content: res.msg,
            showCancel: false,
            success: function(res){
              if (res.confirm) {
                wx.navigateBack({
                  delta: 0,
                })
              }
            }
          });
        }
      });
    } else {
      wx.showToast({
        title: '密码长度不正确',
      })
    }
  },
});