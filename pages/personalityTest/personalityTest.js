// pages/personalityTest/personalityTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    questions: [
      {
        title: '世界末日了，你只能带走一个动物你会带走 下面的哪个？',
        answers: [
          {name: 'A', des: '兔子'},
          {name: 'B', des: '兔子1'},
          {name: 'C', des: '兔子2'},
          {name: 'D', des: '兔子3'},
        ]
      },
      {
        title: '你只能带走一个动物你会带走 下面的哪个？',
        answers: [
          { name: 'A', des: '兔子' },
          { name: 'B', des: '兔子1' },
          { name: 'C', des: '兔子2' },
          { name: 'D', des: '兔子3' },
        ]
      }
    ],
    answers: ['A', 'A']
  },
  handleSubmit() {
    wx.navigateTo({
      url: '/pages/testResult/testResult',
    })
  },
  handleChoose(e) {
    const { questionindex, answername } = e.currentTarget.dataset

    this.setData({
      [`answers[${questionindex}]`]: answername
    })
    this.handleNext()
  },
  handleNext() {
    const { currentIndex, questions } = this.data

    if(currentIndex === questions.length - 1) {
      return
    }

    this.setData({
      currentIndex: this.data.currentIndex + 1
    })
  },
  handlePrev() {
    const { currentIndex, questions } = this.data

    if (currentIndex === 0) {
      return
    }

    this.setData({
      currentIndex: this.data.currentIndex - 1
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