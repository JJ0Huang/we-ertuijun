App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'produce-a4nsy',
        traceUser: true,
      })
    }
    this.globalData = {
      isLoading: false,
      env:'produce-a4nsy',
    }
  },
  /**
   * 请求数据时的反馈
   * showSuccess 显示操作成功
   * showFail  显示操作失败
   * showLoad 显示加载中
   * hideLoad 若成功返回数据，则调用hideLoad即可
   */
  showSuccess() {
    wx.showToast({
      title: '操作成功',
    })
  },
  showFail() {
    wx.showToast({
      title: '操作失败',
      icon: 'none'
    })
  },
  showLoad() {
    wx.showLoading({
      title: '加载中',
      success() {
        getApp().globalData.isLoading = true;
      }
    })
    setTimeout(() => {
      wx.hideLoading({
        complete() {
          if (getApp().globalData.isLoading == true) {
            getApp().showFail();
          }
        }
      });
    }, 5000);
  },
  hideLoad() {
    wx.hideLoading({
      complete: (res) => {
        getApp().globalData.isLoading = false;
        getApp().showSuccess();
      },
    })
  }
})