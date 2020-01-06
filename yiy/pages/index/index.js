// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
 getQueryVariable(str)
  {
   var obj = {};
   　　var arr1 = str.split("?");
   　　var arr2 = arr1[1].split("&");
   　　for (var i = 0; i < arr2.length; i++) {
     　　　　var res = arr2[i].split("=");
     　　　　obj[res[0]] = res[1];
   　　}
   　　return obj;
},
  onLoad: function (options) {
   
    if (options.q == undefined) {
     
     } else {
      var jumpUrl = decodeURIComponent(options.q)
      var data=this.getQueryVariable(jumpUrl)
      console.log(jumpUrl)
      var url = '/pages/index/index?address2=' + data.url
      if (data.key!=undefined){
        url = '/pages/index/index?address2=' + data.url + '$%^123' + data.key + '!@#123' + data.value
      }
      if (data.key2!= undefined) {
        url = '/pages/index/index?address2=' + data.url + '$%^123' + data.key + '!@#123' + data.value + '!@#456' + data.key2 + '!@#123' + data.value 
      }
      wx.getStorage({
        key: 'token',
        complete: function (res) {
          wx.navigateTo({
            url: url
          })
        }
      })
     
    }
    console.log(options)
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
         console.log(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    if (options.address2){
      console.log(options.address2)
      wx.getStorage({
        key: 'token',
        complete: function (res) {
          var address2 = options.address2.replace(/!@#123/g, '=')
          address2 = address2.replace('$%^123', '\?')
          address2 = address2.replace(/!@#456/g, '&')
          var token=res.data
          console.log(address2)
          if (address2.indexOf('orderInfo')!= -1){
            var url = 'https://yjy-dev.100dp.com/wechat/program/' + address2 + '?id=' + options.id+'&token='+options.token
            that.setData({
              url: url
            })
            console.log(1)
          }else{
          if (address2.indexOf('specialtyList') != -1){

            wx.getLocation({
              type: 'wgs84',
              success(res) {
                var url = 'https://yjy-dev.100dp.com/wechat/program/' + address2 + '&token=' + token+ '&latitude=' + res.latitude + '&longitude=' + res.longitude
                if (address2.indexOf('?') == -1) {
                  var url = 'https://yjy-dev.100dp.com/wechat/program/' + address2 + '?token=' + token + '&latitude=' + res.latitude + '&longitude=' + res.longitude
                }
                console.log(2)
                that.setData({
                  url: url
                })
              },
              fail(res){
                var url = 'https://yjy-dev.100dp.com/wechat/program/' + address2 + '?token=' + token
                console.log(3)
                that.setData({
                  url: url
                })
              }

            })
          
          }else{
          if (address2.indexOf('https')!=-1){
            console.log(4)
            that.setData({
              url: address2
            })
          }else{
            if (address2.indexOf('\?') != -1){
              var url = 'https://yjy-dev.100dp.com/wechat/program/' + address2 + '&token=' + res.data
            
              that.setData({
                 url: url
              })
            }else{
              var url = 'https://yjy-dev.100dp.com/wechat/program/' + address2 + '?token='+res.data
              console.log(6)
              that.setData({
                url: url
              })
            }
          }
        }
        }
        }
      })
      
    }else{
  
    if(options.address){
      if (options.id){
        wx.getStorage({
          key: 'token',
          complete: function (res) {
            var url = 'https://yjy-dev.100dp.com/wechat/program/' + options.address + '.html?token=' + res.data + '&id='+options.id
            console.log(7)
            that.setData({
              url: url
            })
          }
        })
      }else{
      wx.getStorage({
        key: 'token',
        complete: function (res) {
          var url = 'https://yjy-dev.100dp.com/wechat/program/' + options.address + '.html?token='+res.data
          console.log(8)
          that.setData({
            url:url
          })
        }
      })
      }
    }else{
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code //返回code
        var url = res.code
        wx.request({
          url: 'https://yjy-dev.100dp.com/api/foundation/user/wx-mini-program-auth',
          data: {code:code},
          method:'post',
          header: {
            'content-type': 'application/json'
          },
          success: function (res2) {
            if (res2.data.code==404006){
                  that.setData({
                    url:'https://yjy-dev.100dp.com/wechat/program/index.html'
                  })
            }else{
              var obj = JSON.parse(res2.data.data);
              that.setData({
                url: 'https://yjy-dev.100dp.com/wechat/program/index.html?token='+obj.token
              })
              wx.setStorage({//存储到本地
                key: "token",
                data: obj.token
              })
            }
          }
        })
      }
    })
    }
    }
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
  onGotUserInfo: function (e) {
    console.log(e);
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