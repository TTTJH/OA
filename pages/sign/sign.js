Page({
  data:{
    signing:false,
    code:""
  },
  sign:function(){
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://nothing.natapp1.cc/sign/in', //url
      method: 'POST', //请求方式
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      data: {
        id: 8,

      },
      success: function (res) {
        console.log("sign");
        console.log(res);
      },
      fail: function () {
        console.log(":)");
      },
      complete: function () {
        // complete 
      }
    })

    // 获取用户位置
    wx.getLocation({
      success: function (res) {
        console.log('res', res)
        // latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        // longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        // var speed = res.speed; // 速度，以米/每秒计
        // var accuracy = res.accuracy; // 位置精度
      },
      fail: function (res) {
        //alert("获取位置失败");
      }
    });
    this.setData({
      signing:true,
    })
  },
  goto:function(){
    wx.navigateTo({
      url: '/pages/sf2/sf2',
    })
  },
  onReady:function(){
    let token = wx.getStorageSync('token')
    let that = this
    wx.request({
      url: 'http://nothing.natapp1.cc/sign/hascode', //url
      method: 'get', //请求方式
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res){
        console.log(res)
        if (res.data.data.code){
          //开启了活动签到
          let { code } = res.data.data
          that.setData({
            code
          })
        }

      },
      fail(res){
        console.log(res)
      }
    })
    wx.request({
      url: 'http://nothing.natapp1.cc/sign/signed', //url
      method: 'get', //请求方式
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res) {
        console.log(res)

      },
      fail(res) {
        console.log(res)
      }
    })
  }
})
