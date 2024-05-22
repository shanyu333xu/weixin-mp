Page({
  data: {
    userInfo: null
  },
  onLoad: function () {
    // 假设用户信息保存在全局的app实例中，这里只是一个示例
    let userInfo = getApp().globalData.userInfo;
    this.setData({
      userInfo: userInfo
    });
  },
  goToLoginPage: function () {
    wx.navigateTo({
      url: '/pages/loginByPhone/loginByPhone'
    });
  }
});
