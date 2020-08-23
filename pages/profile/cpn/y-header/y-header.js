// pages/profile/cpn/y-header/y-header.js
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
    avatarUrl:'/assets/profile/avatar.png',
    nickName:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loginWx() {
      let that = this;
      wx.getSetting({
        success(resu) {
          if (resu.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              withCredentials: false,
              success: (res) => {
                console.log(res)
                var userInfo = res.userInfo
                var avatarUrl = userInfo.avatarUrl
                var nickName = userInfo.nickName
                that.setData({
                  avatarUrl,
                  nickName
                })
              },
              fail:(err)=>{
                wx.showToast({
                  title: '请先获取用户信息',
                })
              }
            })
          }
        }
      })
    }
  }
})