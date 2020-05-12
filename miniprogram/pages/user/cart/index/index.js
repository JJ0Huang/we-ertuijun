const app = getApp()
Page({
  data: {
    cart: undefined,
    good: undefined,
    option: undefined,
    value: undefined,
    num: undefined,
    total: 0,
  },
  onLoad() {
    this.getCartInfo()
  },
  /**
   * getCartInfo  获取购物车信息
   * onClose  关闭左右两侧
   * onChange 监听步进数
   * changeValue  监听商品规格的改变
   * changeTotal  在数量或者规格改变的时候调用，重新计算总价
   * buyNow 立即购买
   */
  getCartInfo() {
    let that = this;
    app.showLoad()
    wx.cloud.callFunction({
      name: 'cart',
      data: {
        fun: 'get'
      },
      success(res) {
        var cart = res.result.data;
        console.log('cart', cart)
        that.setData({
          cart: cart
        })
        let funPromise = (i) => {
          wx.cloud.callFunction({
            name: 'good',
            data: {
              fun: 'getby_id',
              _id: cart[i].goodID
            },
            success(res) {
              that.setData({
                ['good[' + i + ']']: res.result.data,
                ['option[' + i + ']']: res.result.data.goodRule,
                ['value[' + i + ']']: res.result.data.goodRule[0].value,
                ['num[' + i + ']']: cart[i].goodNum
              })
              if (i == cart.length - 1) {
                app.hideLoad();
                that.changeTotal();
                console.log(that.data.cart)
              } else {
                funPromise(++i)
              }
            }
          })
        }
        funPromise(0);
      }
    })
  },
  buyNow() {
    wx.navigateTo({
      url: '../../../show/pay/index/index',
    })
  },
  onClose(event) {
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  /**
   * 监听规格、数量的改变
   * 重新计算总价
   * 计算时，循环累加数组num和value即可得出total
   */
  onChange(event) {
    // console.log(event)
    let index = event.currentTarget.dataset.index;
    this.setData({
      ['num[' + index + ']']: event.detail
    })
    this.changeTotal();
    wx.cloud.callFunction({
      name: 'cart',
      data: {
        fun: 'update',
        _id: event.currentTarget.dataset.cartid,
        goodNum: event.detail
      },
      success(res) {
        console.log('cloud updata success:', res.result)
      }
    })
  },
  changeValue(e) {
    // console.log(e)
    let index = e.currentTarget.dataset.index
    this.setData({
      ['value[' + index + ']']: e.detail
    })
    this.changeTotal();
  },
  changeTotal() {
    let that = this;
    let total = 0;
    let length = that.data.good.length;
    for (let i = 0; i < length; i++) {
      total += that.data.value[i] * that.data.num[i]
    }
    this.setData({
      total: total * 100
    })
    // console.log('total:',total)
    // console.log('total*100:',total*100)
  }
})