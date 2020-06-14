//获取应用实例
const app = getApp()

Page({
  data:{
    userData:wx.getStorageSync('userData'),
    tip:"",
    tagStatusClass:"",
    iconStatusClass:[],
    hide:"hide",
    curPage:'main',
    userInfo:app.globalData.userInfo,
    putUrl:"",
    //用于确认发布按钮动画是否在进行
    fading:false,
    gotoList: [
      //以下为发布按钮跳转路径
      '/pages/sf/sf',
      '/pages/of/of',
      //添加资源不跳转
      '/pages/cf/cf'
    ],
  },
  goto: function (res) {
    wx.navigateTo({
      url: this.data.gotoList[res.currentTarget.dataset.index]
    })
  },
  uploadResource(){
    this.setData({
      tip:""
    })
    let that = this
    wx.chooseMessageFile({
      success(res) {
        console.log(res);
        // const tempFilePaths = res.tempFilePaths
        const tempFilePaths = res.tempFiles[0].path
        let title = res.tempFiles[0].name
        //将选择好的文件转为base64格式
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths, //选择图片返回的相对路径
          encoding: "base64",//这个是很重要的
          success: res => { //成功的回调
            //返回base64格式
            console.log(res.data)

            let unit8Arr = new Uint8Array(wx.base64ToArrayBuffer(res.data));
            let encodedString = String.fromCharCode.apply(null, unit8Arr),
              decodedString = decodeURIComponent(escape((encodedString)));//没有这一步中文会乱码

            console.log(typeof decodedString);
            let token = wx.getStorageSync('token')
            console.log(title)
            wx.request({
              url: 'https://www.tttjh.com.cn/resource/go',
              method: "POST",
              header: {
                'content-type': 'application/json',
                'nothing-token': token
              },
              data:{
                content: decodedString,
                title:title
              } ,
              success(res){
                console.log(res)
                that.setData({
                  tip:"添加成功"
                })
              },
              fail(res){
                console.log(":(")
              }
            })
          },
          fail:res => {
            console.log("uploadresource fial")
          }
        })
      }
    })
  },
  uploadItem(){
    //先往后端传一个文件名,得到putUrl传送url
    wx.request({
      url: 'https://www.tttjh.com.cn/file/put/xxx',
      method:"get",
      header: {
            'Content-Type': 'application/octet-stream',
            "x-oss-meta-author":"aliy"
          },
      success(res){
        console.log(res);
        let {putUrl} = res.data.data;

        wx.chooseMessageFile({
          type:'image',
          success(res) {
            // const tempFilePaths = res.tempFilePaths
            const tempFilePaths = res.tempFiles
            wx.uploadFile({
              url: putUrl, //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
              },
              success(res) {
                console.log(":)")
                const data = res.data
                console.log(res);
              },
              fail(){
                console.log("::(")
              }
            })
          }
        })
      },
      fail(res){
        console.log(":(");
      }
    })

  },
  queryMultipleNodes: function () {
    const query = wx.createSelectorQuery()                // 创建节点查询器 query
    query.select('#productServe').boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.select('#enterpriseServe').boundingClientRect() // 这段代码的意思是选择Id=enterpriseServe的节点，获取节点位置信息的查询请求
    query.select('#normalServe').boundingClientRect()     // 这段代码的意思是选择Id=normalServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()                 // 这段代码的意思是获取页面滑动位置的查询请求

  },
  navChange(e){
    this.setData({
      curPage: e.currentTarget.dataset.cur
    })
  },
  tagChange(){
    console.log(":)");
    console.log(this);
    if(this.data.tagStatusClass == 'tag-hide' || this.data.tagStatusClass == ''){
      let arr = [];
      for(let i = 0;i<4;i++){
        let str = 'icon-show' + (i +1);
        arr.unshift(str);
      }
      console.log(arr);
      this.setData({
        tagStatusClass:"tag-show",
        iconStatusClass:arr,
        hide:""
      })

    }else{
      let arr = [];
      for (let i = 0; i < 4; i++) {
        let str = 'icon-hide' + (i + 1);
        arr.unshift(str);
      }
      this.setData({
        tagStatusClass: 'tag-hide',
        iconStatusClass:arr,
        fading:true,
      })
      //延迟一秒中给tag添加hide类名,并且在该1秒钟,发布按钮无效

      setTimeout(() => {
        this.setData({
          hide:"hide",
          fading:false
        })
      },500)//此秒数与tagfadeout的duration相对应
      
    }
  },
  onLoad:function(option){
    console.log(option.curPage)
    if(option.tip == 1){
      //提示文字应该是 "签到成功!"
      this.setData({
        tip:"签到成功!"
      })
    }else if(option.tip == 2){
      //提示文字应该是"活动签到成功!""
      this.setData({
        tip: "活动签到成功!"
      })
    }else if(option.tip == 3){
      this.setData({
        tip: "删除成功!"
      })
    }else if(option.tip == 4){
      this.setData({
        tip: "发布成功!"
      })
    } else if (option.tip == 5) {
      this.setData({
        tip: "添加成功!"
      })
    } else if (option.tip == 6) {
      this.setData({
        tip: "添加成功!"
      })
    } else if (option.tip == 7) {
      this.setData({
        tip: "发布成功!"
      })
    }else if(option.tip == 'resign'){
      this.setData({
        tip: "请勿在半小时内重复签到"
      })
    }else if(option.tip == 'signout'){
      this.setData({
        tip: "签退成功！"
      })
    }else if(option.tip == 'activity'){
      this.setData({
        tip: "活动签到成功！"
      })
    }
    if(option.curPage){
      //如果存在,证明是utils函数跳转,需要到Mine组件处
      this.setData({
        curPage: option.curPage
      })
    }
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    console.log(wx.getCurrentPages())
    console.log(wx.getStorageSync('userData'))
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  upload:function(){
    var that = this;

    wx.request({
      url: 'https://www.tttjh.com.cn/file/put/test', //url
      method: 'GET', //请求方式
      // header: {
      //   'Content-Type': 'application/json',
      // },
      success: function (res) {
        console.log(":::)")
        console.log(res);
        let {putUrl} = res.data.data;
        wx.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album"],
          success(res) {
            const tempFilePaths = res.tempFilePaths
            wx.uploadFile({
              header: {
                'Content-Type': 'multipart/form-data',
              },
              url: putUrl, //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                // 'user': 'test'
                method: 'PUT'
              },
              success(res) {
                const data = res.data
                console.log(res);
                //do something
              }
            })
          }
        })


      


      
        /***************** */
      },
      fail: function () {
      },
      complete: function () {
        // complete 
      }
    })
  },

})
