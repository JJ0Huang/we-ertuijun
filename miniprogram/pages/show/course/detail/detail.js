const app = getApp()
Page({
  data: {
    course_id: undefined,
    course: undefined,
  },
  onLoad(option) {
    console.log(option._id)
    this.setData({
      course_id: option._id
    })
    this.getCourseInfo()
  },
  /**
   * getCourseInfo  获取课程信息
   * onSubmit 监听按钮信息
   */
  getCourseInfo() {
    app.showLoad()
    let that = this;
    wx.cloud.callFunction({
      name: 'course',
      data: {
        fun: 'getby_id',
        _id: that.data.course_id
      },
      success(res) {
        console.log('course:', res.result.data)
        that.setData({
          course: res.result.data
        })
        app.hideLoad()
      }
    })
  },
  onSubmit(e) {
    wx.navigateTo({
      url: '../../pay/index/index',
    })
  }
})