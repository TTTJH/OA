Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus1: false,
    focus2: false,
    focus3: false,
    focus4: false,
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    time: '12:01',
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit: function () {
    // console.log(this.data.value1)
    // console.log(this.data.value2)
    // console.log(this.data.value3)
    // console.log(this.data.value4)
    let code = this.data.value1 + this.data.value2 + this.data.value3 + this.data.value4
    let token = wx.getStorageSync('token')
    let userInfo = wx.getStorageSync('userData')
    let date = new Date()

    // console.log(userInfo)
    // console.log(date.getYear())
    // console.log(date.getDate())
    // console.log(date.getMonth())
    // let month = "0" + (date.getMonth() + 1)
    // let endTime = `2020-${month}-${date.getDate()} ${this.data.time}:00`
    let id = userInfo.id
    // console.log(endTime)
    // console.log(id)
    // console.log(code)
    wx.request({
      url: 'https://www.tttjh.com.cn/sign/in',
      method: "POST",
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      data: {
        code,
        id,
        // endTime
      },
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '/paegs/index/index?tip=2',
        })
      },
      fali(res) {
        console.log(res)
      }
    })
  },
  input1: function (e) {
    console.log(e.detail.value)

    if (e.detail.value) {
      //跳转到下一个

      this.setData({
        focus1: false,
        focus2: true,
        value1: e.detail.value
      })
    } else {
      //保持
      this.setData({
        focus1: true,
        focus2: false,
        value1: ""
      })
    }
  },
  input2: function (e) {
    if (e.detail.value) {
      //跳转到下一个
      this.setData({
        focus1: false,
        focus2: false,
        focus3: true,
        value2: e.detail.value
      })
    } else {
      //保持
      this.setData({
        focus1: false,
        focus2: true,
        focus3: false,
        value2: ""
      })
    }
    console.log(e.detail.value)

  },
  input3: function (e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      //跳转到下一个
      this.setData({
        focus1: false,
        focus2: false,
        focus3: false,
        focus4: true,
        value3: e.detail.value
      })
    } else {
      //保持
      this.setData({
        focus1: false,
        focus2: false,
        focus3: true,
        focus4: false,
        value3: ""
      })
    }

  },
  input4: function (e) {
    if (e.detail.value) {
      //跳转到下一个
      this.setData({
        focus1: false,
        focus2: false,
        focus3: false,
        focus4: false,
        value4: e.detail.value
      })
    } else {
      //保持
      this.setData({
        focus1: false,
        focus2: false,
        focus3: false,
        focus4: true,
        value4: ""
      })
    }
    console.log(e.detail.value)

  },
  sign: function () {

    // this.setData({
    //   focus1:true
    // })
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