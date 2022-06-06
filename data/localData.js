// 本地模拟json数据
var tgbn = [
    {"url":"https://yhsres.guairongyi.com/activity/tuangou1.jpg"},
    {"url":"https://yhsres.guairongyi.com/activity/tuangou2.jpg"},
    {"url":"https://yhsres.guairongyi.com/activity/tuangou3.jpg"},
]
var banner = [
    {
        "id": 1,
        "name": "限时秒杀",
        "link": "",
        "url": "https://www.jutuike.com/static/images/miaosha.png",
        "enabled": true,
        "appId": 'wxa918198f16869201',
        "path": '/pages/web/web?specialUrl=1&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fduo_transfer_channel.html%3FresourceType%3D4%26pid%3D8516041_141204175%26customParameters%3D6016jutuike888888%26authDuoId%3D8516041%26cpsSign%3DCE_210920_8516041_141204175_62b378b0badf637c7f3fd0ac5359ee50%26duoduo_type%3D2',
        "addTime": "2018-02-01 00:00:00",
        "updateTime": "2019-10-05 21:10:27",
        "deleted": false
    },
    {
        "id": 2,
        "name": "拼多多火车票",
        "link": "",
        "url": "https://yhsres.guairongyi.com/activity/elmsx.jpeg",
        "appId": 'wxa918198f16869201',
        "path": '/pages/web/web?specialUrl=1&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fduo_transfer_channel.html%3FresourceType%3D40000%26pid%3D8516041_70976268%26customParameters%3D6016jutuike888888%26authDuoId%3D8516041%26cpsSign%3DCE_210920_8516041_70976268_bd2a053945a880ee509503894a4e6cb9%26duoduo_type%3D2',
        "enabled": true,
        "addTime": "2018-02-01 00:00:00",
        "updateTime": "2019-10-05 21:10:55",
        "deleted": false
    }
]

var articles = [
    {
        "id": 1,
        "type": "1",
        "title": "云好省您的生活帮手",
        "addTime": "2019-05-17 22:23:13"
    },
    {
        "id": 2,
        "type": "1",
        "title": "各种优惠券满足您的日常生活所需",
        "addTime": "2019-05-16 22:24:02"
    },
    {
        "id": 3,
        "type": "1",
        "title": "没人会拒绝多一个选择",
        "addTime": "2019-05-16 22:24:02"
    },
]

var groupons = [{
    "groupon_price": 34.38,
    "goods": {
        "id": 23841,
        "name": " 飞科FH6811 直发器专业恒温烫发铝制加热夹板",
        "brief": " 飞科FH6811 直发器专业恒温烫发铝制加热夹板",
        "picUrl": "https://cbu01.alicdn.com/img/ibank/2018/015/710/8705017510_490508976.400x400.jpg",
        "counterPrice": 44.85,
        "retailPrice": 37.38
    },
    "groupon_member": 3
}]

var groupupList = { "data": [{ "groupon_price": 34.38, "goods": { "id": 23841, "name": " 飞科FH6811 直发器专业恒温烫发铝制加热夹板", "brief": " 飞科FH6811 直发器专业恒温烫发铝制加热夹板", "picUrl": "https://cbu01.alicdn.com/img/ibank/2018/015/710/8705017510_490508976.400x400.jpg", "counterPrice": 44.85, "retailPrice": 37.38 }, "groupon_member": 3 }], "count": 1 }

var order = { "errno": 0, "data": { "data": [{ "consignee": "111", "address": "北京市 市辖区 东城区 11111", "addTime": "2021-09-20 06:16:46", "orderSn": "20210920454566", "actualPrice": 43.38, "mobile": "13333333333", "goodsList": [{ "id": 288, "orderId": 172, "brandId": 1001000, "goodsId": 23841, "goodsName": " 飞科FH6811 直发器专业恒温烫发铝制加热夹板", "goodsSn": "23841", "productId": 339100, "number": 1, "price": 37.38, "specifications": ["标准"], "picUrl": "https://cbu01.alicdn.com/img/ibank/2018/015/710/8705017510_490508976.400x400.jpg", "comment": 0, "addTime": "2021-09-20 06:16:47", "updateTime": "2021-09-20 06:16:47", "deleted": false }], "orderStatusText": "未付款", "isGroupin": true, "goodsPrice": 37.38, "id": 172, "freightPrice": 6.00, "handleOption": { "cancel": true, "delete": false, "pay": true, "comment": false, "confirm": false, "refund": false, "rebuy": false } }], "count": 1, "totalPages": 1 }, "errmsg": "成功" }




// 定义数据出口
module.exports = {
    bannerList: banner,
    articles: articles,
    groupons: groupons,
    grouponlist: groupupList,
    tgbn:tgbn
}