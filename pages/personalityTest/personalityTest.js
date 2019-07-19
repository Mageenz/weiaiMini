// pages/personalityTest/personalityTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    questions: [
      {
        title: '世界末日了，你只能带走一个动物你会带走下面的哪个？',
        answers: [
          {name: 'A', des: '兔子'},
          {name: 'B', des: '绵羊'},
          {name: 'C', des: '鹿'},
          {name: 'D', des: '马'},
        ]
      },
      {
        title: '如果你可以变成一种动物，你会选择下面那种动物？',
        answers: [
          { name: 'A', des: '狗' },
          { name: 'B', des: '猫' },
          { name: 'C', des: '马' },
          { name: 'D', des: '蛇' },
        ]
      },
      {
        title: '如果你有能力让一个物种消失在这个世界，你会选择哪个消失？',
        answers: [
          { name: 'A', des: '狮子' },
          { name: 'B', des: '蛇' },
          { name: 'C', des: '鳄鱼' },
          { name: 'D', des: '鲨鱼' },
        ]
      },
      {
        title: '如果有一种动物可以说话，你最希望的是下面哪个？',
        answers: [
          { name: 'A', des: '绵羊' },
          { name: 'B', des: '马' },
          { name: 'C', des: '兔子' },
          { name: 'D', des: '鸟' },
        ]
      },
      {
        title: '如果你在一个孤岛上你只能选择下面的一个动物，你会选择哪个？',
        answers: [
          { name: 'A', des: '人类' },
          { name: 'B', des: '猪' },
          { name: 'C', des: '奶牛' },
          { name: 'D', des: '鸟' },
        ]
      },
      {
        title: '如果你有驯服动物的能力，你会选择下面的哪个作为宠物？',
        answers: [
          { name: 'A', des: '恐龙' },
          { name: 'B', des: '白虎' },
          { name: 'C', des: '北极熊' },
          { name: 'D', des: '美洲豹' },
        ]
      },
      {
        title: '如果你可以成为下面一个动物5分钟，你更愿意成分？',
        answers: [
          { name: 'A', des: '狮子' },
          { name: 'B', des: '猫' },
          { name: 'C', des: '马' },
          { name: 'D', des: '鸽子' },
        ]
      },
      {
        title: '如果你的另一半生活习惯上和你不同会怎么样，比如饮食上一个喜欢西子吃牛排一个喜欢南门夜排档？',
        answers: [
          { name: 'A', des: '尝试着陪ta吃吃看，价格高低不是关键，关键是ta喜欢' },
          { name: 'B', des: '应付着随便吃一点，虽然不喜欢，但是也不去影响ta的喜爱' },
          { name: 'C', des: '喜欢按着自己的喜好来，觉得没必要，试着去说服ta和你一样' },
          { name: 'D', des: '感觉不适合自己，直接分手' },
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