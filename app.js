App({
  // globalData: {
  //   cartList: []
  // },
  // addToCart(obj) {
  //   //判断是否已经加入购物车，如果加入了就把数量加1，否则加入购物车
  //   const oldInfo = this.globalData.cartList.find(item => item.iid === obj.iid);
  //   if (oldInfo) {
  //     oldInfo.count += 1
  //   } else {
  //     obj.count = 1;
  //     obj.checked = true;
  //     this.globalData.cartList.push(obj)
  //   }
  //   console.log(this.globalData.cartList)
  //   // 2.购物车回调
  //   if (this.addCartCallback) {
  //     this.addCartCallback()
  //   }
  // }
  onLaunch(){
    wx.setStorageSync('cartList', [])
  }
})