const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

var app = getApp();

Component({
  properties: {
    window:{
      type: Boolean,
      value: true,
    },
    // couponList:{
    //   type:[],
    //   value:[{"startTime":'2222',"desc":'ssdsafds'}],
    // }
  },
  data: {
  
  },
  attached: function () {
  
  },
  methods: {
    close:function(){
      this.triggerEvent('onColse');
    },
    getAllCoupon: function () {
      let that = this;
      if (!app.globalData.hasLogin) {
        wx.navigateTo({
          url: "/pages/auth/login/login"
        });
        return;
      }
      util.request(api.yhsGetMiniAward,{
        requestData: util.encryptorJsonData({"key":"mini"})
      },'POST').then(res => {
        if(res.code ===1){
          if (res.value.state === 1) {
            util.showMsg('今天您已经领取过了喔');
          }
          if(res.value.state === 4){
            util.showMsg('恭喜您成功领取：' + res.value.awardNum + '元红包');
          }
          if(res.value.state === 2 || res.value.state === 3){
            util.showMsg('今天的红包已经领完了，明天早点来哟');
          }
          that.close();
        }else {
          util.showErrorToast(res.msg);
        }
        
      })
    },
  }
})