Page({
  data: {
    zixuanImage: '/pages/images/zixuanshanchu.png', // 初始自选图片路径
    isFavorite: true, // 初始自选状态
    stockData: {}, // 存储原始股票信息的对象
    dataArray: {}, // 存储格式化后的股票信息的对象
    currentChart: '', // 当前显示的图表链接
    stockCode: '688523', // 股票代码
    currentTab: 'min' // 当前选中的页签，默认为分钟图
  },
/**
   * 用户点击右上角分享
   */

  onLoad: function() {
     
    // 设置当前页面导航栏标题
    wx.setNavigationBarTitle({
      title: '航天环宇（688523）'
    });
    // 请求股票数据
    this.requestStockData();
  },
  handleFavoriteTap() {
    if (this.data.isFavorite) {
      wx.showModal({
        title: '取消自选',
        content: '确定取消自选？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              isFavorite: false,
              zixuanImage: '/pages/images/zixuan.png'
            });
            wx.showToast({
              title: '已取消自选',
              icon: 'success',
              duration: 2000
            });
          }
        }
      });
    } else {
      this.setData({
        isFavorite: true,
        zixuanImage: '/pages/images/zixuanshanchu.png'
      });
      wx.showToast({
        title: '已添加到自选',
        icon: 'success',
        duration: 2000
      });
    }
  },
  // 请求股票数据
  requestStockData: function() {
    wx.request({
      url: 'https://hq.sinajs.cn/',
      data: {
        list: 'sh' + this.data.stockCode
      },
      success: (res) => {
        console.log(res.data)
        // 提取股票数据
        const dataArray = res.data.match(/".*?"/g).map(item => item.replace(/"/g, '').replace(/，/g, ','))[0].split(',');
        // 格式化股票数据
        const formattedData = this.formatStockData(dataArray);
        
        // 更新页面数据
        this.setData({
          stockData: dataArray,
          dataArray: formattedData.dataArray,
          currentChart: formattedData.chartUrl
        });
      },
      fail: (error) => {
        console.error('请求股票数据失败:', error);
      }
    });
  },

  // 格式化股票数据
  formatStockData: function(dataArray) {
    // 格式化股票信息
    let formattedData = {
      dataArray: {
        speed: ((parseFloat(dataArray[3]) - parseFloat(dataArray[2])) / parseFloat(dataArray[2]) * 100).toFixed(2),
        changeprice: (parseFloat(dataArray[3]) - parseFloat(dataArray[2])).toFixed(2),
        cje: (parseFloat(dataArray[9]) / 10e7).toFixed(1),
        num: (parseFloat(dataArray[8]) / 1000000).toFixed(1),
        max: parseFloat(dataArray[4]).toFixed(2),
        min: parseFloat(dataArray[5]).toFixed(2),
        kpj: parseFloat(dataArray[1]).toFixed(2),
      },
      // 设置默认显示的图表链接为分钟图
      chartUrl: `http://image.sinajs.cn/newchart/min/n/sh${this.data.stockCode}.gif`
    };
    return formattedData;
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '转发自选股票页面',
      path: '/pages/stockInfo/stockInfo.wxml',
      // imageUrl: '/pages/images/fenxiang.png'  // 自定义分享图片
    }
  },
  // 切换图表页签
  switchTab: function(e) {
    // 获取当前点击的页签
    const tab = e.currentTarget.dataset.tab;
    // 定义不同页签对应的图表链接
    const chartUrls = {
      daily: `http://image.sinajs.cn/newchart/daily/n/sh${this.data.stockCode}.gif`,
      min: `http://image.sinajs.cn/newchart/min/n/sh${this.data.stockCode}.gif`,
      weekly: `http://image.sinajs.cn/newchart/weekly/n/sh${this.data.stockCode}.gif`,
      monthly: `http://image.sinajs.cn/newchart/monthly/n/sh${this.data.stockCode}.gif`
    };
    // 获取对应页签的图表链接
    const chartUrl = chartUrls[tab] || '';
    // 更新当前选中的页签
    this.setData({
      currentTab: tab,
      currentChart: chartUrl
    });
  }
  
})

