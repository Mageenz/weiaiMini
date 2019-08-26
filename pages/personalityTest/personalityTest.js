const apis = require('../../assets/utils/apis.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    questions: [],
    answers: [],
    optionReview: [],
    registerDialogShow: false
  },
  handleGetUserInfo({ detail }) {
    wx.login({
      success: res => {
        apis.register({
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          code: res.code
        }).then(res => {
          wx.setStorageSync('userInfo', res.data.data)
          this.setData({
            registerDialogShow: false,
            userId: res.data.data.userId
          })
          this.getQuestionList()
        })
      }
    })
  },
  // 生成评测图
  createCanvas(callback) {
    const context = wx.createCanvasContext('canvas', this);
    const positionMap = {
      0: { x: 65, y: 116 + 16 },
      1: { x: 65, y: 167 + 16 },
      2: { x: 65, y: 218 + 16 },
      3: { x: 65, y: 287 + 16 },
      4: { x: 65, y: 356 + 16 },
      5: { x: 30, y: 581 + 16, breakNum: 17, fillStyle: '#ffffff' },
      6: { x: 65, y: 426 + 16 },
      7: { x: 65, y: 496 + 16 }
    }
    // 背景图
    context.drawImage('/assets/images/imgTestResult.png', 0, 0, 375, 667);

    // 描述
    context.font = '13px PingFangSC-Regular';
    this.data.optionReview.forEach((item, index) => {
      // 简单的文字换行
      const des1 = item.substring(0, positionMap[index].breakNum || 20);
      const des2 = item.substring(positionMap[index].breakNum || 20);

      context.fillStyle = positionMap[index].fillStyle || '#4D4D4D';
      context.fillText(des1, positionMap[index].x, positionMap[index].y);
      context.fillText(des2, positionMap[index].x, positionMap[index].y + 18);
    })

    context.draw(false, () => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'canvas',
        quality: 1,
        success: res => {
          console.log('success', res.tempFilePath);
          wx.uploadFile({
            url: 'https://www.shanguokj.com/weiaiwang/file/upload',
            filePath: res.tempFilePath,
            header: {
              'Cookie': `token=${wx.getStorageSync('userInfo').cookie.value}`
            },
            name: 'file',
            formData: {
              userId: this.data.userId
            },
            success: res => {
              if (JSON.parse(res.data).status === 0) {
                callback()
              } else {

              }
            }
          })
        }
      })
    })
  },
  // 获取问题列表
  getQuestionList() {
    apis.getQuestionList().then(res => {
      this.setData({
        questions: res.data.data
      })
    }).catch(err => {
      if(err === 10) {
        this.setData({
          registerDialogShow: true
        })
      }
    })
  },
  // 2个提交，题目答案提交，图片上传提交
  handleSubmit() {
    const userId = wx.getStorageSync('userInfo').userId;
    const reviewList = this.data.answers.map((item, index) => {
      return {
        viewId: index + 1,
        optionId: item,
        userId
      }
    })

    apis.saveAnswer(reviewList).then(res => {
      this.createCanvas(() => {
        wx.redirectTo({
          url: '/pages/testResult/testResult',
        })
      })
    })
  },
  handleChoose(e) {
    const { questionindex, optionid, optionreview } = e.currentTarget.dataset

    this.setData({
      [`answers[${questionindex}]`]: optionid,
      [`optionReview[${questionindex}]`]: optionreview,
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
    this.getQuestionList()
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