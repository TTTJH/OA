Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: false,
    picker: ['17', '18', '19'],
      name:"",
      major:"",
      number:"",
      email:"",
      sex:true,
      grade:"",
      tip:false,
      submiting:false
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  watchName:function(e){
    let { index } = e.currentTarget.dataset;
    index = index * 1;
    if(index == 0){
      //name
      this.setData({
        name: e.detail.value
      })
      console.log(this.data.name)
    }else if(index == 1){
      //major
      this.setData({
        major: e.detail.value
      })
    }else if (index == 2){
      //number
      this.setData({
        number: e.detail.value
      })
    }else if(index == 3){
      //email
      this.setData({
        email: e.detail.value
      })
    }else if(index == 4){
      console.log(4444);
    }
  },
  sexSwitch:function(){
    let {sex} = this.data;
    sex = !sex;
    this.setData({
      sex
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  submit:function(){
    var that = this;
    let {
      name,
      major,
      number,
      email,
      sex,
      grade,
      index,
      picker
    } = this.data;
    let re = /^1\d{10}$/;
    let re2 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    let isNumber = re.test(number);
    let isEmail = re2.test(email);
    console.log(name);
    console.log(major);
    console.log(number);
    console.log(email);
    console.log(index);
    console.log(isNumber);
    console.log(isEmail)
  if(!name || !major || !number || !email || !index || !isNumber || !isEmail){
    //tio触发
    this.setData({
      tip:true,
    })

    //1s后改回
    setTimeout(() => {
      this.setData({
        tip: false
      })
    },6000)
  }else{
    let userStorage = wx.getStorageSync('userData');
    let {sex} = this.data;
    sex ? sex = '男' : sex = '女';
    this.setData({
      submiting:true,
    })
    //提交
    wx.request({
      url: 'http://nothing.natapp1.cc/user', //url
      method: 'PUT', //请求方式
      // header: {
      //   'Content-Type': 'application/json',
      // },
      data: {
        id: userStorage.id,
        name,
        gradle: grade,
        gender: sex,
        belongClass: major,
        email,
        phone: number
      },
      success: function (res) {
        that.setData({
          submiting:false
        })

        //回家
        wx.navigateTo({
          url: '/pages/index/index'
        })
      },
      fail: function () {
      },
      complete: function () {
        // complete 
      }
    })
  }
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    
  },

})
