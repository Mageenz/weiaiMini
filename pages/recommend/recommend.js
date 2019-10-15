const apis = require('../../assets/utils/apis.js');
const enums = require('../../assets/utils/enums.js');

Page({
  data: {
    currentName: '',
    startX: '',
    startY: '',
    movedX: 0,
    movedY: 0,
    list: null,

    windowWidth: 0,
    windowHeight: 0,
    tipVisible: false,

    searchVisible: false,
    region: [],
    ageRange: ['18-23', '23-28', '28-33', '33-38', '38+'],
    age: '',
    heightRange: ['160-165', '165-170', '170-175', '175-180', '180-185', '185-190'],
    height: '',

    registerVisible: false,
    educationMap: enums.educationMap,
    userInfoComplete: false,
    isInit: true
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/userDetail/userDetail?userId=${e.currentTarget.dataset.id}`,
    })
  },
  cancelPropagation(){},
  handleSearchSubmit(e) {
    this.getRecommendList();
    this.setData({
      searchVisible: false
    })
  },
  handleHeightChange(e) {
    this.setData({
      height: e.detail.value
    })
  },
  handleAgeChange(e) {
    this.setData({
      age: e.detail.value
    })
  },
  handleRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  closeSearch() {
    this.setData({
      searchVisible: false
    })
  },
  openSearch() {
    this.setData({
      searchVisible: true
    })
  },
  handleCloseTips() {
    this.setData({
      tipVisible: false
    })
  },
  handleTouchStart(e) {
    this.setData({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY
    })
  },
  handleTouchEnd(e) {
    const { index, id } = e.currentTarget.dataset
    const movedX = e.changedTouches[0].pageX - this.data.startX
    const movedY = e.changedTouches[0].pageY - this.data.startY
    const moved = Math.sqrt(Math.pow(movedX, 2) + Math.pow(movedY, 2))
    const current = this.data.list[index]
    const key = 'list[' + index + ']'

    if (Math.abs(movedY / movedX) < Math.sqrt(3)) {
      if (moved > 100) {
        // 符合移除条件的卡片
        if (movedX > 0) {
          // 右滑、喜欢
          current.x = 1600
          current.y = 1010

          this.choose(true, id)
        } else {
          // 左滑，不喜欢
          current.x = 0
          current.y = 1010

          this.choose(false, id)
        }
      } else {
        current.x = current.y = 1010
      }
    } else {
      current.x = current.y = 1010
    }
    this.setData({
      [key]: current
    })
  },
  choose(love, loveUserId) {
    apis.love({
      loveUserId,
      love
    }).then(res => {
      if(res.data.status !== 0) {
        // 未完善信息
        wx.showToast({
          title: '请先完善您的个人信息哦',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/personalInfo/personalInfo'
          })
        }, 1500)
      }
    })
  },
  handleLogin(res) {
    this.setData({
      registerVisible: false
    })
    // wx.redirectTo({
    //   url: '/pages/personalInfo/personalInfo',
    // })
    this.getRecommendList()
  },
  getRecommendList() {
    this.setData({
      list: null
    })
    const {region, ageRange, age, heightRange, height} = this.data;
    let ageItem = [];
    if(age !== '') {
      ageItem = ageRange[age].indexOf('-') > -1 ? ageRange[age].split('-') : ageRange[age].split('+');
    }
    const heightItem = height === '' ? [] : heightRange[height].split('-');
    const data = {
      province: region[0],
      city: region[1],
      ageMin: ageItem[0],
      ageMax: ageItem[1],
      heightMin: heightItem[0],
      heightMax: heightItem[1],
      pageNum: 1,
      pageSize: 100
    }

    apis.getRecommendList(data).then(res => {
      if (res.data.status === 10) {
        this.setData({
          registerVisible: true
        })
        return
      }
      this.setData({
        list: res.data.data.page.map(item => {
          item.x = item.y = 1010;
          return item;
        }),
        userInfoComplete: res.data.data.userInfoComplete
      })
    })
  },
  onReady() {
    if(!this.data.isInit) {
      return
    }
    this.setData({
      isInit: false
    })
    // 获取可用宽、高度，用于初始化拖拽效果
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        }, this.getRecommendList)
      }
    })
  },
  onShow() {
    if(!this.data.isInit) {
      this.setData({
        region: '',
        age: '',
        height: ''
      })
      this.getRecommendList()
    }
  },
  onShareAppMessage: function () {
    return {
      title: '善果',
      path: '/pages/recommand/recommand',
    }
  }
})