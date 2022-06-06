var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    addressList: [],
    isJoin: false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.isJoin) {
      this.setData({
        isJoin: true
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAddressList();
  },
  getAddressList() {
    let that = this;
    util.request(api.yhsAddressList + '?type=0').then(function (res) {
      if (res.code === 1) {
        that.setData({
          addressList: res.value
        });
      }
    });
  },
  addressAddOrUpdate(event) {
    console.log(event)
    let that = this;
    //返回之前，先取出上一页对象，并设置addressId
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.route == "pages/checkout/checkout") {
      if (that.data.isJoin) {
        let addrdata = event.currentTarget.dataset.addrdata;
        try {
          wx.setStorageSync('addrdata', addrdata);
        } catch (e) {
        }
        // wx.navigateBack();
      }
      let addressId = event.currentTarget.dataset.addressId;
      if (addressId && addressId != 0) {
        wx.navigateBack();
      } else {
        wx.navigateTo({
          url: '/pages/ucenter/addressAdd/addressAdd?id=' + addressId
        })
      }

    } else {
      wx.navigateTo({
        url: '/pages/ucenter/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId
      })
    }
  },
  selectAddrs(event) {
    let that = this;
    if (that.data.isJoin) {
      let addrdata = event.currentTarget.dataset.addrdata;
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      if (prevPage.route == "pages/checkout/checkout") {
        try {
          wx.setStorageSync('addrdata', addrdata);
        } catch (e) {
        }
        wx.navigateBack();
      }
    }
  },
  deleteAddress(event) {
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.yhsAddressDelete + '?addressId=' + addressId).then(function (res) {
            if (res.code === 1) {
              that.getAddressList();
              wx.removeStorage({
                key: 'addressId',
                success: function(res) {},
              })
            }
          });
          console.log('用户点击确定')
        }
      }
    })
    return false;

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})