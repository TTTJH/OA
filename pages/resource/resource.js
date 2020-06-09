//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,					// 判断是否尚在加载中
    article: {},						// 内容数据
    iconsList:[
      'cuIcon-discover',
      'cuIcon-upstage',
      'cuIcon-creative',
      'cuIcon-paint',
      'cuIcon-skin',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let result = app.towxml(`## 大标题`, 'markdown', {
      // base: 'http://139.9.115.248/imgs/linux.md',				// 相对资源的base路径
      // theme: 'dark',					// 主题，默认`light`
      events: {					// 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap', e);
        }
      }
    });

    // 更新解析数据
    this.setData({
      article: result,
      isLoading: false
    });
    console.log(result);

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