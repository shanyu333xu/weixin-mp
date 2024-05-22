Page({
  data: {
    phoneNumber: '',
    verificationCode: '',
    isCodeButtonDisabled: false, // 控制获取验证码按钮的禁用状态
    btnColor: '#ccc', // 默认按钮灰色不可用
    countdown: 60 // 倒计时初始值
  },

  inputPhone: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    });
    this.checkInput(); // 检查输入内容
  },

  inputCode: function (e) {
    this.setData({
      verificationCode: e.detail.value
    });
    this.checkInput(); // 检查输入内容
  },

  checkInput: function () {
    if (this.data.phoneNumber && this.data.verificationCode) {
      this.setData({
        btnColor: 'red' // 输入内容后，按钮变为红色可用状态
      });
    } else {
      this.setData({
        btnColor: '#ccc' // 否则按钮为灰色不可用状态
      });
    }
  },
  getCode: function () {
    // 模拟获取验证码的逻辑，这里只是一个示例
    console.log('获取验证码');
    // 禁用获取验证码按钮
    this.setData({
      isCodeButtonDisabled: true
    });
    // 开始倒计时
    this.startCountdown();
  },

  // 倒计时函数
  startCountdown: function () {
    let that = this;
    let count = that.data.countdown;
    // 设置一个定时器，每隔一秒执行一次
    let timer = setInterval(function () {
      count--;
      // 更新倒计时的值
      that.setData({
        countdown: count
      });
      // 倒计时结束时清除定时器，并恢复获取验证码按钮的可点击状态
      if (count === 0) {
        clearInterval(timer);
        that.setData({
          isCodeButtonDisabled: false,
          countdown: 60 // 重置倒计时
        });
      }
    }, 1000);
  },
  login: function () {
    console.log('手机号：', this.data.phoneNumber),
    console.log('验证码：', this.data.verificationCode),
    wx.switchTab({
      url: '/pages/hangqing/hangqing'
    });
  }
});
