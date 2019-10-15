const enums = require('../../assets/utils/enums.js');
const apis = require('../../assets/utils/apis.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      coverAddress: '',
      birthday: '',
      work: '',
      height: '',
      education: '',
      voiceIntroduceAddress: ''
    },
    formData: {
      coverAddress: '',
      birthday: '',
      work: '',
      height: '',
      education: '',
      voiceIntroduceAddress: ''
    },
    source: {
      heightList: [...Array(221).keys()].slice(140),
      educationList: enums.educationList
    },
    voiceVisible: false
  },
  handleNext() {
    const {formData} = this.data
    const rules = {
      coverAddress: '请上传您的封面照片',
      birthday: '请选择您的生日',
      work: '请输入您的工作',
      height: '请选择您的身高',
      education: '请选择您的学历'
    }

    const validRes = Object.keys(rules).every(item => {
      if (!formData[item]) {
        wx.showToast({
          title: rules[item],
          icon: 'none'
        })
        return false
      }
      return true
    })
    if(!validRes) {
      return
    }
    this.setData({
      voiceVisible: true
    })
  },
  uploadAvator() {
    wx.chooseImage({
      success: res => {
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: 'https://www.shanguokj.com/weiaiwang/file/upload/common',
          header: {
            'Cookie': `token=${wx.getStorageSync('userInfo').cookie.value}`
          },
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: res => {
            this.setData({
              'form.coverAddress': JSON.parse(res.data).data,
              'formData.coverAddress': JSON.parse(res.data).data,
            })
            wx.hideLoading()
          }
        })
      },
    })
  },
  uploadVoice(e) {
    this.setData({
      'form.voiceIntroduceAddress': e.detail,
      'formData.voiceIntroduceAddress': e.detail
    })
    apis.editUserInfo(this.data.formData).then(res => {
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/recommend/recommend',
        })
      }, 1000)
    })
  },
  handleBirthdayChange(e) {
    this.setData({
      'form.birthday': e.detail.value,
      'formData.birthday': e.detail.value,
    })
  },
  handleJobInput(e) {
    this.setData({
      'form.work': e.detail.value,
      'formData.work': e.detail.value,
    })
  },
  handleHeightChange(e) {
    this.setData({
      'form.height': e.detail.value,
      'formData.height': this.data.source.heightList[e.detail.value],
    })
  },
  handleEducationChange(e) {
    this.setData({
      'form.education': e.detail.value,
      'formData.education': this.data.source.educationList[e.detail.value].key,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})