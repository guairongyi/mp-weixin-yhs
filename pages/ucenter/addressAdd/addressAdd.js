var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var check = require('../../../utils/check.js');

var app = getApp();
Page({
  data: {
    address: {
      id: 0,
      province: 0,
      city: 0,
      county: 0,
      detail: '',
      consignee: '',
      consigneePhone: '',
      consigneeIdCard:'',
      isDefault: 1,
      provinceName: '',
      cityName: '',
      countyName: ''
    },
    addressId: 0,
    openSelectRegion: false,
    selectRegionList: [{
      id: 0,
      areaName: '省份',
      parCode: 1,
      areaTier: 2
    },
    {
      id: 0,
      areaName: '城市',
      parCode: 1,
      areaTier: 3
    },
    {
      id: 0,
      areaName: '区县',
      parCode: 1,
      areaTier: 4
    }
    ],
    regionType: 2,
    regionList: [],
    selectRegionDone: false
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.consigneePhone = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputCardNo(event) {
    let address = this.data.address;
    address.consigneeIdCard = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(event) {
    let address = this.data.address;
    address.consignee = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress(event) {
    let address = this.data.address;
    address.detail = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault() {
    let address = this.data.address;
    address.isDefault = address.isDefault == 1?0:1;
    this.setData({
      address: address
    });
  },
  getAddressDetail() {
    let that = this;
    util.request(api.yhsAddressList + '?addressId=' + that.data.addressId).then(function (res) {
      if (res.code == 1) {
        if (res.value[0]) {
          that.setData({
            address: res.value[0]
          });
        }
      }
    });
  },
  setRegionDoneStatus() {
    let that = this;
    let doneStatus = that.data.selectRegionList.every(item => {
      return item.id != 0;
    });

    that.setData({
      selectRegionDone: doneStatus
    })

  },
  chooseRegion() {
    let that = this;
    that.setData({
      openSelectRegion: !that.data.openSelectRegion
    });

    //设置区域选择数据
    let address = that.data.address;
    if (address.id == 0 && address.province > 0 && address.city > 0 && address.county > 0) {
      let selectRegionList = that.data.selectRegionList;
      selectRegionList[0].id = address.province;
      selectRegionList[0].areaName = address.provinceName;
      selectRegionList[0].parCode = 0;

      selectRegionList[1].id = address.city;
      selectRegionList[1].areaName = address.cityName;
      selectRegionList[1].parCode = address.province;

      selectRegionList[2].id = address.county;
      selectRegionList[2].areaName = address.countyName;
      selectRegionList[2].parCode = address.city;

      that.setData({
        selectRegionList: selectRegionList,
        regionType: 3
      });

      that.getRegionList(address.city);
    } else {
      that.setData({
        selectRegionList: [{
          id: 0,
          areaName: '省份',
          parCode: 1,
          areaTier: 2
        },
        {
          id: 0,
          areaName: '城市',
          parCode: 1,
          areaTier: 3
        },
        {
          id: 0,
          areaName: '区县',
          parCode: 1,
          areaTier: 4
        }
        ],
        regionType: 2
      })
      that.getRegionList(1);
    }
    that.setRegionDoneStatus();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }
  },
  onReady: function () {

  },
  selectRegionType(event) {
    let that = this;
    let regionTypeIndex = event.target.dataset.regionTypeIndex;
    let selectRegionList = that.data.selectRegionList;
    //判断是否可点击
    if ((regionTypeIndex == 3 && selectRegionList[1].parCode == 1)
    || (regionTypeIndex == 4 && selectRegionList[2].parCode == 1)){
      return false;
    }

    this.setData({
      regionType: regionTypeIndex
    })
    let selectRegionItem = selectRegionList[regionTypeIndex - 2];
    this.getRegionList(selectRegionItem.areaTier == 2 ? 1 : selectRegionItem.parCode);
    this.setRegionDoneStatus();

  },
  selectRegion(event) {
    let that = this;
    let regionIndex = event.target.dataset.regionIndex;
    let regionItem = this.data.regionList[regionIndex];
    let regionType = regionItem.areaTier;
    let selectRegionList = this.data.selectRegionList;
    selectRegionList[regionType - 2] = regionItem;
    if (regionType != 4) {
      this.setData({
        selectRegionList: selectRegionList,
        regionType: regionType + 1
      })
      this.getRegionList(regionItem.areaCode);
    } else {
      this.setData({
        selectRegionList: selectRegionList
      })
    }
    //重置下级区域为空
    selectRegionList.map((item, index) => {
      if (index > regionType - 2) {
        item.id = 0;
        item.areaName = index == 1 ? '城市' : '区县';
        item.parCode = 1;
      }
      return item;
    });

    this.setData({
      selectRegionList: selectRegionList
    })
    that.setData({
      regionList: that.data.regionList.map(item => {
        //标记已选择的
        if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 2].id == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      })
    });

    this.setRegionDoneStatus();

  },
  doneSelectRegion() {
    if (this.data.selectRegionDone === false) {
      return false;
    }
    let address = this.data.address;
    let selectRegionList = this.data.selectRegionList;
    address.province = selectRegionList[0].areaCode;
    address.city = selectRegionList[1].areaCode;
    address.county = selectRegionList[2].areaCode;
    address.provinceName = selectRegionList[0].areaName;
    address.cityName = selectRegionList[1].areaName;
    address.countyName = selectRegionList[2].areaName;

    this.setData({
      address: address,
      openSelectRegion: false
    });

  },
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      regionType: this.data.regionDoneStatus ? 3 : 1
    });

  },
  getRegionList(regionId) {
    let that = this;
    let regionType = that.data.regionType;
    util.request(api.yhsAreaCode + '?parCode=' + regionId).then(function (res) {
      if (res.code === 1) {
        that.setData({
          regionList: res.value.map(item => {
            //标记已选择的
            if (regionType == item.areaTier &&
              that.data.selectRegionList[regionType - 2].id == item.id) {
              item.selected = true;
            } else {
              item.selected = false;
            }
            return item;
          })
        });
      }
    });
  },
  cancelAddress() {
    wx.navigateBack();
  },
  saveAddress() {
    console.log(this.data.address)
    let address = this.data.address;

    if (address.consignee == '') {
      util.showErrorToast('请输入姓名');
      return false;
    }

    if (address.consigneePhone == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }
    if (address.county == 0) {
      util.showErrorToast('请输入省市区');
      return false;
    }

    if (address.detail == '') {
      util.showErrorToast('请输入详细地址');
      return false;
    }

    if (!check.isValidPhone(address.consigneePhone)) {
      util.showErrorToast('手机号不正确');
      return false;
    }
    let reqUrl = api.yhsaddressUpdate;
    if(address.id == 0){
      reqUrl = api.yhsAddressSave
    }
    util.request(reqUrl, address, 'POST').then(function (res) {
      if (res.code === 1) {
        if(address.isDefault == 1){
          wx.removeStorageSync('addrdata');
        }
        wx.navigateBack();
      }else{
        util.showMsg(res.msg);
      }
    });

  },
  onShow: function () {
    let address = this.data.address;
    address.mobile=wx.getStorageSync('userInfo').userPhone
    // 页面显示
    this.setData({
      address:address
    })
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})