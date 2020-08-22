// pages/category/cpn/y-content/y-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array,
      value: []
    },
    categoryDetail: {
      type: Array,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBackTop: false,
    topNum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBackTop() {
      this.setData({
        topNum:0
      })
    },
    handleScroll(event) {
      let scrollTop = event.detail.scrollTop;
      const flag1 = scrollTop > 500;
      if (flag1 != this.data.showBackTop) {
        this.setData({
          showBackTop:flag1
        })
      }
    }
  }
})