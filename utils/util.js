const privateKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSztP8YnP+rMLI//GkQpcl/uVJSAFe0U/cEkQjmNcZpi6ja+q9u1zPaPnXN7dD8V1uzI/pO1Nd590eKH947y2/BZWxd5BQEt4J2DlSZ+Z1hZdv6NXuGAtLBP2KTjGcTSITif7YAw1d7mn3LyAuqWUajUCnUK4ET7Tu5OwDTgjoA9RYFUIYjihmb9/U8Vu8+j+dl3d+9UlkmVjCJ3mAlhlyQZAA/CFcaeI/3trc3t8goZ7iwI+Q1/UK7MPN9ZjVM67zfSoQBIFFWe5HyZ/dVufM4fIhJAJqqYNrR6f9K6t+G5DofAZ6yPI0hlrAjgdjNfO/8n+co+76FhRzUECRVcMnAgMBAAECggEAbR4YBoTjq8i7DpXE+5RobodxIax+4RiRMMXXtWFQvfsSGw8qM8l+8fFRmYBCgY23IjoKp9xIe8wf3ZNy4CNV15HJeVH9RiVt/0SH70rOtLhQueGYkqSpe8x6fJObBF+8qsZ8Pk3eJmfZO9SN4PlX1xWUiMavPJYRfrLKI6/J1mXsJYn7OwbFkhqWlnDogmqwHiMFPZgJjx5tAURmHjtMVxiRhY0gryg74Ic60xqJ/dTbY8BmUKQZ5N+KuYWHE7JkTN8BN6l2weZzsDlyZ16kEK56oipzaveWDvMxAVnrbW8CdokStxp9y5barBfkxhqjxaHYYB6WLCuOLBjZ4cfoKQKBgQD2QNzrlFaxUXatSAFcRDBHk75VKCx8I9PSW7TrD7hSG6+wZ0mumBWXawHA9WWvJdLwcpe2lVRBBzUs1U6hfJfUvhpfEcR30XooOqnq//6mSI97mQFahFrdLiv+dUFMvCqFIHtrOCnzGup5D7u1VS7hTNsorfLDYn3uzZ37tG2PswKBgQDbJtFWZUqD/MVFtfyZ2SI2sspqZVrFydDxIfesfmybZFPpeGWhdHkJNXsRyBmOs1uzgyfbxj2Vp7bmA0xlZxJob3vv7aKZP5zuCPrUXXgLynhlm483JthKMpBPESBnnz88cc1bNjSdPIOeHLeZb+rwjHNHT7e9t4h+NzNG0AykvQKBgAwGHsNh+tmtoJ3VZjubGMBl9mUyEPn+xdj/oVXY7qcTswBqCq77vhImp29EjDKBJkuXTNEdeX+zWmVWBQDdlIxOu/roYy92iwBr3OAcn9J+uILQdcB1tfoWxw8lqoqUpX7alywlEedM6SYAHqo7/o4BsrHJzJC9vmhqocwogzEBAoGBAJUxcAIpIvmH86Tpp/X05F3oifS0238bTatbPImp57ZCLv4agNXRvTSPvCD24K9NW3hyKYhtBTAE5Xbhd/jwmo+OlglY9gDuVZ+XbWt11mvwgtZpeK5LO6QHmEa7mhvxRdOYhf06gccpk1Doq/VBQ+hPNYuusZ/uenWyjq3+pRzhAoGAWNC/XhXPFNUc6KFhKnf2kgWicyuzJxsnqwB/JnZaUk85g3hUN3RvMZdirlaQPP0wX88NMCL/ynZ/BWOF+8psWyC21GyJHss8w3ZH1Vvh3ljSnUtafSZh8qZNK/TYGHf8BMfxbgmtfeZYVdvth9DuJl2mhShQFUgelnGbkfrF/cI=';
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0s7T/GJz/qzCyP/xpEKXJf7lSUgBXtFP3BJEI5jXGaYuo2vqvbtcz2j51ze3Q/FdbsyP6TtTXefdHih/eO8tvwWVsXeQUBLeCdg5UmfmdYWXb+jV7hgLSwT9ik4xnE0iE4n+2AMNXe5p9y8gLqllGo1Ap1CuBE+07uTsA04I6APUWBVCGI4oZm/f1PFbvPo/nZd3fvVJZJlYwid5gJYZckGQAPwhXGniP97a3N7fIKGe4sCPkNf1CuzDzfWY1TOu830qEASBRVnuR8mf3VbnzOHyISQCaqmDa0en/SurfhuQ6HwGesjyNIZawI4HYzXzv/J/nKPu+hYUc1BAkVXDJwIDAQAB';
var api = require('../config/api.js');
const Encrypt = require('../lib/encrypt/jsencrypt.min.js');
var app = getApp();

