# yhs-flutter

CPS商城系统。
系统包含 Spring Boot后端 + Vue管理员前端 + 微信小程序用户前端 + RN用户前端 + Flutter用户前端

### 技术选型

#### 后端技术

| 技术                 | 说明                | 官网                                                 |
| -------------------- | ------------------- | ---------------------------------------------------- |
| SpringBoot           | 容器+MVC框架        | https://spring.io/projects/spring-boot               |
| SpringSecurity       | 认证和授权框架      | https://spring.io/projects/spring-security           |
| MyBatis              | ORM框架             | http://www.mybatis.org/mybatis-3/zh/index.html       |
| PageHelper           | MyBatis物理分页插件 | http://git.oschina.net/free/Mybatis_PageHelper       |
| Swagger-UI           | 文档生产工具        | https://github.com/swagger-api/swagger-ui            |
| Redis                | 分布式缓存          | https://redis.io/                                    |
| Docker               | 应用容器引擎        | https://www.docker.com                               |
| Druid                | 数据库连接池        | https://github.com/alibaba/druid                     |
| OSS                  | 对象存储            | https://github.com/aliyun/aliyun-oss-java-sdk        |
| JWT                  | JWT登录支持         | https://github.com/jwtk/jjwt                         |
| Lombok               | 简化对象封装工具    | https://github.com/rzwitserloot/lombok               |
| Jenkins              | 自动化部署工具      | https://github.com/jenkinsci/jenkins                 |


#### 前端技术


| 技术       | 说明                  | 官网                                   |
| ---------- | --------------------- | -------------------------------------- |
| Vue        | 前端框架              | https://vuejs.org/                     |
| Vue-router | 路由框架              | https://router.vuejs.org/              |
| Vuex       | 全局状态管理框架      | https://vuex.vuejs.org/                |
| Element    | 前端UI框架            | https://element.eleme.io               |
| Axios      | 前端HTTP框架          | https://github.com/axios/axios         |
| React-Native  | APP客户端        | https://www.react-native.cn |
| Flutter  | APP客户端            | https://www.flutterchina.club/  |
| 微信小程序  | 微信小程序            | https://developers.weixin.qq.com/miniprogram/dev/framework  |

### ~~服务端 JAVA~~
* 预计7月中旬开放
### ~~管理后台 VUE~~
* 预计7月中旬开放

### APP实例 `源码逐步开放`
* [react-native版本](https://github.com/guairongyi/rn-app-yhs)
* [flutter版本](https://github.com/guairongyi/flutter-app-yhs)
* [微信小程序](https://github.com/guairongyi/mp-weixin-yhs)
* 官方介绍地址
  > 1.　https://yhs.guairongyi.com/app_web_site/
* 华为应用市场
  > 2.　https://appgallery.huawei.com/app/C104679391
* 苹果应用市场
  > 3.　https://apps.apple.com/cn/app/id1584790809
* 微信小程序直接搜索云好省或扫描下方二维码

  ![微信小程序](https://github.com/guairongyi/rn-app-yhs/blob/master/doc/pics/xcx_code1.jpg)

> 注意：此实例为线上运营实例，开发者请不要尝试购买商品、付款、退款操作，如果发生交易行为将按正常行为处理。

## 功能

### APP功能 `不同平台可能会有些许差异`
- [x] 首页
    1. 轮播、CPS搜索、公告、火车票、话费重置、饿了么、优惠加油、美团外卖、货运打车、滴滴打车、美团酒店
    2. 拼团
    3. 唯品会商品
    4. 京东商品
    5. 拼多多商品
- [x] 拼团专区（自营商品）、积分兑换
- [x] 京东福利
- [x] 个人中心
    1. cps订单、团购订单、提现、邀请好友、客服
- [ ] 小程序直播
- [ ] 团购活动
- [ ] 秒杀活动
- [ ] 优惠券
- [ ] 砍价

![版权](https://github.com/guairongyi/rn-app-yhs/blob/master/doc/pics/sc.png)


### 管理平台功能

* 会员管理
* 商品管理
* CPS订单管理
* 推广管理
* 财务模块
* 系统管理
* 配置管理
* 统计报表

## 快速启动

1. 配置最小开发环境：
    * [MySQL](https://dev.mysql.com/downloads/mysql/)
    * [JDK1.8或以上](http://www.oracle.com/technetwork/java/javase/overview/index.html)
    * [Maven](https://maven.apache.org/download.cgi)
    * [Redis](https://www.redis.io)
    * [React-Native](https://www.react-native.cn)
    * [Flutter](https://www.flutterchina.club/)
    * [Nodejs](https://nodejs.org/en/download/)
    * [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

> 特别说明：APP端开发还需准备android/ios开发环境

2. 数据库导入yhs-java/sql下的数据库文件

3. 启动管理后台的后端服务

4. 启动管理后台前端

   打开命令行，输入以下命令
    ```bash
    git clone https://github.com/guairongyi/yhs-manager-ui.git
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    cd yhs-manager-ui
    cnpm install
    cnpm run dev
    ```

5. 启动前端


    1. 微信开发工具导入小程序项目;
    2. 项目配置，启用“不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书”
    3. 点击“编译”，即可在微信开发工具预览效果；
    4. 也可以点击“预览”，然后手机扫描登录（但是手机需开启调试功能）。
    5. react-native app
        yarn
        yarn run ios/android
    6、flutter app
        flutter pub get
        flutter run ****
注意：
> 微信登录、微信支付等功能需开发者设置才能运行，
> 更详细方案请参考[文档]()。


## 开发计划

## 警告

> 1. 本项目仅用于学习练习
> 2. 本项目还不完善，仍处在开发中，不承担任何使用后果
> 3. 如需商用请在qq群内告知作者
     ![版权](https://github.com/guairongyi/rn-app-yhs/blob/master/doc/pics/banquan.png)


## 问题

- QQ交流群 `32112314`，可获取各项目详细图文文档、疑问解答 [![](http://pub.idqqimg.com/wpa/images/group.png)](https://qm.qq.com/cgi-bin/qm/qr?k=36QDlBjCq4wtn9cnu2fzdMxztTgfHMVZ&jump_from=webapi)
![QQ群](https://github.com/guairongyi/rn-app-yhs/blob/master/doc/pics/qq.png)
* 开发者有问题或者好的建议可以用Issues反馈交流，请给出详细信息
* 在开发交流群中应讨论开发、业务和合作问题
* 如果真的需要QQ群里提问，请在提问前先完成以下过程：
    * 请仔细阅读本项目文档，查看能否解决；
    * 请百度或谷歌相关技术；
    * 请查看相关技术的官方文档，例如微信小程序的官方文档；

## 开源协议
- 请遵循原作者[Apache License 2.0](./LICENSE)开源协议
- Copyright (c) 2022-guairongyi