// pages/personalInfo/personalInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      birthday: '1996-07-21',
      job: '',
      height: '',
      education: ''
    },
    source: {
      jobList: ['学生', '教师', '医生'],
      heightList: [...Array(221).keys()].slice(140),
      educationList: ['大专', '本科', '硕士']
    },
    voiceDialogShow: true
  },
  handleBirthdayChange(e) {
    this.setData({
      'form.birthday': e.detail.value
    })
  },
  handleJobChange(e) {
    this.setData({
      'form.job': e.detail.value
    })
  },
  handleHeightChange(e) {
    this.setData({
      'form.height': e.detail.value
    })
  },
  handleEducationChange(e) {
    this.setData({
      'form.education': e.detail.value
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