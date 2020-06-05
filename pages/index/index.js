//获取应用实例
const app = getApp()

Page({
  data:{
    tagStatusClass:"",
    iconStatusClass:[],
    hide:"hide",
    curPage:'main',
    userInfo:app.globalData.userInfo
  },
  uploadResource(){
    wx.chooseImage({
      success(res) {
        console.log(res);
        const tempFilePaths = res.tempFilePaths
        //将选择好的文件转为base64格式
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: "base64",//这个是很重要的
          success: res => { //成功的回调
            //返回base64格式
            console.log(res.data)

            let unit8Arr = new Uint8Array(wx.base64ToArrayBuffer(res.data));
            let encodedString = String.fromCharCode.apply(null, unit8Arr),
              decodedString = decodeURIComponent(escape((encodedString)));//没有这一步中文会乱码

            console.log(decodedString);
          }
        })
      }
    })
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
        iconStatusClass:arr
      })
      setTimeout(() => {
        this.setData({
          hide:"hide"
        })
      },1000)
      
    }
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
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
      url: 'http://nothing.natapp1.cc/file/put/test', //url
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
