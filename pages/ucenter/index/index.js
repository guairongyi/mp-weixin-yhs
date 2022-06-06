var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '点击登录',
      avatarUrl: '/static/images/avatar.png'
    },
    order: {
      unpaid: 0,
      unship: 0,
      unrecv: 0,
      uncomment: 0
    },
    value: {},
    rmbAccount: 0,
    integralAccount: 0,
    inviteCountTotal: 0,
    MyMenus: [
      { url: "/pages/groupon/myGroupon/myGroupon", pic: "my/group.png", name: "团购记录" },
      { url: "/pages/groupon/myShopOrder/myShopOrder", pic: "my/order.png", name: "兑换订单" },
      { url: "/pages/ucenter/address/address", pic: "my/address.png", name: "地址管理" },
      { url: "/pages/ucenter/feedback/feedback", pic: "my/feedback.png", name: "意见反馈" },
      // { url: "/pages/ucenter/share/share", pic: "friend_1.png", name: "邀请码" },
      { url: "/pages/about/about", pic: "my/about_us.png", name: "关于我们" }

    ],
    hasLogin: false,
    totalAmount: 0.00
  },

  /**
   * 页面跳转
  */
  goPages: function (e) {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  onShow: function () {
    //获取用户的登录信息
    let that = this;
    if (app.globalData.hasLogin) {
      util.request(api.yhsGetUserInfo).then(function (res) {
        if (res.code === 1) {
          that.setData({
            userInfo: res.value,
            hasLogin: true
          });
          wx.setStorageSync('userInfo', res.value);
        }
      });
      util.request(api.yhsAccountInfo, { requestData: util.encryptorJsonData({ "accountType": null }) }, 'POST').then(function (res) {
        if (res.code === 1) {
          that.setData({
            value: res.value,
            rmbAccount: res.value.rmbAccount, // 零钱余额
            integralAccount: res.value.integralAccount,// 积分余额
            inviteCountTotal: res.value.inviteCountTotal,// 推广总人数
          });
        }
      });
      util.request(api.yhsDirectUser, {
        "startPage": that.data.page, "pageSize": that.data.pageSize
      }, 'POST').then(function (res) {
        console.log(res);
        if (res.code === 1) {
          that.setData({
            inviteCountTotal: res.value.childCount
          });
        }
      });
    }
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
  goLogin() {
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goRank() {
    wx.navigateTo({
      url: "/pages/ranklist/ranklist"
    });
  },
  goBrokerage() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/brokerage/main/main"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goOrder() {
    if (this.data.hasLogin) {
      try {
        wx.setStorageSync('tab', 99);
      } catch (e) {

      }
      wx.navigateTo({
        url: "/pages/ucenter/order/order"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrderIndex(e) {
    if (this.data.hasLogin) {
      let tab = e.currentTarget.dataset.index
      let route = e.currentTarget.dataset.route
      try {
        wx.setStorageSync('tab', tab);
      } catch (e) {

      }
      wx.navigateTo({
        url: route,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goAfterSale: function () {
    wx.showToast({
      title: '目前不支持',
      icon: 'none',
      duration: 2000
    });
  }
})