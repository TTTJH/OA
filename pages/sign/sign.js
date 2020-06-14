let utils = require("../../utils/util.js")
Page({
  data:{
    signing:false,
    code:"",
    signed:[],
    otherBox:[
      "other-sign-box1",
      "other-sign-box2",
      "other-sign-box3",
      "other-sign-box4",
      "other-sign-box5",
      "other-sign-box6"
    ]
  },
  sign:function(){
    let that = this
    let token = wx.getStorageSync('token')
    let userStorage = wx.getStorageSync('userData')
    if(this.data.code){
      //如果当前为活动签到
      wx.navigateTo({
        url: '/pages/sf2/sf2',
      })
    }else{
      wx.request({
        url: 'https://www.tttjh.com.cn/sign/in', //url
        method: 'POST', //请求方式
        header: {
          'content-type': 'application/json',
          'nothing-token': token
        },
        data: {
          id: userStorage.id,
        },
        success: function (res) {
          if (res.data.data.error) {
            utils.judgeToken(res.data.data.error)
          } else {
            console.log("sign");
            console.log(res);
            that.setData({
              signing: true,
            })
            wx.navigateTo({
              url: '/pages/index/index?tip=1',
            })
          }
        },
        fail: function () {
          console.log(":)");
        },
        complete: function () {
          // complete 
        }
      })
    }


    // // 获取用户位置
    // wx.getLocation({
    //   success: function (res) {
    //     console.log('res', res)
    //     // latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //     // longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //     // var speed = res.speed; // 速度，以米/每秒计
    //     // var accuracy = res.accuracy; // 位置精度
    //   },
    //   fail: function (res) {
    //     //alert("获取位置失败");
    //   }
    // });

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
      url: 'https://www.tttjh.com.cn/sign/hascode', //url
      method: 'get', //请求方式
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res){
        console.log(res)
        if (res.data.data.error) {
          utils.judgeToken(res.data.data.error)
        } else {
          if (res.data.data.code) {
            //开启了活动签到
            let { code } = res.data.data
            that.setData({
              code
            })
          }
        }
      },
      fail(res){
        console.log(res)
      }
    })
    wx.request({
      url: 'https://www.tttjh.com.cn/sign/signed', //url
      method: 'get', //请求方式
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res) {
        console.log(res)
        //设置已经活动签到的人
        res.data.data.users.forEach((item,index) => {
          let num1 = Math.random() * (70 - 0)
          let num2 = Math.random() * (70 - 0)
          item.left = num1
          item.top = num2
        })
        that.setData({
          signed:res.data.data.users
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})
