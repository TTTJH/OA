Page({
  data:{
    signing:false,
  },
  sign:function(){
    this.setData({
      signing:true,
    })
  },
  onReady:function(){
    wx.request({
      url:'http://nothing.natapp1.cc/sign/in', //url
      method: 'POST', //请求方式
      // header: {
      //   'Content-Type': 'application/json',
      // },
      data: {
        id:8,

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
  }
})
