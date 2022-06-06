// 以下是业务服务器API地址
 // 本机开发API地址
var yhsApiRoot = 'https://yhs.guairongyi.com/yhsapi/';
// var yhsApiRoot = 'http://47.115.17.103:8888/yhsapi/'
// var yhsApiRoot = 'http://192.168.110.194:8888/yhsapi/'

module.exports = {
  yhsJtkBar:yhsApiRoot + 'api/cps/jutuiProd/transmit',

  yhsGetShareParam:yhsApiRoot + 'api/user/getShareParam',// 小程序二维码长度过长问题解决

  yhsActivity:yhsApiRoot + 'api/activity/infoList',// 小程序广告
  yhsRank: yhsApiRoot + 'api/ranking/rankingList',//排行榜
  yhsWePay: yhsApiRoot + 'api/account/weChatTopUp',//充值
  yhsTransFile: yhsApiRoot + 'file/fileTransition',//文件转换为我方合法域名
  yhsAffiche:yhsApiRoot + 'api/afficheInfo/afficheList',//公告列表
  yhsLogicInfo:yhsApiRoot + 'logistics/logisticsInfo',//获取物流信息

  yhsTgGoodsLst:yhsApiRoot + 'api/clustering/goodsTeamList',//团购商品列表
  yhsMytgRecords:yhsApiRoot + 'api/clustering/userTeamRecordList',//我的团购记录
  yhsJoinTeam:yhsApiRoot + 'api/clustering/joinTeam',// 参团
  yhsTgOrder:yhsApiRoot + 'api/order/orderList',//团购订单
  yhsChange:yhsApiRoot + 'api/exchange/exchangeGoods',//兑换
  yhsGoodsChange:yhsApiRoot + 'api/exchange/exchangeGoods',//积分兑换
  yhsChangeList:yhsApiRoot + 'api/exchange/goodsExchangeList',// 可兑换积分列表
  yhsSubUser: yhsApiRoot + 'api/clustering/subsidyUser', //获得补贴用户列表

  yhsAddressDelete: yhsApiRoot + 'api/user/deleteAddress', //删除收货地址
  yhsAddressSave: yhsApiRoot + 'api/user/addAddress', //保存收货地址
  yhsaddressUpdate:yhsApiRoot + '/api/user/updateAddress',// 修改收货地址
  yhsAddressList: yhsApiRoot + 'api/user/addressList', //收货地址列表
  yhsAreaCode:yhsApiRoot + 'areaCode/cascadeCode', //地区级连

  yhsUserAwardInfo: yhsApiRoot + 'api/user/userAwardInfo', //注册奖励
  yhsQcode: yhsApiRoot + 'api/user/shareQrCode', //获取二维码
  yhsAwardConfig: yhsApiRoot + 'api/user/inviteAwardConfig',// 
  yhsGetMiniAward:yhsApiRoot + 'api/user/getMiniAward',// 小程序领取红包
  yhsServerTime:yhsApiRoot + 'api/user/getTime',// 获取服务器时间
  yhsGetUserInfo:yhsApiRoot + 'api/user/getUserInfo',//获取用户信息
  yhsLogout: yhsApiRoot + 'api/user/outLogin', //账号登出
  yhsWechatwd:yhsApiRoot + 'api/account/weChatWithdrawal',//提现
  yhsFileUpload:yhsApiRoot + 'file/addFile', //公共文件上传
  yhsFeedBack:yhsApiRoot + 'api/feedback/submitFeedback', // 提交意见反馈
  yhsYuGu:yhsApiRoot + 'api/user/behaviorInfo',//获取预估数据
  yhsDirectUser:yhsApiRoot + 'api/user/directUser', //直推好友
  yhsAccountInfo: yhsApiRoot + 'api/user/accountInfo', // 账户汇总信息
  yhsUserAccountRecord:yhsApiRoot + 'api/user/accountRecord', // 账户明细记录
  yhsAuthWxLogin: yhsApiRoot + 'api/user/weiXinAuthorization',
  yhsRegOrBind:yhsApiRoot + 'api/user/weiXinBindOrReg',
  yhsReturnConfig:yhsApiRoot + 'api/cps/tbProd/getReturnScale', // 返利比例配置 1001:淘宝 1002:聚推客
  yhsGetSmsCode:yhsApiRoot + 'api/user/getSmsCode', 
  yhsUpdateTransPasswd:yhsApiRoot + 'api/user/updateTradePassword', //设置交易密码
  jhOrders:yhsApiRoot + 'api/cps/jutuiProd/orderList', //聚合订单
  
};
