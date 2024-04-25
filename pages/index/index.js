// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const util = require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World！',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    currentDate: '', // 存储当前日期的变量
    stocks: [
      { name: '股票A', code: '000001', price: '10.00', change: '+0.5%' },
      { name: '股票B', code: '000002', price: '20.50', change: '-1.2%' },
      { name: '股票C', code: '000003', price: '15.75', change: '+2.0%' },
      { name: '股票D', code: '000004', price: '10.00', change: '+0.5%' },
      { name: '股票F', code: '000005', price: '21.50', change: '-1.8%' },
      { name: '股票G', code: '000006', price: '15.75', change: '+2.8%' },
    ],
  },
  onLoad: function () {
    this.setCurrentDate(); // 页面加载时设置当前日期
  },
  setCurrentDate: function () {
    const currentDate = util.formatDate(new Date()); // 使用util.js中的格式化函数获取当前日期
    this.setData({
      currentDate: currentDate,
    });
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
