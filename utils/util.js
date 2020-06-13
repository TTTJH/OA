//获取应用实例
const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const judgeToken = (msg,tag) => {
  
  if (msg == 'token verify fail'){
    console.log("token过期!")

    //token已经过期,需要跳转至mine页面重新登入
    //清除userInfo
    //设置app.globalData.userInfo为空,mine页面ready函数会将其data设置为空
    app.globalData.userInfo = ""
    let pages = getCurrentPages()
    console.log(pages)
    if(!tag){
      wx.navigateTo({
        url: '/pages/index/index?curPage=mine',
      })    
    }

    

  }
}

module.exports = {
  formatTime: formatTime,
  judgeToken:judgeToken
}
