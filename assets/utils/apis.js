const baseUrl = 'https://www.shanguokj.com/weiaiwang';
const loadingFetch = (url, method, data) => {
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
        resolve(res)
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
const noLoadingFetch = (url, method, data) => {
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
  register: data => loadingFetch('/user/register', 'post', data),
  getQuestionList: () => loadingFetch('/three/views/list', 'get'),
  saveAnswer: data => loadingFetch('/three/views/user/select', 'post', data),
  getRecommendList: data => loadingFetch('/user/recommend', 'post', data),
  love: data => noLoadingFetch('/user/love', 'post', data),
  editUserInfo: data => loadingFetch('/user/center/update', 'post', data),
  getUserInfo: () => noLoadingFetch('/user/center', 'get'),
  getUserDetail: () => loadingFetch('/user/center/detail', 'get'),
  upload: () => {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          wx.showLoading({
            title: '上传中',
          })
          wx.uploadFile({
            url: 'https://www.shanguokj.com/weiaiwang/file/upload/common',
            header: {
              'Cookie': `token=${wx.getStorageSync('userInfo').cookie.value}`
            },
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: res => {
              resolve(JSON.parse(res.data).data)
              wx.hideLoading()
            },
            fail: err => {
              reject(err)
            }
          })
        },
      })
    })
  },
  createOrder: data => loadingFetch('/buyer/order/create?card', 'post', data),
  pay: data => loadingFetch('/pay/create', 'post', data),
  getRecommandDetail: data => loadingFetch('/user/love/detail', 'get', data),
  loveMe: () => loadingFetch('/user/center/loveMe', 'get'),
  loveDouble: () => loadingFetch('/user/center/loveDouble', 'get'),
}