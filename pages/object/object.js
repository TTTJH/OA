let utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addLogsIng:false,
      tip:"",
      loading:true,
      itemName:"",
    addingMember:false,
      id:"",
      items:[],
      users:[],
      boxClass:[
        'bg-gradual-blue',
        'bg-gradual-red',
        'bg-gradual-purple'
        
      ],
      logsIcon:[
        'cuIcon-discover',
        'cuIcon-emoji',
        'cuIcon-crown',
        'cuIcon-musicfill'
      ],
      textarea:"",
  },
  fileDownload:function(e){
    //获取参数url和格式
    let { url,format } = e.currentTarget.dataset;
    // console.log(url);
    wx.downloadFile({
      url, //仅为示例，并非真实的资源
      success(res) {
        // console.log(res);
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        const filePath = res.tempFilePath;
        wx.openDocument({
          filePath,
          fileType: format,
          success:function(){
            console.log("success");
          }
        })
      }
    })
  },
  openDetail:function(e){
    var that = this;
    //点击某项目box后可以使得object-box获取object-detail样式
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    items[index].flag = true;
    this.setData({
      items,
      id: items[index].id,
      itemName: items[index].name
    })

    //1s后再将flag2置为true

    setTimeout(() => {
      let items2 = this.data.items;
      items2[index].flag2 = true;
      this.setData({
        items: items2,
      })
    },1000);  

    this.requestDetail(index);
  },
  closeDetail:function(e){
    let { index} = e.currentTarget.dataset;
    let items = this.data.items;

    if(items[index].flag){
      //使用arrow关闭
      items[index].flag = false;
      items[index].flag2 = false;
      this.setData({
        items
      })
    }else{
      //使用arrow开启
      items[index].flag = true;
      this.setData({
        items
      });
      //1s后再将flag2置为true

      setTimeout(() => {
        let items2 = this.data.items;
        items2[index].flag2 = true;
        this.setData({
          items: items2,
        })
      }, 1000);
      this.requestDetail(index);
    }



  },

