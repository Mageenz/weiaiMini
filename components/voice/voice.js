// components/voice/voice.js
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
    recording: false,
    time: 15,
    uploading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleStartRecord() {
      if (this.data.recording) {
        return
      }
      this.setData({
        recording: true
      })
      
      this.record(() => {
        let timer = setInterval(() => {
          let { time } = this.data

          if (time <= 0) {
            clearInterval(timer)
            this.setData({
              time: 15,
              recording: false,
              uploading: true
            })
            return
          }
          this.setData({
            time: --time
          })
        }, 1000)
      })
    },
    record(cb) {
      const recordManager = wx.getRecorderManager()
      
      recordManager.start({
        duration: 15000
      })

      recordManager.onStart(cb)

      recordManager.onStop(res => {
        wx.uploadFile({
          url: 'https://www.shanguokj.com/weiaiwang/file/upload/common',
          header: {
            'Cookie': `token=${wx.getStorageSync('userInfo').cookie.value}`
          },
          filePath: res.tempFilePath,
          name: 'file',
          success: res => {
            this.triggerEvent('complete', JSON.parse(res.data).data)
          }
        })
      })

      recordManager.onError(res => {
        wx.showToast({
          title: res.errMsg,
        })
      })
    },
    play(audio) {
      const innerAudioContext = wx.createInnerAudioContext()
      
      innerAudioContext.src = audio
      innerAudioContext.autoplay = true

      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    }
  }
})
