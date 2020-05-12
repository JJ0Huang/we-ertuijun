const app = getApp()
Page({
  data: {},
  /**
   * isNewUser  判断是否为新用户
   * addUser  如果是新用户就创建一个用户
   * hideBox  倒计时结束的时候触发，隐藏盒子
   */
  onLoad() {
    this.isNewUser()
  },
  isNewUser() {
    let that = this;
    wx.cloud.callFunction({
      name: 'user',
      data: {
        fun: 'get'
      },
      success(res) {
        if (res.result.data.length == 0) {
          console.log('警告！查无此人...正在新建用户')
          that.addUser();
        } else {
          console.log('user:', res.result.data[0])
          app.globalData.user = res.result.data[0];
        }
      },
      fail(err) {
        console.log('警告！查询错误')
      }
    })
  },
  addUser() {
    wx.showModal({
      title: '提示！',
      content: '请允许小程序获取您的用户信息',
      success(res) {
        if (res.confirm) {
          app.showLoad();
          wx.getUserInfo({
            complete: (res) => {
              console.log('userInfo:', res.userInfo)
              app.globalData.userInfo = res.userInfo;
              wx.cloud.callFunction({
                name: 'user',
                data: {
                  fun: 'add',
                  userInfo: res.userInfo
                },
                success(res) {
                  console.log('addUserSuccess:', res.result)
                  app.hideLoad();
                }
              })
            },
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '部分功能将不能使用！',
            icon:'none'
          })
        }
      }
    })
  },
  onShow() {
    this.setData({
      html: app.globalData.html
    })
  },
  hideBox() {
    console.log(111)
  },
})