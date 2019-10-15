const apis = require('../../assets/utils/apis.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleGetUserInfo({ detail }) {
      wx.login({
        success: res => {
          apis.register({
            encryptedData: detail.encryptedData,
            iv: detail.iv,
            code: res.code
          }).then(res => {
            wx.setStorageSync('userInfo', res.data.data)
            this.triggerEvent('login', res)
          })
        }
      })
    },
  }
})
