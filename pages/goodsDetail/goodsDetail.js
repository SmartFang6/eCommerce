// pages/goodsDetail/goodsDetail.js
import request from '../../server/netWork'
import {
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../server/detail'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    detailInfo: {},
    commentInfo: {},
    baseInfo: {},
    shopInfo: {},
    paramInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    this.getDetailData()
  },
  // 获取详情页数据
  getDetailData() {
    request({
      url: '/detail',
      data: {
        iid: this.data.iid
      }
    }).then(res => {
      console.log(res)
      const data = res.data.result;
      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages;
      //获取detailInfo信息
      const detailInfo = data.detailInfo;
      //获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      // 创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);
      // 创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      this.setData({
        topImages,
        detailInfo,
        commentInfo,
        baseInfo,
        shopInfo,
        paramInfo
      })
    }).catch(err => {
      console.log(err)
    })
  },
  addCart() {
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    // 2.加入到购物车列表
    this.addToCart(obj)
    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },
  addToCart(obj) {
    //判断是否已经加入购物车，如果加入了就把数量加1，否则加入购物车
    let cartList = wx.getStorageSync('cartList')
    const oldInfo = cartList.find(item => item.iid === obj.iid);
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1;
      obj.checked = true;
      cartList.push(obj)
    }
    wx.setStorageSync('cartList', cartList)
  }
})