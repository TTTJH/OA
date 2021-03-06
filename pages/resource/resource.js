let utils = require("../../utils/util.js")
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    article: {},						// 内容数据
    iconsList:[
      'cuIcon-discover',
      'cuIcon-upstage',
      'cuIcon-creative',
      'cuIcon-paint',
      'cuIcon-skin',
    ],
    resources:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let result = app.towxml(``, 'markdown', {
    //   // base: 'http://139.9.115.248/imgs/linux.md',				// 相对资源的base路径
    //   // theme: 'dark',					// 主题，默认`light`
    //   events: {					// 为元素绑定的事件方法
    //     tap: (e) => {
    //       console.log('tap', e);
    //     }
    //   }
    // });

    // // 更新解析数据
    // this.setData({
    //   article: result,
    //   isLoading: false
    // });
    
  },
  goto:function(e){
    let { index } = e.currentTarget.dataset
    wx.navigateTo({
      url:`/pages/rd/rd?id=${index}`
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'https://www.tttjh.com.cn/resource/go',
      method: "get",
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res){
        if (res.data.data.error) {
          utils.judgeToken(res.data.data.error)
        } else {
          console.log(res)
          let resources = res.data.data.resources
          that.setData({
            resources,
            loading: false
          })
        }
      },
      fail(res){

      }
    })
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