Page({
  data: {
    currentName: '',
    startX: '',
    startY: '',
    movedX: 0,
    movedY: 0,
    list: null,

    windowWidth: 0,
    windowHeight: 0,
    isTipsShow: true
  },
  handleCloseTips() {
    console.log('handleCloseTips')
    this.setData({
      isTipsShow: false
    })
  },
  handleTouchStart(e) {
    this.setData({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY
    })
  },
  handleTouchEnd(e) {
    const { index } = e.currentTarget.dataset
    const movedX = e.changedTouches[0].pageX - this.data.startX
    const movedY = e.changedTouches[0].pageY - this.data.startY
    const moved = Math.sqrt(Math.pow(movedX, 2) + Math.pow(movedY, 2))
    const current = this.data.list[index]
    const key = 'list[' + index + ']'

    if (Math.abs(movedY / movedX) < Math.sqrt(3)) {
      if (moved > 100) {
        // 符合移除条件的卡片
        if (movedX > 0) {
          // 右滑、喜欢
          current.x = 1600
          current.y = 1010

          this.choose(true)
        } else {
          // 左滑，不喜欢
          current.x = 0
          current.y = 1010

          this.choose(false)
        }
      } else {
        current.x = current.y = 1010
      }
    } else {
      current.x = current.y = 1010
    }
    this.setData({
      [key]: current
    })
  },
  choose(status) {
    wx.showToast({
      title: status ? '我喜欢这个' : '算了',
      icon: 'none'
    })
  },
  onLoad() {
    // 获取可用宽、高度
    wx.getSystemInfo({
      success: res => {
        console.log('res', res)
        this.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
    
    setTimeout(() => {
      this.setData({
        list: [
          { imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558537840679&di=51559c7e890fef60daa0ad3d9c20e961&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F87969682f40fbe99747a2e07ed616c24fe7c9679b8a7-PfvLq6_fw658', x: 1010, y: 1010 },
          { imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558537840678&di=b0687583b2772d9c14c97eecd956e62a&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201602%2F04%2F20160204211607_4hnsj.jpeg', x: 1010, y: 1010 },
          { imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558537840675&di=4b8de47b6d2ae21ead5c7355a59e1277&imgtype=0&src=http%3A%2F%2Fattachments.gfan.net.cn%2Fforum%2F201501%2F22%2F213254kb5oytb8zzki58h5.jpg', x: 1010, y: 1010 },
          { imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558537840695&di=0df5732e4ff2a8f58d9854242e4c4c42&imgtype=0&src=http%3A%2F%2Fi9.hexun.com%2F2017-06-05%2F189490957.jpg', x: 1010, y: 1010 },
        ]
      })
    })
  }
})