//获取item详情函数，供openDetail和closeDetail调用
  requestDetail:function(index){
    //点击某项目Box后发起获取detail请求，并更新指定item
    //获取点击item的id
    var that = this;
    let id = this.data.items[index].id
    let token = wx.getStorageSync('token')
    wx.request({
      url: `http://nothing.natapp1.cc/item/go/${id}`, //id为0,获取全部项目
      method: "GET",
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success: function (res) {
        console.log(res)
        //若续约token
        res.header['nothing-token']
          ?
          wx.setStorageSync("token", res.header['nothing-token'])
          :
          console.log("nothing")
        // console.log(res)
        let items = that.data.items;
        items[index].membersInfo = res.data.data.memebers;
        items[index].logs = res.data.data.logs;
        //模拟log
        // let logs = [
        //   {
        //     time: "2020-05-22T16:57:23",
        //     log: "今天修补了迷之bug",
        //   },
        //   {
        //     time: "2020-05-22T16:57:23",
        //     log: "摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)",
        //   },
        //   {
        //     time: "2020-05-22T16:57:23",
        //     log: "晚上去吃些什么好呢",
        //   },
        // ]
        // items[index].logs = logs;
        //模拟files的url进行测试
        let fileUrls = [
          'http://139.9.115.248/imgs/test1.doc',
          'http://139.9.115.248/imgs/test2.doc',
        ]
        let { files} = res.data.data
        let filesInfo = []
        /*filesInfo = [
          {
            name:xxx,
            url:xxx,
            format:xxx
          },
          {
            name:xxx,
            url:xxx,
            format:xxx
          }
        ]*/
        // console.log(files)
          Object.keys(files).forEach((key, index) => {
            let name = key.slice(key.indexOf('/')+1)
            // console.log(name)
            let url = files[key]
            // console.log(url)
            let format = key.slice(key.lastIndexOf('.')+1)
            // console.log(format)
            let obj = {
              name,
              url,
              format
            }
            filesInfo.push(obj)
          // let name = [];
          // for (let i = item.length - 1; i >= 0; i--) {
          //   if (item[i] == '/') {
          //     break;
          //   } else {
          //     name.unshift(item[i]);
          //   }
          // }
          // let obj = {
          //   url: item,
          //   name: name.join(""),
          //   format: name.join("").slice(-3)
          // }
          // filesInfo.push(obj);
        })
        items[index].filesInfo = filesInfo;
        that.setData({
          items,
        })
        // console.log(items);
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
    console.log(this.data.items);
    let that = this;
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://nothing.natapp1.cc/item/go/0', //id为0,获取全部项目
      method: 'GET', //请求方式
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success: function (res) {
        if (res.data.data.error) {
          utils.judgeToken(res.data.data.error)
        } else {
          console.log(res)
          //若续约token
          res.header['nothing-token']
            ?
            wx.setStorageSync("token", res.header['nothing-token'])
            :
            console.log("nothing")
          let { items } = res.data.data;
          //增加flag标示
          //增加flag2标示
          items.forEach((item) => {
            item.flag = false
            item.flag2 = false
            item.userList = false
            item.textareaStatus = false
          })

          that.setData({
            items,
            loading: false,
          })
          console.log(items);
        }

      },
      fail: function () {
      },
      complete: function () {
        // complete 
      }
    })
  },
  userChoose:function(e){
    let index = e.currentTarget.dataset.index
    let {users} = this.data
    users[index].choose = !users[index].choose
    this.setData({
      users
    })
  },  
  addMember:function(e){
    let that = this;
    let token = wx.getStorageSync('token')
    let index = e.currentTarget.dataset.index;
    let {items} = this.data
    items[index].userList = !items[index].userList
    console.log(items[index])
    //取出已经存在的用户的id
    let idArr = []
    items[index].membersInfo.forEach((item, index) => {
      idArr.push(item.id)
    })

    this.setData({
      items
    })
    //避免多次请求
    // if(!this.data.users.length){
      wx.request({
        url: 'http://nothing.natapp1.cc/user/list',
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'nothing-token': token
        },
        success(res) {
          //若续约token
          console.log(res)
          res.header['nothing-token']
            ?
            wx.setStorageSync("token", res.header['nothing-token'])
            :
            console.log("nothing")
          let { users } = res.data.data
          let  newUsers = []

          users.forEach((item, index) => {
            item.id != idArr[index]
            ?
            newUsers.push(item)
            :
            console.log("nothing")
          })
          console.log(idArr)
          console.log(newUsers)
          //为users添加各自的choose属性
          newUsers.forEach((item, index) => {
            item.choose = false
          })
          that.setData({
            users: newUsers
          })

        },
        fail(res) {
          console.log(res)
        }
      })

    // }
    
  },
  addMemberBtn:function(e){
    let { index } = e.currentTarget.dataset

    console.log(":)")
    this.setData({
      addingMember:true
    })
    let uids = []
    let that = this
    let token = wx.getStorageSync('token')
    that.data.users.forEach((item) => {
      item.choose
        ?
        uids.push(item.id)
        :
        console.log("nothing")
    })
    console.log(uids)
    wx.request({
      url: 'http://nothing.natapp1.cc/item/go',
      method: "PUT",
      data: {
        uids,
        id:this.data.id
      },
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res) {
        res.header['nothing-token']
          ?
          wx.setStorageSync("token", res.header['nothing-token'])
          :
          console.log("nothing")
        that.setData({
          addingMember: false
        })
        that.requestDetail(index)
        //关闭scroll-view
        let {items} = that.data
        items[index].userList = false
        this.setData({
          items
        })
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  addFile:function(e){
    let that = this
    let {index} = e.currentTarget.dataset
    wx.chooseMessageFile({
      success(res) {
        console.log(res)
        // let files = that.data.files
        // console.log(res)
        // let { name } = res.tempFiles[0]
        // let format = name.slice(name.lastIndexOf('.') + 1)
        // if (res.tempFiles[0].type == 'image') {
        //   format = 'image'
        // }
        // res.tempFiles[0].format = format
        // files.unshift(res.tempFiles[0])
        that.setData({
          files:res.tempFiles[0]
        })
        console.log(that.data.files)
        let token = wx.getStorageSync('token')
        wx.uploadFile({
          url: `http://nothing.natapp1.cc/file/upload/${that.data.itemName}/${that.data.files.name}`,
          filePath: that.data.files.path,
          name: 'file',
          formData: {
            // 'user': 'test'
          },
          header: {
            'nothing-token': token
          },
          success(res) {
              console.log(res)
              //提交uids和name和fileUrls
            let obj = JSON.parse(res.data)
            console.log(obj.data.url)
            let fileUrls = [obj.data.url]
              wx.request({
                url: 'http://nothing.natapp1.cc/item/go',
                method: "put",
                header: {
                  'nothing-token': token
                },
                data: {
                  id: that.data.id,
                  fileUrls
                },
                success(res) {
                  console.log(res)
                  //添加文件成功
                  that.requestDetail(index)
                  that.setData({
                    tip:"添加文件成功!"
                  })
                },
                fail() {
                  console.log("LKJJJ")
                }
              })
          },
          fail() {
            console.log(":(")
          }
        })
        // console.log(that.data.files)
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
  logChange:function(e){
    let textarea = e.detail.value
    this.setData({
      textarea
    })
  },
  addLogCircle:function(e){
    let {index} = e.currentTarget.dataset
    let { items } = this.data
    items[index].textareaStatus = !items[index].textareaStatus
    this.setData({
      items
    })
  },
  addLog:function(){
    this.setData({
      addLogsIng:true
    })
    let that = this
    let token = wx.getStorageSync('token')
    console.log(this.data.textarea)
    wx.request({
      url: 'http://nothing.natapp1.cc/item/go',
      method: "PUT",
      data: {
        log:this.data.textarea,
        id: this.data.id
      },
      header: {
        'content-type': 'application/json',
        'nothing-token': token
      },
      success(res) {
        res.header['nothing-token']
          ?
          wx.setStorageSync("token", res.header['nothing-token'])
          :
          console.log("nothing")
        console.log(res)
        that.setData({
          addLogsIng: false,
          tip:"添加成功!"
        })
      },
      fail(res) {
        console.log(res)
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