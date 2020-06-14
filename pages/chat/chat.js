// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     notices:[],
//     loading:true,
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
//     let that = this
//     let token = wx.getStorageSync('token')
//     wx.request({
//       url: 'https://www.tttjh.com.cn/notice/go',
//       method: "GET",
//       header: {
//         'content-type': 'application/json',
//         'nothing-token': token
//       },
//       success(res) {
//         let message = []
//         let obj = {}
//         //整理后端数据
//         /*
//         arr =   [
//           {
//             data:06-11,
//             messages:[{...},{...}],
//           },
//           {
//             data:05-20,
//             messages:[{...},{...}],
//           }
//           ]
//         */ 
//         let data = res.data.data.noticeBoard
//         for (let i = 0; i < data.length; i=i+2){
//           let obj = {}
//           data[i].indexOf(" ")
//           obj.time = data[i + 1].slice(data[i + 1].indexOf(" ") + 1)
//           obj.day = data[i + 1].slice(0, data[i + 1].indexOf(" "))
//           obj.content = data[i]
//           message.push(obj)
//         }
//         console.log(data)
//         console.log(message)
//         let arr = []
//         for(let i = 0;i < message.length - 1;i++){
//           let obj = {}
//           obj.day = message[i].day
//           obj.messages = []
//           obj.messages.push(message[i])
//           for(let j = i+1;j<message.length;j++){
//             if(message[j].day == obj.day){
//               obj.messages.push(message[j])
//             }
//           }
//             arr.push(obj)
//           console.log(arr[i])
//             if(i!=0 && arr[i].day == arr[i-1].day){
//               arr = arr.slice(0,i)
//             }
//         }
//         console.log(arr)
//         that.setData({
//           notices:arr,
//           loading:false
//         })
//       },
//       fail() {
//         console.log(":(")
//       }
//     })
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
    
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
    
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
    
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
    
//   },
//   // 当前页面url
//   setCurrentPageUrl:function () {
//     const pages = getCurrentPages()
//   const currentPage = pages[pages.length - 1]
//   const url = `/${currentPage.route}`
//   this.setData({
//     url
//   });
//   return url;
//   }

// })
let utils = require("../../utils/util.js")
Component({

  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    myProperty: { // 属性名
      type: String,
      value: ''
    },
    myProperty2: String // 简化的定义方式
  },

  data: {
    notices: [],
    loading: true,
    url:""
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
          // 当前页面url
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const url = `/${currentPage.route}`
      this.setData({
        url
      });

      
      let that = this
      let token = wx.getStorageSync('token')
      wx.request({
        url: 'https://www.tttjh.com.cn/notice/go',
        method: "GET",
        header: {
          'content-type': 'application/json',
          'nothing-token': token
        },
        success(res) {
          // console.log(res.data.data.error)
          if (res.data.data.error) {
            utils.judgeToken(res.data.data.error,"dont")
          } else {
            let message = []
            let obj = {}

            let data = res.data.data.noticeBoard
            for (let i = 0; i < data.length; i = i + 2) {
              let obj = {}
              data[i].indexOf(" ")
              obj.time = data[i + 1].slice(data[i + 1].indexOf(" ") + 1)
              obj.day = data[i + 1].slice(0, data[i + 1].indexOf(" "))
              obj.content = data[i]
              message.push(obj)
            }
            //整理后端数据
            /*
            arr =   [
              {
                data:06-11,
                messages:[{...},{...}],
              },
              {
                data:05-20,
                messages:[{...},{...}],
              }
              ]
            */
            console.log(message)

            let arr = []
            for (let i = 0; i < message.length - 1; i++) {
              let obj = {}
              obj.day = message[i].day
              obj.messages = []
              obj.messages.push(message[i])
              for (let j = i + 1; j < message.length; j++) {
                if (message[j].day == obj.day) {
                  obj.messages.push(message[j])
                  i = j - 1
                }
              }
              arr.push(obj)
              // if (i != 0 && arr[i].day == arr[i - 1].day) {
              //   arr = arr.slice(0, i)
              // }
            }
            console.log(arr)
            that.setData({
              notices: arr,
              loading: false
            })
          }
        
        },
        fail() {
          console.log(":(")
        }
      })
    },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 当前页面url
    setCurrentPageUrl: function () {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const url = `/${currentPage.route}`
      this.setData({
        url
      });
      return url;
    }
    // 内部方法建议以下划线开头
    // _myPrivateMethod: function () {
    //   // 这里将 data.A[0].B 设为 'myPrivateData'
    //   this.setData({
    //     'A[0].B': 'myPrivateData'
    //   })
    // },
    // _propertyChange: function (newVal, oldVal) {

    // }
  }

})