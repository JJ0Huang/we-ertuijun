const app = getApp()
Page({
  data: {
    good: undefined,
    option1: [{
      text: 'S',
      value: 0
    }],
    value1: 0,
    ruleIndex: 0
  },
  /**
   * getGoodDetail  获取物品信息
   * setOption  初始化规格
   * addInCart  加入购物车
   * buyNow 立即购买
   * onClose  关闭弹窗
   * navToCart  跳转到购物车
   * change 监听规格的改变
   */
  onLoad(option) {
    this.getGoodDetail(option._id)
  },
  getGoodDetail(_id) {
    let that = this;
    app.showLoad();
    wx.cloud.callFunction({
      name: 'good',
      data: {
        fun: 'getby_id',
        _id: _id
      },
      success(res) {
        console.log('good:', res.result.data)
        that.setData({
          good: res.result.data
        })
        that.setOption();
        app.hideLoad();
      }
    })
  },
  setOption() {
    let rule = this.data.good.goodRule;
    let that = this;
    console.log('rule:', rule)
    for (let i = 0; i < rule.length; i++) {
      that.setData({
        ['option1[' + i + '].text']: rule[i].text + '  ￥' + rule[i].value,
        ['option1[' + i + '].value']: rule[i].value,
      })
    }
    this.setData({
      value1: rule[0].value
    })
  },
  addInCart() {
    console.log('加入购物车')
    let that = this;
    app.showLoad();
    wx.cloud.callFunction({
      name: 'cart',
      data: {
        fun: 'add',
        goodID: that.data.good._id,
        goodNum: 1,
      },
      success(res) {
        console.log('addInCart:', res.result)
        app.hideLoad();
      }
    })

  },
  buyNow() {
    // console.log('立即购买')
    wx.navigateTo({
      url: '../../pay/index/index',
    })
  },
  navToCart() {
    wx.navigateTo({
      url: '../../../user/cart/index/index',
    })
  },
  change(e) {
    console.log('change', e.detail)
    this.setData({
      value1: e.detail
    })
  }
})