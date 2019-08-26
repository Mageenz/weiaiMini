const baseUrl = 'https://www.shanguokj.com/weiaiwang';
const widthLoadingfetch = (url, method, data = {}) => {
  return new Promise((resolve, reject) => {
    const userInfo = wx.getStorageSync('userInfo')
    const token = userInfo ? userInfo.cookie.value : ''

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: `${baseUrl}${url}`,
      header: {
        'Cookie': `token=${token}`
      },
      data,
      method,
      success: res => {
        if(res.data.status === 0) {
          resolve(res)
        } else {
          reject(res.data.status)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}
const noLoadingFetch = (url, method, data = {}) => {
  const userInfo = wx.getStorageSync('userInfo')
  const token = userInfo ? userInfo.cookie.value : ''

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      header: {
        'Cookie': `token=${token}`
      },
      data,
      method,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = {
  register: data => widthLoadingfetch('/user/register', 'post', data),
  getQuestionList: () => widthLoadingfetch('/three/views/list', 'get'),
  saveAnswer: data => widthLoadingfetch('/three/views/user/select', 'post', data),
}