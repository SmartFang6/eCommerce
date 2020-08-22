// pages/category/category.js
import request from '../../server/netWork'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [],
    categoryData: [],
    currentIndex:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },

  // -------------事件监听-----------------
  menuclick(e) {
    let currentIndex = e.detail.index;
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex)

    this._getCategoryDetail(currentIndex, 'pop')
  },
  //---------------网络请求---------------
  _getData() {
    this._getCategory()
  },
  _getCategory() {
    request({
      url: '/category'
    }).then(res => {
      const categories = res.data.data.category.list;
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        menuList: categories,
        categoryData
      })
      // 4.请求第一个类别的数据
      this._getSubcategory(0)

      // 5.请求第一个类别的详情数据
      this._getCategoryDetail(0, 'pop')
    }).catch(err => {
      console.log(err)
    })
  },
  _getSubcategory(currentIndex) { //获取右侧上半部分的数据
    const maitKey = this.data.menuList[currentIndex].maitKey;
    request({
      url: '/subcategory',
      data: {
        maitKey
      }
    }).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex, type) { //获取右侧下半部分的数据
    const miniWallkey = this.data.menuList[currentIndex].miniWallkey;
    request({
      url: '/subcategory/detail',
      data: {
        miniWallkey,
        type
      }
    }).then(res => {
      const categoryData = this.data.categoryData;
      categoryData[currentIndex].categoryDetail = res.data;
      this.setData({
        categoryData: categoryData
      })
    })
  }
})