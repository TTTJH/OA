Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
    itemName:"",
    itemGit:"",
    usersDefault:[],
    loading:true,
    openDetail:false,
    files:[],
    filesName:[],
    uids:[],
    promiseArr:[],
    index:0,
    submiting:false
  },
  watchName:function(e){
    this.setData({
      itemName:e.detail.value
    })
  },
  watchGit:function(e){
    this.setData({
      itemGit: e.detail.value
    })
  },
  openUserDetail:function(){
    if(this.data.openDetail){
      //收回列表
      let users = this.data.users.slice(0,3)
      this.setData({
        users,
        openDetail:false
      })

    }else{
      //展开列表
      let usersDefault = this.data.usersDefault
      this.data.users.forEach((item, index) => {
        usersDefault[index].choose = item.choose
      })  
      let users = usersDefault
      console.log(users)
      this.setData({
        users,
        usersDefault,
        openDetail: true
      })
    }
  },
  choose:function(e){
    let {users} = this.data
    users[e.currentTarget.dataset.index].choose = !users[e.currentTarget.dataset.index].choose
    this.setData({
      users
    })
  },
  fileDel:function(e){
    //删除选中的文件操作
    let index = e.currentTarget.dataset.index
    console.log(index)
    let files = this.data.files
    files.splice(index,1)
    this.setData({
      files
    })
  },
  submit:function(){
    if(!this.data.submiting){
      this.setData({
        submiting: true,
        filesName:[]
      })
      let that = this
      let token = wx.getStorageSync('token')
      let filesLength = this.data.files.length
      console.log(token)
      //循环提交files
      this.data.files.forEach((item, index2) => {
        wx.uploadFile({
          url: `http://nothing.natapp1.cc/file/upload/${this.data.itemName}/${item.name}`,
          filePath: item.path,
          name: 'file',
          formData: {
            // 'user': 'test'
          },
          header: {
            'nothing-token': token
          },
          success(res) {
            console.log(res)
            //更新filesName
            // let promise = new Promise((resolve,reject) => {
              let {filesName} = that.data 
              let resp = JSON.parse(res.data)
              filesName.push(resp.data.url)
              that.setData({
                filesName
              })
              console.log(filesName)
              // resolve(filesName)
            // })
            // promise.then((value) => {
              if (that.data.index == filesLength - 1) {
                // console.log(value)
                //当前是最后一次循环,在这里发起使用filesName的请求
                let uids = []
                that.data.users.forEach((item, index) => {
                  if (item.choose) {
                    uids.push(item.id)
                    that.setData({
                      uids
                    })
                  }
                })

                console.log(that.data)
                //提交uids和name和fileUrls
                wx.request({
                  url: 'http://nothing.natapp1.cc/item/go',
                  method: "POST",
                  header: {
                    'nothing-token': token
                  },
                  data: {
                    uids: that.data.uids,
                    url: "xxx",
                    fileUrls: filesName,
                    name: that.data.itemName,
                    members: that.data.uids.length,
                    days: 1
                  },
                  success(res) {
                    console.log(res)
                    wx.navigateTo({
                      url: '/pages/index/index?tip=5',
                    })
                  },
                  fail() {
                    console.log("LKJJJ")
                  }
                })
              }
            // })




            //  console.log(res)
            //do something
            // console.log(res.data)
            // console.log(typeof res.data)

            //更新index
            let { index } = that.data
            index++
            that.setData({
              index
            })
          },
          fail() {
            console.log(":(")
            //更新index
            let { index } = that.data
            index++
            that.setData({
              index
            })
          }
        })
      })
    }
  },
  uploadItem:function(){
    let that = this
    wx.chooseMessageFile({
      success(res) {
        console.log(res)
        let files = that.data.files
        console.log(res)        
        let { name } = res.tempFiles[0]
        let format = name.slice(name.lastIndexOf('.') + 1)
        if(res.tempFiles[0].type == 'image'){
          format = 'image'
        }
        res.tempFiles[0].format = format
        files.unshift(res.tempFiles[0])

        that.setData({
          files
        })
        console.log(that.data.files)
        // wx.uploadFile({
        //   url: putUrl, 
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //   },
        //   success(res) {
        //     console.log(":)")
        //     const data = res.data
        //     console.log(res);
        //   },
        //   fail() {
        //     console.log("::(")
        //   }
        // })
      }
    })
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
    let that = this;
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://nothing.natapp1.cc/user/list',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res) {
        //若续约token
        res.header['nothing-token']
          ?
          wx.setStorageSync("token", res.header['nothing-token'])
          :
          console.log("nothing")
        let users = res.data.data.users
        //为users添加各自的choose属性
        users.forEach((item,index) => {
          item.choose = false
        })
        //将全部用户信息保存至usersDefault,
        //将前三个用户消息保存至users
        
        that.setData({
          users: users.slice(0, 3),
          usersDefault:res.data.data.users,
          loading: false,
        })

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