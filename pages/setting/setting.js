const apis = require('../../assets/utils/apis.js');
const ranges = require('../../assets/utils/ranges.js');
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      avatar: '',
      username: '',
      sex: 0,
      birthday: '',
      height: '',
      income: '',
      education: '',
      marriage: '',
      otherIncomeMin: '',
      otherEducationMin: '',
      otherAge: '',
      otherHeight: '',
      voiceIntroduceAddress: ''
    },
    ...ranges
  },
  playVoice() {
    innerAudioContext.src = this.data.formData.voiceIntroduceAddress
    innerAudioContext.play()
  },
  getUserDetail() {
    apis.getUserDetail().then(res => {
      const {data} = res.data
      const formData = {
        voiceIntroduceAddress: data.voiceIntroduceAddress,
        avatar: data.avatar,
        username: data.username,
        sex: ranges.getPickerValueByKey('sex', data.sex),
        birthday: data.birthdayNew,
        height: data.height,
        income: data.income,
        education: ranges.getPickerValueByKey('education', data.education),
        marriage: ranges.getPickerValueByKey('marriage', data.marriage),
        otherIncomeMin: data.otherIncomeMin,
        otherEducationMin: ranges.getPickerValueByKey('education', data.otherEducationMin),
        otherAge: ranges.getPickerValueByValue('age', data.otherAgeMin && data.otherAgeMax ? `${data.otherAgeMin}-${data.otherAgeMax}` : `${data.otherAgeMin}+${data.otherAgeMax || ''}`),
        otherHeight: ranges.getPickerValueByValue('height', `${data.otherHeightMin}-${data.otherHeightMax}`)
      }
      
      console.log('formData', formData)
      this.setData({formData})
    })
  },
  handleSubmit() {
    const data = {}
    const {formData} = this.data
    const otherAge = ranges.ageRange[formData.otherAge] ? ranges.ageRange[formData.otherAge].value : '-'
    const otherHeight = ranges.heightRange[formData.otherHeight] ? ranges.heightRange[formData.otherHeight].value : '-'

    data.avatar = formData.avatar
    data.username = formData.username
    data.sex = ranges.getPickerKey('sex', formData.sex)
    data.height = formData.height
    data.income = formData.income
    data.education = ranges.getPickerKey('education', formData.education)
    data.marriage = ranges.getPickerKey('marriage', formData.marriage)
    data.otherIncomeMin = +formData.otherIncomeMin
    data.otherAgeMin = otherAge.indexOf('-') > -1 ? +otherAge.split('-')[0] : +otherAge.split('+')[0]
    data.otherAgeMax = otherAge.indexOf('-') > -1 ? +otherAge.split('-')[1] : ''
    data.otherHeightMin = otherHeight.indexOf('-') > -1 ? +otherHeight.split('-')[0] : ''
    data.otherHeightMax = otherHeight.indexOf('-') > -1 ? +otherHeight.split('-')[1] : '',
      data.otherEducationMin = ranges.getPickerKey('education', formData.otherEducationMin)

    apis.editUserInfo(data).then(res => {
      wx.navigateBack()
    })
  },
  uploadAvator() {
    apis.upload().then(res => {
      this.setData({
        'formData.avatar': res
      })
    })
  },
  handleNameChange(e) {
    this.setData({
      'formData.username': e.detail
    })
  },
  handleSexChange(e) {
    this.setData({
      'formData.sex': e.detail
    })
  },
  handleBirthdayChange(e) {
    this.setData({
      'formData.birthday': e.detail
    })
  },
  handleHeightChange(e) {
    this.setData({
      'formData.height': e.detail
    })
  },
  handleIncomechange(e) {
    this.setData({
      'formData.income': e.detail
    })
  },
  handleEducationChange(e) {
    this.setData({
      'formData.education': e.detail
    })
  },
  handleMarriageChange(e) {
    this.setData({
      'formData.marriage': e.detail
    })
  },
  handleOtherIncomechange(e) {
    this.setData({
      'formData.otherIncomeMin': e.detail
    })
  },
  handleOtherEducationChange(e) {
    this.setData({
      'formData.otherEducationMin': e.detail
    })
  },
  handleOtherAgeChange(e) {
    this.setData({
      'formData.otherAge': e.detail
    })
  },
  handleOtherHeightChange(e) {
    this.setData({
      'formData.otherHeight': e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserDetail()
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