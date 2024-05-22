// index.js
Page({
  // 其他逻辑

  // 跳转到登录页面
  goToLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  }
})
