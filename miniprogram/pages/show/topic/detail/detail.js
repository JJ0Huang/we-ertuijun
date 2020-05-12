const app = getApp();
Page({
  data: {
    collectionStatus: false,
    topic_id: undefined,
    topic: undefined,
  },
  onLoad(option) {
    console.log(option)
    this.setData({
      topic_id: option._id
    })
    this.getTopicInfo()
    this.getCollectedArr()
  },
  /**
   * getCollectedArr  获取已收藏信息
   * getTopicInfo 获取topic的详细信息
   * changeCollectionStatus 改变收藏状态
   */
  getCollectedArr() {
    let that = this;
    wx.cloud.callFunction({
      name: 'collection',
      data: {
        fun: 'get',
        key: 'topic',
        value: that.data.topic_id
      },
      success(res) {
        console.log('length:', res.result.data.length)
        that.setData({
          collectionStatus: (res.result.data.length != 0)
        })
      }
    })
  },
  getTopicInfo() {
    let that = this;
    app.showLoad();
    wx.cloud.callFunction({
      name: 'topic',
      data: {
        fun: 'getby_id',
        _id: that.data.topic_id
      },
      success(res) {
        console.log('topic:', res.result.data)
        that.setData({
          topic: res.result.data
        })
        app.hideLoad()
      }
    })
  },
  changeCollectionStatus() {
    let that = this;
    this.setData({
      collectionStatus: !this.data.collectionStatus
    })
    app.showLoad()
    if (this.data.collectionStatus) {
      // 收藏
      console.log('正在收藏...')
      wx.cloud.callFunction({
        name: 'collection',
        data: {
          fun: 'push',
          key: 'topic',
          value: that.data.topic_id
        },
        success(res) {
          console.log(res.result)
          app.hideLoad()
        }
      })
    } else {
      // 取消收藏
      console.log('取消收藏中...')
      wx.cloud.callFunction({
        name: 'collection',
        data: {
          fun: 'pull',
          key: 'topic',
          value: that.data.topic_id
        },
        success(res) {
          console.log(res.result)
          app.hideLoad();
        }
      })
    }
  },
  change(e) {
    console.log(e.detail)
  }
})