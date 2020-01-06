// pages/register/register.js
var btn=true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:true,
    phone_num:'',
      countDownNum: '60',//倒计时初始值,
      code: true,
    verification_code:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  countDown: function () {
    let that = this;
    that.setData({
      code: false
    })
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            countDownNum: 60,
            code: true
          })
        }
      }, 1000)
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
  radio:function(){
    this.setData({
      radio:!this.data.radio
    })
  },
  gaincode2:function(){
    var click=true
    var that = this
    if (click==true){
      click==false
    wx.request({
      //请求接口的地址
      url: 'https://yjy-dev.100dp.com/api/foundation/user/send-captcha',
      method: 'post',
      data: {
        scene: 'bind', phone: that.data.phone_num
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if(res.data.code==0){
        that.countDown();
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
        });
      }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
          });
      }
      },
      complete:function(){
        click == true
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   
  },
  register:function(){
    var that=this
    
    if(this.data.phone_num.length==11){
      if (this.data.verification_code.length>0){
        wx.getUserInfo({
          success: function (e) {
            wx.request({
              //请求接口的地址
              url: 'https://yjy-dev.100dp.com/api/foundation/user/verify-captcha',
              method: 'post',
              data: {
                phone: that.data.phone_num,
                code: that.data.verification_code,
                scene: 'bind',
              
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              success: function (res) {
                
                if (res.data.status == 200) {
                  wx.login({
                    //获取code
                    success: function (r) {
                      var code1 = r.code //返回code
                      console.log(r)
                      wx.request({
                        url: 'https://yjy-dev.100dp.com/api/foundation/user/wx-mini-program-auth',
                        data: { 
                          code: code1,
                          mobile: that.data.phone_num,
                          scene: 'bind',
                          nickname: e.userInfo.nickName,
                          avatar_url: e.userInfo.avatarUrl,
                          gender: e.userInfo.gender,
                          country: e.userInfo.country,
                          province: e.userInfo.province,
                          city: e.userInfo.city 
                        },
                        method: 'post',
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (res2) {
                          if (res.data.code == 0){
                               var obj = JSON.parse(res2.data.data);
                                wx.setStorage({//存储到本地
                                  key: "token",
                                  data: obj.token
                                })
                          
                                wx.navigateTo({
                                  url: '../index/index?address=index&token=' + obj.token,
                                })//跳转
                        }else{
                            wx.showToast({
                              title: res.data.message,
                              icon: 'none',
                              duration: 2000,
                            });
                        }
                        }
                      })
                    }
                  })
                  
                }
              },
              fail: function (err) {

              },//请求失败
              complete: function () { }//请求完成后执行的函数
            })

          },
          fail: function (res) {
            console.log(123)
          }
        })
          
      } else {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000,
        });
      }
    }else{
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
    }
  },
  bindKeyInput1: function (e) {
    this.setData({
      phone_num: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      verification_code: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  webview: function (e) {
    
   
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