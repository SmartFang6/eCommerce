// components/y-tabbar/y-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex(event) {
      let {
        index
      } = event.currentTarget.dataset;
      this.setData({
        currentIndex: index
      })
      //发出事件
      const data = {index: this.data.currentIndex}
      this.triggerEvent("tabclick", data, {})
    }
  }
})