// pages/profile/cpn/y-view-list/y-view-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
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
    toCart(e) {
      let {
        msg
      } = e.currentTarget.dataset
      if (msg == "我的购物车") {
        wx.reLaunch({
          url: '/pages/cart/cart',
        })
      }
    }
  }
})