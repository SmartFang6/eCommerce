// pages/category/cpn/y-menu/y-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex(e){
      const {index} = e.currentTarget.dataset;
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('menuclick',{index})
    }
  }
})
