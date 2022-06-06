// poster.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()
var tmpAvatarUrl = ""; /*用于绘制头像*/
var tmpThumbs = []; /*用于绘制产品图*/
var tmpQcode = "";
var drawing = false; /*避免多次点击保存按钮*/
Page({
  /**
   * 页面的初始数据
   */
  data: {
    circular: true, // swiper 是否采用衔接滑动
    current: 0, // swiper 当前所在滑块的 index
    avatar_url: '', // 渲染头像
    nickname: '', // 渲染昵称
    poster_qrcode: '', // 小程序码
    poster_qrtext: '长按识别，即可查看商品',
    pro_name: '',  //产品名
    pro_price: '',  // 产品价格
    slogan1: '我的小店上新了，',  // 标语 1
    slogan2: '快来一起快来一起看看吧!', // 标语 2
    thumb_images: [], // 渲染图片
    goodsId:'',
    goodsType:'',
  },
  onLoad: function (options) {
    var data = JSON.parse(decodeURIComponent(options.data));
    console.log('options', data)
    var userinfo = wx.getStorageSync('userInfo');
    console.log('用户信息', userinfo)
    // 渲染页面
    this.setData({
      avatar_url: userinfo.headFileUrl,
      nickname: userinfo.nickname,
      thumb_images: data.thumb_images,
      pro_price: data.price,
      pro_name: data.name,
      goodsId:data.goodsId,
      goodsType:data.goodsType
    })

    //  保存网络图片到本地   用于绘制图片保存到本地
    wx.getImageInfo({
      src: userinfo.headFileUrl,
      success: (res) => {
        tmpAvatarUrl = res.path;
      }
    });
    // 保存产品图到本地相册
    var thumbs = data.thumb_images;
    tmpThumbs = []; // 先清空，再添加新的产品图
    thumbs.forEach((item, i) => {
      wx.getImageInfo({
        src: item,
        success: (res) => {
          tmpThumbs.push(res.path)
        }
      })
    });
  },
  // 根据swiper组件的current属性判断当前展示的海报
  shareChange: function (e) {
    if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current
      })
    }
  },

  /*保存海报到手机相册*/
  savePoster: function (e) {
    var that = this;
    var current = this.data.current;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //这里是用户同意授权后的回调
              that.drawPoster(current);
            },
            fail() { //这里是用户拒绝授权后的回调
              wx.showModal({
                title: '提示',
                content: '若不打开授权，则无法将图片保存在相册中！',
                showCancel: true,
                cancelText: '去授权',
                cancelColor: '#000000',
                confirmText: '暂不授权',
                confirmColor: '#3CC51F',
                success: function (res) {
                  if (res) {
                    wx.openSetting({
                      //调起客户端小程序设置界面，返回用户设置的操作结果。
                    })
                  } else {
                    // console.log('用户点击取消')
                  }
                }
              })
            }
          })
        } else { //用户已经授权过了 
          that.drawPoster(current);
        }
      }
    })
  },

  /* 绘制海报*/
  drawPoster: function (current) {
    if (drawing) {
      wx.showToast({
        title: '绘制中……',
        icon: 'loading',
        duration: 3000
      })
    } else {
      drawing = true;
      // loading 
      // 根据swiper当前所在滑块的 index判断绘制对应海报
      switch (current) {
        case 0:
          this.drawPosterOne()
          break;
        case 1:
          this.drawPosterTwo()
          break;
        case 2:
          this.drawPosterThree()
          break;
      }
    }

  },
  /*一张产品图*/
  drawPosterOne: function () {
    var ctx = wx.createCanvasContext('canvasposter');
    // ctx.clearRect(0, 0, 280, 450);
    /* 绘制背景*/
    ctx.rect(0, 0, 280, 450);
    ctx.setFillStyle('white');
    ctx.fillRect(0, 0, 280, 450);
    /*绘制店名*/
    ctx.setFontSize(16);
    ctx.setFillStyle('#333');
    ctx.textAlign = "center";
    ctx.fillText(this.data.nickname, 140, 70);
    ctx.restore();
    /*绘制产品图*/
    ctx.drawImage(tmpThumbs[0], 35, 90, 210, 210);
    /* 绘制产品名称背景*/
    ctx.setFillStyle('#FF8409');
    ctx.fillRect(35, 300, 210, 60);
    /*绘制产品名称*/
    ctx.setFontSize(12);
    ctx.setFillStyle('#ffffff');
    ctx.textAlign = "left";
    ctx.fillText(this.data.pro_name.substr(0, 18), 45, 322);
    ctx.restore();
    ctx.setFontSize(12);
    ctx.setFillStyle('#ffffff');
    ctx.textAlign = "left";
    ctx.fillText(this.data.pro_name.substr(18, 20), 45, 344);
    ctx.restore();
    /* 绘制线框*/
    ctx.setLineDash([1, 3], 1);
    ctx.beginPath();
    ctx.moveTo(35, 375);
    ctx.lineTo(160, 375);
    ctx.moveTo(35, 435);
    ctx.lineTo(160, 435);
    ctx.setStrokeStyle('#979797');
    ctx.stroke();
    ctx.restore();
    /*绘制文字*/
    ctx.setFontSize(14);
    ctx.setFillStyle('#333333');
    ctx.textAlign = "left";
    ctx.fillText('￥', 35, 400);
    ctx.setFontSize(18);
    ctx.fillText(this.data.pro_price, 50, 400);
    ctx.setFontSize(11);
    ctx.setFillStyle('#666666');
    ctx.fillText(this.data.poster_qrtext, 35, 420);
    ctx.restore();
    /*绘制二维码*/
    ctx.drawImage(tmpQcode, 165, 365, 80, 80);
    ctx.restore();
    /*圆形头像*/
    ctx.save()
    ctx.beginPath();
    ctx.arc(140, 30, 20, 0, 2 * Math.PI)
    ctx.setFillStyle('#fff')
    ctx.fill()
    ctx.clip()
    ctx.drawImage(tmpAvatarUrl, 120, 10, 40, 40)
    ctx.restore()
    ctx.quality
    ctx.draw(false, this.getTempFilePath);
  },
  //获取临时路径
  getTempFilePath: function () {
    wx.canvasToTempFilePath({
      canvasId: 'canvasposter',
      quality:1,
      success: (res) => {
        this.saveImageToPhotosAlbum(res.tempFilePath)
      }
    })
  },
  //保存至相册
  saveImageToPhotosAlbum: function (imgUrl) {
    if (imgUrl) {
      wx.saveImageToPhotosAlbum({
        filePath: imgUrl,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          drawing = false
        },
        fail: (err) => {
          wx.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 2000
          })
          drawing = false
        }
      })
    } else {
      wx.showToast({
        title: '绘制中……',
        icon: 'loading',
        duration: 3000
      })
    }
  },
  /*分享 */
  onShareAppMessage: function (res) {

  },
  onShow:function () {
    let that = this;
    var param = that.data.goodsId + '@' + that.data.goodsType;
    util.request(api.yhsQcode + '?param=' + param).then(function (res) {
      if (res.code == 1) {
        //  保存网络图片到本地   用于绘制图片保存到本地
        that.setData({
          poster_qrcode:res.value
        });
        wx.getImageInfo({
          src: res.value,
          success: (res) => {
            tmpQcode = res.path;
          }
        });
      }else if(res.code == 4001){
        wx.showModal({
          title: '提示',
            content: '您还未登录，请登录后再分享',
            success(res) {
              if(res.confirm){
                wx.navigateTo({
                  url: "/pages/auth/login/login"
                });
              }else{
                wx.navigateBack({
                  delta: 0,
                })
              }
            }
        })
      }
    });
    
  }
})