function encryptorJsonData(reqData) {
  let encryptor = new Encrypt.JSEncrypt();
  encryptor.setPublicKey(publicKey) // ????????????
  var enData = encryptor.encrypt(JSON.stringify(reqData));
  console.log('?????????????????????', enData);
  return enData;
}
function decodeJsonData(reqData) {
  // ??????
  const decryptor = new Encrypt.JSEncrypt();
  decryptor.setPrivateKey(privateKey)
  var ming = decryptor.decrypt(reqData)

  console.log("??????:", reqData);
  console.log("??????:", ming);
}


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDay(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

function formatHour(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * ??????????????????request
 */
function request(url, data = {}, method = "GET") {
  let that = this;
  that.jhxLoadShow('?????????...');
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Dts-Token': wx.getStorageSync('token'),
        'x-access-token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.code == 4001 && !wx.getStorageSync('lodingLogin')) {
            // ????????????????????????
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
              wx.setStorageSync('lodingLogin', true)
            } catch (e) {
            }
            // ?????????????????????
            wx.navigateTo({
              url: '/pages/auth/login/login'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
        that.jhxLoadHide();
      },
      fail: function (err) {
        reject(err);
        that.jhxLoadHide();
      }
    })
  });
}

function redirect(url) {
  //??????????????????????????????
  wx.redirectTo({
    url: url
  });
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function jhxLoadShow(message) {
  if (wx.showLoading) {  // ????????? 1.1.0 ??????6.5.6????????????????????????????????????????????????
    wx.showLoading({
      title: message,
      mask: true
    });
  } else {    // ???????????????Toast??????????????????????????????20?????????????????????
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
}

function jhxLoadHide() {
  if (wx.hideLoading) {    // ????????? 1.1.0 ??????6.5.6????????????????????????????????????????????????
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
}

function showMsg(e) {
  wx.showModal({
    title: e,
    confirmText: "?????????",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        //??????????????????
      } else if (res.cancel) {
        //??????????????????
      }
    }
  });
}

/* *
  * ??????
  */
 function compress(strNormalString) {
  console.log(" ?????????????????? " + strNormalString.length);
  var strCompressedString = "";
  var ht = new Array();
  for (i = 0; i < 128; i++) {
    ht[i] = i;
  }

  var used = 128;
  var intLeftOver = 0;
  var intOutputCode = 0;
  var pcode = 0;
  var ccode = 0;
  var k = 0;

  for (var i = 0; i < strNormalString.length; i++) {
    ccode = strNormalString.charCodeAt(i);
    k = (pcode << 8) | ccode;
    if (ht[k] != null) {
      pcode = ht[k];
    } else {
      intLeftOver += 12;
      intOutputCode <<= 12;
      intOutputCode |= pcode;
      pcode = ccode;
      if (intLeftOver >= 16) {
        strCompressedString += String.fromCharCode(intOutputCode >> (intLeftOver - 16));
        intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
        intLeftOver -= 16;
      }
      if (used < 4096) {
        used++;
        ht[k] = used - 1;
      }
    }
  }

  if (pcode != 0) {
    intLeftOver += 12;
    intOutputCode <<= 12;
    intOutputCode |= pcode;
  }

  if (intLeftOver >= 16) {
    strCompressedString += String.fromCharCode(intOutputCode >> (intLeftOver - 16));
    intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
    intLeftOver -= 16;
  }

  if (intLeftOver > 0) {
    intOutputCode <<= (16 - intLeftOver);
    strCompressedString += String.fromCharCode(intOutputCode);
  }

  console.log(strCompressedString + " ?????????????????? " + strCompressedString.length);
  return strCompressedString;
}

/* *
 * ?????????
  */
function decompress(strCompressedString) {
  var strNormalString = "";
  var ht = new Array();

  for (i = 0; i < 128; i++) {
    ht[i] = String.fromCharCode(i);
  }

  var used = 128;
  var intLeftOver = 0;
  var intOutputCode = 0;
  var ccode = 0;
  var pcode = 0;
  var key = 0;

  for (var i = 0; i < strCompressedString.length; i++) {
    intLeftOver += 16;
    intOutputCode <<= 16;
    intOutputCode |= strCompressedString.charCodeAt(i);

    while (1) {
      if (intLeftOver >= 12) {
        ccode = intOutputCode >> (intLeftOver - 12);
        if (typeof (key = ht[ccode]) != " undefined ") {
          strNormalString += key;
          if (used > 128) {
            ht[ht.length] = ht[pcode] + key.substr(0, 1);
          }
          pcode = ccode;
        } else {
          key = ht[pcode] + ht[pcode].substr(0, 1);
          strNormalString += key;
          ht[ht.length] = ht[pcode] + key.substr(0, 1);
          pcode = ht.length - 1;
        }

        used++;
        intLeftOver -= 12;
        intOutputCode &= (Math.pow(2, intLeftOver) - 1);
      } else {
        break;
      }
    }
  }
  console.log(" ??????????????? " + strNormalString);
  return strNormalString;
}


module.exports = {
  showMsg,
  formatTime,
  request,
  redirect,
  showErrorToast,
  jhxLoadShow,
  jhxLoadHide,
  encryptorJsonData,
  decodeJsonData,
  formatHour,
  formatDay,
  compress,
  decompress,
}