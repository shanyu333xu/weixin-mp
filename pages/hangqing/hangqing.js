// 获取util.js中定义的函数
const util = require('../../utils/util.js');
Page({
  navigateToLogin: function() {
    wx.navigateTo({
      url: '../loginByPhone/loginByPhone'
    });
  },
  toStockInfo:function(){
    wx.navigateTo({
      url: '../stockInfo/stockInfo'
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    stockDate: '',  // 初始化空字符串用于存储格式化后的日期
    modules: [ /*今日板块股票数据 */
      {
        title: "热门概念",
        stocks: [
          { name: "东方财富", percent: "+20.45%" },
          { name: "京东方A", percent: "+18.75%" },
          { name: "中兴通讯", percent: "+16.88%" },
          { name: "格力电器", percent: "+15.22%" },
          { name: "中国平安", percent: "+13.68%" },
          { name: "比亚迪", percent: "+11.85%" }
        ]
      },
      {
        title: "热门行业",
        stocks: [
          { name: "隆基股份", percent: "+22.10%" },
          { name: "五粮液", percent: "+19.55%" },
          { name: "恒瑞医药", percent: "+18.03%" },
          { name: "海康威视", percent: "+16.47%" },
          { name: "泸州老窖", percent: "+14.32%" },
          { name: "阳光电源", percent: "+12.98%" }
        ]
      },
      {
        title: "5日持续热度板块",
        stocks: [
          { name: "宁德时代", percent: "+23.69%" },
          { name: "天齐锂业", percent: "+21.34%" },
          { name: "金风科技", percent: "+19.58%" },
          { name: "荣盛石化", percent: "+17.85%" },
          { name: "亿纬锂能", percent: "+15.98%" },
          { name: "三一重工", percent: "+14.06%" }
        ]
      }
    ],
    allStocks: [  /*股票排行数据*/ 
      { name: '宁德时代', code: '688523', price: '44.92', change: '+20.01%', speed: '+0.50%', volume: '15.2亿' },
      { name: '药石科技', code: '300725', price: '8.72', change: '+19.95%', speed: '+0.40%', volume: '9.8亿' },
      { name: '新能源', code: '600312', price: '10.24', change: '+5.24%', speed: '+0.33%', volume: '2.8亿' },
      { name: '旗滨集团', code: '601636', price: '6.27', change: '-2.15%', speed: '-0.05%', volume: '3.1亿' },
      { name: '比亚迪', code: '002594', price: '210.00', change: '+1.25%', speed: '+0.25%', volume: '13.6亿' },
      { name: '京东方A', code: '000725', price: '3.55', change: '-1.67%', speed: '-0.22%', volume: '11.3亿' },
      { name: '隆基股份', code: '601012', price: '41.82', change: '+3.33%', speed: '+0.47%', volume: '12.7亿' },
      { name: '中兴通讯', code: '000063', price: '34.12', change: '+1.98%', speed: '+0.32%', volume: '7.5亿' },
      { name: '三一重工', code: '600031', price: '21.60', change: '+0.50%', speed: '+0.12%', volume: '5.2亿' },
      { name: '海康威视', code: '002415', price: '42.38', change: '-0.90%', speed: '-0.20%', volume: '4.8亿' },
      { name: '华泰证券', code: '601688', price: '16.78', change: '+2.56%', speed: '+0.41%', volume: '3.9亿' },
      { name: '美的集团', code: '000333', price: '72.50', change: '+1.77%', speed: '+0.29%', volume: '6.6亿' },
      { name: '中国平安', code: '601318', price: '79.55', change: '+1.05%', speed: '+0.21%', volume: '8.4亿' },
      { name: '格力电器', code: '000651', price: '59.27', change: '-1.45%', speed: '-0.35%', volume: '7.8亿' },
      { name: '招商银行', code: '600036', price: '39.22', change: '+0.98%', speed: '+0.19%', volume: '5.1亿' },
      { name: '宝钢股份', code: '600019', price: '7.42', change: '+2.47%', speed: '+0.41%', volume: '4.5亿' },
      { name: '中国石油', code: '601857', price: '5.23', change: '+0.77%', speed: '+0.14%', volume: '8.9亿' },
      { name: '兴业银行', code: '601166', price: '18.55', change: '-1.02%', speed: '-0.26%', volume: '2.6亿' },
      { name: '中国中车', code: '601766', price: '8.90', change: '+0.34%', speed: '+0.07%', volume: '4.2亿' },
      { name: '贵州茅台', code: '600519', price: '1800.00', change: '+1.25%', speed: '+0.23%', volume: '15.4亿' }
    ],
    
    displayStocks: [], // 显示在界面上的股票数据
    activeTab: 'rise' // 当前活跃的标签页，默认为涨幅榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 
    this.setDate();
    this.sortAndSetStocks('rise'); // 默认加载涨幅榜
  },
  setDate: function() {
    const now = new Date();
    const formattedDate = util.formatDate(now);  // 使用util.js中的函数格式化日期
    this.setData({
      stockDate: formattedDate
    });
  },

  sortAndSetStocks(type) {
    let sortedStocks = this.data.allStocks.slice();
    switch(type) {
      case 'rise':
        sortedStocks.sort((a, b) => parseFloat(b.change.replace('%', '')) - parseFloat(a.change.replace('%', '')));
        break;
      case 'fall':
        sortedStocks.sort((a, b) => parseFloat(a.change.replace('%', '')) - parseFloat(b.change.replace('%', '')));
        break;
      case 'speed':
        sortedStocks.sort((a, b) => parseFloat(b.speed.replace('%', '')) - parseFloat(a.speed.replace('%', '')));
        break;
      case 'volume':
        sortedStocks.sort((a, b) => parseFloat(b.volume.replace('亿', '')) - parseFloat(a.volume.replace('亿', '')));
        break;
    }
    this.setData({
      displayStocks: sortedStocks,
      activeTab: type
    });
  },

  handleTabChange(e) {
    const tabType = e.currentTarget.dataset.type;
    this.sortAndSetStocks(tabType);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

})