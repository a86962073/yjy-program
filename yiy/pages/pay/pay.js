// pages/pay/pay.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.requestPayment({
      timeStamp: options.timeStamp.toString(),
      nonceStr: options.nonceStr,
      package: options.package.replace('!@#123', '=' ),
      signType: options.signType,
      paySign: options.sign,
      total_fee: options.total_fee,
      success: function (res) {
        wx.getStorage({
          key: 'token',
          complete: function (res) {
            wx.navigateTo({
              url: '../index/index?address=paysuccess&token=' + res.data,
            })//跳转
          }
        })
      },
      fail: function (res) {
        wx.getStorage({
          key: 'token',
          complete: function (res) {
            wx.navigateTo({
              url: '../index/index?address=orderInfo&token=' + res.data + '&id=' + options.order_id,
            })//跳转
          }
        })
      },
      complete: function (res) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})