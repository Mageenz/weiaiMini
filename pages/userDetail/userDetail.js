const apis = require('../../assets/utils/apis.js');
const enums = require('../../assets/utils/enums.js');
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    ...enums
  },
  playSound() {
    innerAudioContext.src = this.data.info.voiceIntroduceAddress
    innerAudioContext.play()
  },
  handleSubmit() {
    apis.love({
      loveUserId: this.data.info.userId,
      love: true
    }).then(res => {
      this.getUserDetail(this.data.info.userId)
    })
  },
  getUserDetail(userId) {
    apis.getRecommandDetail({
      userId
    }).then(res => {
      const {data} = res.data
      try {
        data.age = parseInt((new Date().getTime() - new Date(data.birthdayNew).getTime()) / (365 * 24 * 3600 * 1000)) || ''
      } catch (e) {}
      

      this.setData({
        info: data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserDetail(options.userId)
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
    return {
      title: '善果',
      path: '/pages/recommand/recommand',
    }
  }
})