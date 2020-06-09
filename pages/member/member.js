Page({
  data: {
    signing: false,
    bgColor:[
      // 'bg-gradual-orange',
      // 'bg-gradual-green',
      'bg-gradual-blue',
      'bg-gradual-purple',
      'bg-gradual-pink',
      'bg-gradual-red',

    ],
    users:[],
    loading:true,
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    let token = wx.getStorageSync('token')
    console.log(token)
    wx.request({
      url: 'http://nothing.natapp1.cc/user/list',
      method:'GET',
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res){
        //若续约token
        // let token = res.data.header.nothing-token;
        console.log(res)
        console.log(res.header['nothing-token'])        
        console.log(res)
        res.header['nothing-token']
        ?
        wx.setStorageSync("token", res.header['nothing-token'])
        :
        console.log("nothing")
        let {users} = res.data.data
        console.log(users)
        that.setData({
          users,
          loading:false,
        })

      },
      fail(res){
        console.log(res)
      }
    })
  },
})
