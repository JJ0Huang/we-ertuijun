Page({
  data:{
    userInfo:undefined,
  },
  onLoad(){
    // console.log(getApp().globalData.user)
    this.setData({
      userInfo:getApp().globalData.user.userInfo
    })
  },
  /**
   * navToAbout 跳转到“相关”页面
   * navToCart  跳转到“购物车”
   * navToEditor  跳转到文本编译器
   */
  navToAbout(){
    wx.navigateTo({
      url: '../../show/about/index/index',
    })
  },
  navToCart(){
    wx.navigateTo({
      url: '../cart/index/index',
    })
  },
  navToEditor(){
    wx.navigateTo({
      url: '../../editor/index/index',
    })
  }
})