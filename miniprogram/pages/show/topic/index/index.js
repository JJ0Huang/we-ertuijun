const app = getApp();
Page({
  data: {
    active: 0,
    topicArr:undefined,
  },
  onLoad(){
    this.getTopicArr();
  },
  /**
   * getTopicArr  获取主题数组内容
   * onChange 监听上导航栏
   * navToTopicDetail 跳转到“文章”详细
   */
  getTopicArr(){
    let that = this;
    app.showLoad();
    wx.cloud.callFunction({
      name:'topic',
      data:{
        fun:'get'
      },success(res){
        console.log('topicArr:',res.result.data)
        that.setData({
          topicArr:res.result.data
        })
        app.hideLoad();
      }
    })
  },
  onChange(event) {
    console.log(event.detail)
    wx.showToast({
      title: `切换到 ${event.detail.title}`,
      icon: 'none'
    });
  },
  navToTopicDetail(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../detail/detail?_id='+this.data.topicArr[index]._id,
    })
  }
});