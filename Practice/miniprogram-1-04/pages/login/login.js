// login.js
Page({
  data: {
    phone: '', // 手机号
    code: '', // 验证码
    phoneTip: '', // 手机号提示信息
    codeTip: '', // 验证码提示信息
    btnColor: '#999', // 按钮颜色
    btnEnabled: false // 按钮是否可用
  },
  // 监听手机号输入
  inputPhone: function(event) {
    const value = event.detail.value;
    this.setData({
      phone: value,
      phoneTip: value ? '' : '请输入手机号'
    });
    this.checkBtnStatus();
  },
  // 监听验证码输入
  inputCode: function(event) {
    const value = event.detail.value;
    this.setData({
      code: value,
      codeTip: value ? '' : '请输入验证码'
    });
    this.checkBtnStatus();
  },
  // 校验按钮状态
  checkBtnStatus: function() {
    const { phone, code } = this.data;
    const btnEnabled = phone && code;
    this.setData({
      btnColor: btnEnabled ? '#ff4444' : '#999',
      btnEnabled: btnEnabled
    });
  },
  // 登录按钮点击事件
  login: function() {
    // 登录逻辑
  }
})
