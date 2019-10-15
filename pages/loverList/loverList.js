const apis = require('../../assets/utils/apis.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null
  },

  getLoveMeList() {
    apis.loveMe().then(res => {
      this.setData({
        list: res.data.data
      })
    })
  },

  getDoubleLoveList() {
    apis.loveDouble().then(res => {
      this.setData({
        list: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    if(options.type === "1") {
      this.getLoveMeList()
      wx.setNavigationBarTitle({
        title: '喜欢我的人',
      })
    } else {
      this.getDoubleLoveList()
      wx.setNavigationBarTitle({
        title: '互相喜欢',
      })
    }
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