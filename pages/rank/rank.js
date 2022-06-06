var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp()

Page({
  data: {
    rankList: []
  },
  onLoad() {
    this.getHotData();
    console.log();
  },
  onPullDownRefresh() {
  },
  getData(e){
    let that = this;
    wx.showNavigationBarLoading()
    util.request(api.yhsRank + '?type=' + e).then(function(res){
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      if(res.code == 1){
        that.setData({ rankList:res.value })
      }
    });
  },
  getHotData() {
    this.getData(1)
  },
  getJiangLiData() {
    this.getData(2)
  },
  getShareData(){
    this.getData(3)
  },
  tapRankItem(event) {
    const index = event.currentTarget.dataset.index
    const rankList = this.data.rankList
    rankList[index].open = !rankList[index].open
    this.setData({ rankList })
  }
})
