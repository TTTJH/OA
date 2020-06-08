//index.js
//获取应用实例
const app = getApp()

// Page({
//   data: {
//     StatusBar: app.globalData.StatusBar,
//     CustomBar: app.globalData.CustomBar,
//     icons: [
//       { name: 'activity', isShow: true },
//       { name: 'friend', isShow: true },
//       { name: 'repair', isShow: true },
//       { name: 'file', isShow: true },
//       { name: 'comment', isShow: true },
//     ],
//     gotoList: [
//       '/pages/sign/sign',
//       '/pages/member/member',
//       "/pages/object/object",
//       "/pages/resource/resource",
//       "/pages/chat/chat"
//     ],
//     motto: 'Hi 同学！',
//     userInfo: {
      
//     },//nickName, gender,city,province,avatarUrl
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   goto: function (res) {
//     wx.navigateTo({
//       url: this.data.gotoList[res.currentTarget.dataset.index]
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function (e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   },
//   onReady:function(){

//   }
// })

Component({
  properties: {
    innerText: {
      type: String
    }
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    icons: [
      { name: 'activity', isShow: true },
      { name: 'friend', isShow: true },
      { name: 'repair', isShow: true },
      { name: 'file', isShow: true },
      { name: 'comment', isShow: true },
    ],
    gotoList: [
      '/pages/sign/sign',
      '/pages/member/member',
      "/pages/object/object",
      "/pages/resource/resource",
      "/pages/chat/chat",      
    ],
    motto: 'Hi 同学！',
    userInfo: {

    },//nickName, gender,city,province,avatarUrl
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  methods: {
      goto: function (res) {
    wx.navigateTo({
      url: this.data.gotoList[res.currentTarget.dataset.index]
    })
  },
  },
  created: function () {
    // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用setData
  },
  attached: function () {
    // 组件生命周期函数，在组件实例进入页面节点树时执行。
  },
  ready: function () {
    // 在组件布局完成后执行，此时可以获取节点信息

  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  moved: function () {
    // 在组件实例被移动到节点树另一个位置时执行
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
  lifetimes: {
    // 组件生命周期声明对象，将组件的生命周期收归到该字段进行声明，
    //原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
    created: function () {
    },
    attached: function () {
    },
    ready: function () {
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
    moved: function () {
    },
    detached: function () {
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function () {
    },
    hide: function () {
    }
  },

  options: {
    addGlobalClass: true
  }

})
