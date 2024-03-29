const apis = require('../../assets/utils/apis.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  toLoveMe() {
    wx.navigateTo({
      url: '/pages/loverList/loverList?type=1',
    })
  },
  toDoubleLove() {
    wx.navigateTo({
      url: '/pages/loverList/loverList?type=2',
    })
  },
  toAlbum() {
    wx.navigateTo({
      url: '/pages/album/album',
    })
  },
  toPay() {
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  toSetting() {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  getUserInfo() {
    apis.getUserInfo().then(res => {
      this.setData({
        userInfo: res.data.data
      })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
    this.getUserInfo()
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
      imageUrl: '/assets/images/imgShare.jpg'
    }
  }
})