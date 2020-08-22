export default function request(options) {
  const baseUrl = "http://123.207.32.32:8000/api/x6"
  wx.showLoading({
    title: '数据加载中ing',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      method: options.method || 'get',
      success: resolve,
      fail: reject,
      complete:()=>{
        wx.hideLoading()
      }
    })
  })
}