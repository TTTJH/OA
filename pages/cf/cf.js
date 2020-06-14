Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"",
    submiting:false
  },
  textareaBInput:function(e){
    this.setData({
      text: e.detail.value
    })
  },
  submit:function(){
    let that = this
    if(!this.data.submiting){
      this.setData({
        submiting:true
      })    
      let token = wx.getStorageSync('token')
      wx.request({
        url: '/notice/go',
        method:"POST",
        header: {
          'content-type': 'application/json',
          'nothing-token': token
        },
        data:{
          content: this.data.text
        },
        success(res){
          that.setData({
            submiting:false
          })
          console.log(res)
          console.log(":)")
          wx.navigateTo({
            url: '/pages/index/index?tip=7',
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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