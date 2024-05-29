import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/images/home.png',
        selectedIconPath: 'static/images/home.png',
        pagePath: 'pages/home/home',
        text: '首页',
      },
      {
        iconPath: 'static/images/market.png',
        selectedIconPath: 'static/images/market.png',
        pagePath: 'pages/market/market',
        text: '行情',
      },
      {
        iconPath: 'static/images/add.png',
        selectedIconPath: 'static/images/add.png',
        pagePath: 'pages/favorites/favorites',
        text: '自选',
      },
      {
        iconPath: 'static/images/trade.png',
        selectedIconPath: 'static/images/trade.png',
        pagePath: 'pages/trade/trade',
        text: '交易',
      },
    ],
  },
})
