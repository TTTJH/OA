//获取应用实例
const app = getApp()

Component({
  properties: {
    innerText: {
      type: String
    }
  },
  data: {
    icons: [
      { icon: "cuIcon-edit", txt: "修改信息" },
      { icon: "cuIcon-favor", txt: "收藏" },
      { icon: "cuIcon-discover", txt: "探索发现" },
      { icon: "cuIcon-selection", txt: "勋章墙" },
      // { icon: "cuIcon-mark", txt: "留言" },
      // { icon: "cuIcon-github", txt: "github" },
      // { icon: "cuIcon-settingsfill", txt: "设置" },
    ],
    gotoList: [
      '/pages/form/form',
    ],
    userInfo:{},
    hasUserInfo:false,
  },

  methods: {
    goto: function (res) {
      wx.navigateTo({
        url: this.data.gotoList[res.currentTarget.dataset.index]
      })
    },
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      let {
        encryptedData,
        iv
      } = e.detail

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })

      wx.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效
          console.log("session_key 未过期，并且在本生命周期一直有效")
          // console.log(wx.getStorageSync('loginData'))
          // 二次重新登入获取新token
          let obj = wx.getStorageSync("loginData")
              console.log(obj)
              wx.request({
                url: 'https://www.tttjh.com.cn/wx/login',
                method: 'POST',
                data: {
                  code: obj.code,
                  encryptedData: obj.encryptedData,
                  iv:obj.iv
                },
                success: function (res) {
                  console.log(res)
                  wx.setStorageSync("userData", res.data.data.user);
                  // 设置token
                  wx.setStorageSync("token", res.data.data.token)
                  //判断用户有无完善信息请求
                  let userStorage = wx.getStorageSync('userData')
                  let token = wx.getStorageSync('token')
                  wx.request({
                    url: `https://www.tttjh.com.cn/user/info/${userStorage.id}`,
                    method: 'GET',
                    header: {
                      'content-type': 'application/json',
                      'nothing-token': token
                    },
                    success: function (res) {
                      if (!res.data.data.boolean) {
                        //返回false即是没有完善信息要强制跳转到form页面
                        wx.navigateTo({
                          url: '/pages/form/form'
                        })
                      }
                    },
                    fail: function () {
                      console.log("请求数据失败");
                    },
                  })
                },
                fail: function () {
                  console.log("请求数据失败");
                },
              })
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          console.log('session_key 已经失效，需要重新执行登录流程')
          // 登录
          wx.login({
            success: res => {
              console.log(res)
              //保存二次登入所需的code,encry,iv
              let obj = {
                code: res.code,
                encryptedData,
                iv
              }
              wx.setStorageSync("loginData", obj);
              // let obj = wx.getStorageSync(obj)
              wx.request({
                url: 'https://www.tttjh.com.cn/wx/login',
                method: 'POST',
                data: {
                  code: obj.code,
                  encryptedData: obj.encryptedData,
                  iv: obj.iv
                },
                success: function (res) {
                  console.log(res)
                  wx.setStorageSync("userData", res.data.data.user);
                  // 设置token
                  wx.setStorageSync("token", res.data.data.token)
                  //判断用户有无完善信息请求
                  let userStorage = wx.getStorageSync('userData')
                  let token = wx.getStorageSync('token')
                  wx.request({
                    url: `https://www.tttjh.com.cn/user/info/${userStorage.id}`,
                    method: 'GET',
                    header: {
                      'content-type': 'application/json',
                      'nothing-token': token
                    },
                    success: function (res) {
                      if (!res.data.data.boolean) {
                        //返回false即是没有完善信息要强制跳转到form页面
                        wx.navigateTo({
                          url: '/pages/form/form'
                        })
                      }
                    },
                    fail: function () {
                      console.log("请求数据失败");
                    },
                  })
                },
                fail: function () {
                  console.log("请求数据失败");
                },
              })
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
          })
        }
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
      }
      else if (!app.globalData.userInfo){
        //没有了app.globalData.userInfo
                    this.setData({
              userInfo: "",
              hasUserInfo: false
            })
      }
      // else if (!app.globalData.userInfo){
      //   // 在没有 open-type=getUserInfo 版本的兼容处理
      //   wx.getUserInfo({
      //     success: res => {
      //       app.globalData.userInfo = res.userInfo
      //       this.setData({
      //         userInfo: res.userInfo,
      //         hasUserInfo: true
      //       })
      //     }
      //   })
      // }
    },
    moved: function () {
      console.log('Component-1 lifetimes >> moved');
    },
    detached: function () {
      console.log('Component-1 lifetimes >> detached');
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function () {
      console.log('Component-1 pageLifetimes >> Show');
    },
    hide: function () {
      console.log('Component-1 pageLifetimes >> Hide');
    }
  },

  options: {
    addGlobalClass: true
  }

})