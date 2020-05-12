const app = getApp()
Page({
  data: {
    courseArr: undefined,
  },
  onLoad() {
    this.getCourseArr()
  },
  /**
   * getCourseArr 获取课程概要内容
   * navToCourseDetail  跳转到“课程详细”中  试看/报名
   * change 监听搜索框
   */
  getCourseArr() {
    app.showLoad()
    let that = this;
    wx.cloud.callFunction({
      name: 'course',
      data: {
        fun: 'get'
      },
      success(res) {
        that.setData({
          courseArr: res.result.data
        })
        console.log('courseArr:', res.result.data)
        app.hideLoad()
      }
    })
  },
  navToCourseDetail(e) {
    // console.log(e.currentTarget.dataset)
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../detail/detail?_id=' + this.data.courseArr[index]._id,
    })
  },
  change(e) {
    console.log(e.detail)
  }
})