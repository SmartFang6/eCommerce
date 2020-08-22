// pages/cart/cpn/bar-bottom/bar-bottom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: true
    },
    totalPrice: {
      type: Number
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalPrice: 0,
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})