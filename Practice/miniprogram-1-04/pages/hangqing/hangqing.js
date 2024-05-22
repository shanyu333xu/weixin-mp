Page({
  data: {
    stock: {
      name: '',
      code: '',
      latestPrice: '',
      highestPrice: '',
      lowestPrice: '',
      openingPrice: '',
      volume: '',
      amount: '',
      minuteChart: '',
      dailyKChart: '',
      weeklyKChart: '',
      monthlyKChart: '',
      buy1: '',
      buy2: '',
      buy3: '',
      buy4: '',
      buy5: '',
      sell1: '',
      sell2: '',
      sell3: '',
      sell4: '',
      sell5: ''
    }
  },

  onLoad: function() {
    this.fetchStockData('sh600000'); // Example stock code
  },

  fetchStockData: function(stockCode) {
    const that = this;
    wx.request({
      url: `https://hq.sinajs.cn/list=${stockCode}`,
      dataType: 'script',
      success(res) {
        const dataString = res.data.match(/"(.+)"/)[1];
        const stockData = dataString.split(',');

        that.setData({
          stock: {
            name: stockData[0],  // 股票名称
            code: stockCode,
            latestPrice: stockData[3],
            highestPrice: stockData[4],
            lowestPrice: stockData[5],
            openingPrice: stockData[1],
            volume: stockData[8],
            amount: stockData[9],
            minuteChart: `https://image.sinajs.cn/newchart/min/n/${stockCode}.gif`,
            dailyKChart: `https://image.sinajs.cn/newchart/daily/n/${stockCode}.gif`,
            weeklyKChart: `https://image.sinajs.cn/newchart/weekly/n/${stockCode}.gif`,
            monthlyKChart: `https://image.sinajs.cn/newchart/monthly/n/${stockCode}.gif`,
            buy1: `${stockData[11]} (${stockData[10]})`,
            buy2: `${stockData[13]} (${stockData[12]})`,
            buy3: `${stockData[15]} (${stockData[14]})`,
            buy4: `${stockData[17]} (${stockData[16]})`,
            buy5: `${stockData[19]} (${stockData[18]})`,
            sell1: `${stockData[21]} (${stockData[20]})`,
            sell2: `${stockData[23]} (${stockData[22]})`,
            sell3: `${stockData[25]} (${stockData[24]})`,
            sell4: `${stockData[27]} (${stockData[26]})`,
            sell5: `${stockData[29]} (${stockData[28]})`
          }
        });
      },
      fail(err) {
        console.error("Failed to fetch stock data", err);
      }
    });
  }
});
