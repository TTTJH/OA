let utils = require("../../utils/util.js")
//获取应用实例
const app = getApp()
Page({
  data: {
    modal:"",
    delName:"",
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
  hideModal:function(e){
    this.setData({
      modal: '',
    })
    if (e.currentTarget.dataset.index){
   //删除请求在这里
        wx.request({
      url: `https://www.tttjh.com.cn/user/${this.data.users[index].id}`,
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
        wx.navigateTo({
          url: '/pages/index/index?tip=3',
        })
      },
      fail(res){

      }
    })
    }
 
  },
  delUser(e){
    //是否为管理员
    let userData = wx.getStorageSync("userData")
    if(userData.role == 2){
      let {index} = e.currentTarget.dataset
      let {users} = this.data
      users[index].delStatus = !users[index].delStatus
  
      this.setData({
  
        users
      })
    }

  },
  del(e){
    let that = this
    let { index } = e.currentTarget.dataset
    let token = wx.getStorageSync('token')
    this.setData({
      modal: 'show',
      delName:this.data.users[index].name
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
      url: 'https://www.tttjh.com.cn/user/list',
      method:'GET',
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res){
        //假装token过期状态测试
        // utils.judgeToken("token verify fail")
        // //判断token是否过期
        if (res.data.data.error){
          utils.judgeToken(res.data.data.error)
        }else{
          //若续约token
          console.log(res)
          res.header['nothing-token']
            ?
            wx.setStorageSync("token", res.header['nothing-token'])
            :
            console.log("nothing")
          let { users } = res.data.data
          users.forEach((item, index) => {
            item.delStatus = false
          })
          that.setData({
            users,
            loading: false,
          })
        }
       

      },
      fail(res){
        console.log(res)
      }
    })
  },
})
