// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cartList = wx.getStorageSync('cartList')
    this.setData({
      cartList
    })
  },
  onTabItemTap() {
    const cartList = wx.getStorageSync('cartList')
    this.setData({
      cartList
    })
    this.changeData()
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }
    // console.log(counter, totalPrice)
    // 2.修改数据
    this.setData({
      count: counter,
      totalPrice
    })
  },
  onSelectAll() {
    // 1.判断是否是全部选中
    if (this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeData()
  },
  onCheckClick(e) {
    const mindex = e.currentTarget.dataset.index;
    this.data.cartList.forEach((item, index) => {
      if (index == mindex) {
        item.checked = !item.checked
      }
    })
    this.setData({
      cartList: this.data.cartList
    })
    this.data.cartList.forEach(i => {
      if (!i.checked) {
        this.setData({
          isSelectAll: false
        })
      }
    })
    const selectAll = !this.data.cartList.find(item => !item.checked)
    this.setData({
      isSelectAll: selectAll
    })
    this.changeData()
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  }
})