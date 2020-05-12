const app = getApp()
Page({
  data:{
    goodList:[]
  },
  /**
   * navToGoodDetail  跳转到“商品详细”
   * getGoodeInfo
   */
  onShow(){
    app.showLoad();
    this.getGoodeInfo();
  },
  getGoodeInfo(){
    const that = this;
    wx.cloud.callFunction({
      name:'good',
      data:{
        fun:'get'
      },
      success(res){
        console.log(res.result.data);
        that.setData({
          goodList: res.result.data
        })
        app.hideLoad();
      }
    })
  },
  navToGoodDetail(e){
    let that = this;
    let index=e.currentTarget.dataset.index;
    console.log('choose_id:',this.data.goodList[index]._id)
    wx.navigateTo({
      url: '../detail/detail?_id='+that.data.goodList[index]._id,
    })
  }
})