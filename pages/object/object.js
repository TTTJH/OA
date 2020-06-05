Page({

  /**
   * 页面的初始数据
   */
  data: {
      loading:true,
      items:[],
      logsIcon:[
        'cuIcon-discover',
        'cuIcon-emoji',
        'cuIcon-crown',
        'cuIcon-musicfill'
      ]
  },
  fileDownload:function(e){
    //获取参数url和格式
    let { url,format } = e.currentTarget.dataset;
    console.log(url);
    wx.downloadFile({
      url, //仅为示例，并非真实的资源
      success(res) {
        console.log(res);
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
    wx.request({
      url: `http://nothing.natapp1.cc/item/go/${id}`, //id为0,获取全部项目
      method: "GET",
      success: function (res) {

        let items = that.data.items;
        items[index].membersInfo = res.data.data.memebers;
        //模拟log
        let logs = [
          {
            time: "2020-05-22T16:57:23",
            log: "今天修补了迷之bug",
          },
          {
            time: "2020-05-22T16:57:23",
            log: "摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)摸鱼的一个下午:)",
          },
          {
            time: "2020-05-22T16:57:23",
            log: "晚上去吃些什么好呢",
          },
        ]
        // items[index].logs = res.data.data.logs;
        items[index].logs = logs;
        //模拟files的url进行测试
        let fileUrls = [
          'http://139.9.115.248/imgs/test1.doc',
          'http://139.9.115.248/imgs/test2.doc',
        ]
        let filesInfo = [];
        fileUrls.forEach((item, index) => {
          let name = [];
          for (let i = item.length - 1; i >= 0; i--) {
            if (item[i] == '/') {
              break;
            } else {
              name.unshift(item[i]);
            }
          }
          let obj = {
            url: item,
            name: name.join(""),
            format: name.join("").slice(-3)
          }
          filesInfo.push(obj);
        })
        items[index].filesInfo = filesInfo;


        that.setData({
          items,
        })
        console.log(items);
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
    wx.request({
      url: 'http://nothing.natapp1.cc/item/go/0', //id为0,获取全部项目
      method: 'GET', //请求方式
      // header: {
      //   'Content-Type': 'application/json',
      // },
      // data: {
      //   id: "8",
      //   name: "tututu",
      //   gradle: "17",
      //   gender: "男",
      //   belongClass: "3G软件1702",
      //   email: "1149858111@qq.com",
      //   phone: "17739753629"
      // },
      success: function (res) {

        let {items} = res.data.data;
        //增加flag标示
        //增加flag2标示
        items.forEach((item) => {
          item.flag = false;
          item.flag2 = false;
        })

        that.setData({
          items,
          loading:false,
        })
        console.log(items);
      },
      fail: function () {
      },
      complete: function () {
        // complete 
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