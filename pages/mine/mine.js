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
      { icon: "cuIcon-mark", txt: "留言" },
      { icon: "cuIcon-github", txt: "github" },
      { icon: "cuIcon-settingsfill", txt: "设置" },
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
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    
      // 登录
      wx.login({
        success: res => {
          wx.request({
            url: 'http://nothing.natapp1.cc/wx/login',
            method: 'POST',
            // header: {
            //   'Content-Type': "application/x-www-form-urlencoded",
            // },
            data: {
              code: res.code,
            },
            success: function (res) {
              console.log("登入，设置了最新的userData给storage");
              wx.setStorageSync("userData", res.data.data.user);

              //判断用户有无完善信息请求
              let userStorage = wx.getStorageSync('userData');
              console.log(userStorage)
              wx.request({
                url: `http://nothing.natapp1.cc/user/info/${userStorage.id}`,
                method: 'GET',
                // header: {
                //   'Content-Type': "application/x-www-form-urlencoded",
                // },
                // data: {
                //   id: 100,
                // },
                success: function (res) {
                  //返回false即是没有完善信息要强制跳转到form页面
                  wx.navigateTo({
                    url: '/pages/form/form'
                  })
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



    },
  },
  created: function () {
    // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用setData
    console.log('Component-1 >> created');
  },
  attached: function () {
    // 组件生命周期函数，在组件实例进入页面节点树时执行。
    console.log('Component-1 >> attached');
  },
  ready: function () {
    // 在组件布局完成后执行，此时可以获取节点信息
    console.log(app.globalData);
    conosle.log(":)");

  },

  moved: function () {
    // 在组件实例被移动到节点树另一个位置时执行
    console.log('Component-1 >> moved');
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
    console.log('Component-1 >> detached');
  },
  lifetimes: {
    // 组件生命周期声明对象，将组件的生命周期收归到该字段进行声明，
    //原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
    created: function () {
      console.log('Component-1 lifetimes >> created');
    },
    attached: function () {
      console.log('Component-1 lifetimes >> attached');
    },
    ready: function () {
      console.log('Component-1 lifetimes >> ready');
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