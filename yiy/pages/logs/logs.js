//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    this.setData({
      url: decodeURIComponent(options.url),
      type: options.type
    })
  },
  to:function(){
    console.log(123)
    var that=this
    var type=that.data.type
    if(type==1){
    wx.navigateToMiniProgram({
      appId: 'wx0e6ed4f51db9d078',
      path:that.data.url,
      extraData: {
        company_name: 'kuadu'
      },
      success(res) {
        // 打开成功
      }

    })
    }else if(type==2){
    wx.navigateToMiniProgram({
      appId: 'wx408ea534cb79567e',
      path: that.data.url,
      extraData: {
        company_name: 'kuadu'
      },
      success(res) {
        // 打开成功
      }

    })
    }
  }
})

