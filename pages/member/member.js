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
  delUser(e){
    let {index} = e.currentTarget.dataset
    let {users} = this.data
    users[index].delStatus = !users[index].delStatus
    this.setData({
      users
    })
  },
  del(e){
    let that = this
    let { index } = e.currentTarget.dataset
    let token = wx.getStorageSync('token')

    wx.request({
      url: `http://nothing.natapp1.cc/user/${this.data.users[index].id}`,
      method: 'DELETE',
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res){
        console.log(res)
        let {users} = that.data
        users.splice(index, 1)
        that.setData({
          users
        })
      },
      fail(res){

      }
    })
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
        console.log(res)
        res.header['nothing-token']
        ?
        wx.setStorageSync("token", res.header['nothing-token'])
        :
        console.log("nothing")
        let {users} = res.data.data
        users.forEach((item, index) => {
          item.delStatus = false
        })
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
