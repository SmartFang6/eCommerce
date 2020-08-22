//index.js
//获取应用实例
import request from '../../server/netWork.js'
const app = getApp()
const types = ['pop', 'new', 'sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    recommend: [],
    tabbar: ['流行', '新款', '精选'],
    currentType: 'pop',
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    showBackTop: false,
    showTabbar: false,
    tabControlTop: 0
  },
  // -----------------网络请求函数------------------------
  getHomeData() {
    request({
      url: "/home/multidata"
    }).then(res => {
      this.setData({
        banner: res.data.data.banner.list,
        recommend: res.data.data.recommend.list
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getGoddsData(type) {
    // 获取页面
    const page = this.data.goods[type].page + 1;
    request({
      url: '/home/data',
      data: {
        page,
        type
      }
    }).then(res => {
      const list = res.data.data.list;
      // 2.2.将数据设置到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list)
      // 2.3.将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //  ------------------------事件函数------------------------
  tabclick(e) {
    let index = e.detail.index;
    this.setData({
      currentType: types[index]
    })
  },
  handleBackTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  imgLoading() {
    wx.createSelectorQuery().select('#tabbar').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // 请求banner和热门推荐数据
    this.getHomeData()
    //请求商品数据
    this.getGoddsData('pop')
    this.getGoddsData('new')
    this.getGoddsData('sell')
  },
  onShow() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getGoddsData(this.data.currentType)
  },
  onPageScroll(e) {
    // 1.获取滚动的顶部
    const position = e.scrollTop;
    // 2.设置是否显示
    const flag1 = position > 800
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }
    const flag2 = position >= this.data.tabControlTop
    if(flag2 != this.data.showTabbar){
      this.setData({
        showTabbar: flag2
      })
    }
  }
})