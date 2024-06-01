<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '股票名称',
  },
}
</route>

<template>
  <view class="box">
    <view class="top">
      <view class="top-left">
        <view class="top-left-up">
          <text :class="Number(stock.speedPercent) < 0 ? 'nev' : 'pos'">
            {{ stock.currentPrice }}
          </text>
        </view>
        <view class="top-left-down">
          <text :class="Number(stock.speedPercent) < 0 ? 'nev' : 'pos'">
            <text v-if="Number(stock.changePercent) >= 0">+</text>
            {{ stock.changePercent }}
          </text>
          <text :class="Number(stock.speedPercent) < 0 ? 'nev' : 'pos'">
            <text v-if="Number(stock.speedPercent) >= 0">+</text>
            {{ stock.speedPercent }}%
          </text>
        </view>
      </view>

      <view class="top-right">
        <view class="top-right-up">
          <view class="up">
            <text class="wz">高</text>
            <text class="sj" style="color: red">{{ stock.highPrice }}</text>
          </view>
          <view class="up">
            <text class="wz">开</text>
            <text class="sj" style="color: #33b26d">{{ stock.openPrice }}</text>
          </view>
          <view class="up">
            <text class="wz">量</text>
            <!-- <text class="sj">{{ (stock.volume / 10000).toFixed(1) }}万</text> -->
          </view>
        </view>

        <view class="top-right-down">
          <view class="down">
            <text class="wz">低</text>
            <text class="sj" style="color: #33b26d">{{ stock.lowPrice }}</text>
          </view>
          <view class="down">
            <text class="wz">换</text>
            <text class="sj">{{ stock.change }}</text>
          </view>
          <view class="down">
            <text class="wz">额</text>
            <!-- <text class="sj">{{ (stock.amount / 100000000).toFixed(1) }}亿</text> -->
          </view>
        </view>
      </view>
    </view>

    <view class="tapbox">
      <view class="taptop">
        <view class="tabs">
          <view
            :class="currentTab === 'min' ? 'selected' : 'tab-item '"
            data-tab="min"
            @tap="switchTab"
          >
            分时
          </view>
          <view
            :class="currentTab === 'daily' ? 'selected' : 'tab-item '"
            data-tab="daily"
            @tap="switchTab"
          >
            日k
          </view>
          <view
            :class="currentTab === 'weekly' ? 'selected' : 'tab-item'"
            data-tab="weekly"
            @tap="switchTab"
          >
            周K
          </view>
          <view
            :class="currentTab === 'monthly' ? 'selected' : 'tab-item'"
            data-tab="monthly"
            @tap="switchTab"
          >
            月K
          </view>
        </view>
      </view>

      <view class="tapdown">
        <image class="chart" :src="currentChart"></image>
        <view class="tapdown-right">
          <view class="right-up">
            <view class="sell" v-for="(item, index) in [5, 4, 3, 2, 1]" :key="index">
              <view class="b-b label">卖{{ item }}</view>
              <view class="b-b value">
                {{
                  Number(stock['sell' + item + 'Price']) == 0
                    ? '--'
                    : stock['sell' + item + 'Price']
                }}
              </view>
              <view class="b-b value">{{ stock['sell' + item + 'Volume'] }}</view>
            </view>
          </view>

          <view class="right-down">
            <view class="buy">
              <view class="b-b label">买1</view>
              <view class="b-b value">{{ stock.buy1Volume }}</view>
              <view class="b-b value">{{ stock.buy1Price }}</view>
            </view>
            <view class="buy">
              <view class="b-b label">买2</view>
              <view class="b-b value">{{ stock.buy2Volume }}</view>
              <view class="b-b value">{{ stock.buy2Price }}</view>
            </view>
            <view class="buy">
              <view class="b-b label">买3</view>
              <view class="b-b value">{{ stock.buy3Volume }}</view>
              <view class="b-b value">{{ stock.buy3Price }}</view>
            </view>
            <view class="buy">
              <view class="b-b label">买4</view>
              <view class="b-b value">{{ stock.buy4Volume }}</view>
              <view class="b-b value">{{ stock.buy4Price }}</view>
            </view>
            <view class="buy">
              <view class="b-b label">买5</view>
              <view class="b-b value">{{ stock.buy5Volume }}</view>
              <view class="b-b value">{{ stock.buy5Price }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="tab-bar">
      <button class="tab-item trade" @tap="navigateToTrade">交易</button>
      <view class="tab-item" @tap="handleFavoriteTap">
        <image :src="zixuanImage" class="icon" />
        <text class="tab-text">自选</text>
      </view>
      <button class="share-button tab-item" open-type="share">
        <image src="/static/pages/images/fenxiang.png" class="icon"></image>
        <text class="tab-text">分享</text>
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { fetchStockData } from '@/service/stockService'
import { StockData } from '@/types/stockService'

const props = defineProps<{ code: string }>()
const stock = ref<StockData>({
  name: '',
  code: '',
  openPrice: '',
  closePrice: '',
  currentPrice: '',
  highPrice: '',
  lowPrice: '',
  buyPrice: '',
  sellPrice: '',
  volume: '',
  amount: '',
  buy1Volume: '',
  buy1Price: '',
  buy2Volume: '',
  buy2Price: '',
  buy3Volume: '',
  buy3Price: '',
  buy4Volume: '',
  buy4Price: '',
  buy5Volume: '',
  buy5Price: '',
  sell1Volume: '',
  sell1Price: '',
  sell2Volume: '',
  sell2Price: '',
  sell3Volume: '',
  sell3Price: '',
  sell4Volume: '',
  sell4Price: '',
  sell5Volume: '',
  sell5Price: '',
  date: '',
  time: '',
  change: '',
  changePercent: '',
  speedPercent: '',
})
const currentTab = ref<string>('min')
const zixuanImage = ref<string>('/static/pages/images/zixuanshanchu.png')
const isFavorite = ref<boolean>(true)
const currentChart = ref<string>(`http://image.sinajs.cn/newchart/min/n/sh${props.code}.gif`)

onShow(async () => {
  const stockData = await fetchStockData([props.code])
  stock.value = stockData[0]
  currentChart.value = `http://image.sinajs.cn/newchart/min/n/sh${props.code}.gif`
})

function handleFavoriteTap() {
  if (isFavorite.value) {
    uni.showModal({
      title: '取消自选',
      content: '确定取消自选？',
      success: (res) => {
        if (res.confirm) {
          isFavorite.value = false
          zixuanImage.value = '/static/pages/images/zixuan.png'
          uni.showToast({
            title: '已取消自选',
            icon: 'success',
            duration: 2000,
          })
        }
      },
    })
  } else {
    isFavorite.value = true
    zixuanImage.value = '/static/pages/images/zixuanshanchu.png'
    uni.showToast({
      title: '已添加到自选',
      icon: 'success',
      duration: 2000,
    })
  }
}

function switchTab(e) {
  const tab = e.currentTarget.dataset.tab
  const chartUrls = {
    daily: `http://image.sinajs.cn/newchart/daily/n/sh${props.code}.gif`,
    min: `http://image.sinajs.cn/newchart/min/n/sh${props.code}.gif`,
    weekly: `http://image.sinajs.cn/newchart/weekly/n/sh${props.code}.gif`,
    monthly: `http://image.sinajs.cn/newchart/monthly/n/sh${props.code}.gif`,
  }
  currentTab.value = tab
  currentChart.value = chartUrls[tab]
}

function navigateToTrade() {
  uni.navigateTo({
    url: `/pages/trade/trade?code=${props.code}`,
  })
}
</script>

<style>
.box {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.top {
  display: flex;
  flex-direction: row;
  height: 60px;

  margin-bottom: 10px;
}

.top-left {
  display: flex;
  flex-direction: column;
  width: 100px;
}

.top-left-up {
  padding-left: 5px;
  font-size: x-large;
  font-weight: bolder;
  text-align: left;
}

.top-left-down {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
  margin-right: 8px;
  margin-left: 5px;
  font-size: xx-small;
  text-align: center;
}

.top-right {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}

.top-right-up,
.top-right-down {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.wz {
  margin-right: 6px;
  font-size: small;
  color: gray;
}

.sj {
  margin-right: 12px;
  font-size: xx-small;
}

.tapbox {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  text-align: center;
}

.tapdown {
  display: flex;
  flex-direction: row;
}

.chart {
  width: 210px;
  height: 220px;
}

.tapdown-right {
  display: flex;
  flex-direction: column;
}

.right-up {
  border-bottom: 2px solid gray;
}
.label {
  font-size: 13px;
  text-align: left;
}
.sell,
.buy {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: small;
}
.value {
  flex: 1;
  width: 50px;
  text-align: right;
}
.b-b {
  margin-bottom: 5px;
  margin-left: 10px;
  font-size: 12px;
}

.nev {
  color: green;
}

.pos {
  color: red;
}

.selected {
  font-size: medium;
  font-weight: bolder;
  border-bottom: 8rpx solid rgb(218, 149, 103);
}

.tab-item {
  font-size: small;
  font-weight: bolder;
}
.image {
  width: 25px;
  height: 25px;
  padding: 5px;
}
.share-button {
  padding: 0; /* 去除按钮内边距 */
  background-color: transparent; /* 透明背景 */
  border: none; /* 去除按钮边框 */
}
.icon {
  width: 25px; /* 图片宽度 */
  height: 25px; /* 图片高度 */
}
.tab-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 50px; /* 增加高度以容纳图标和文字 */
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
}
.trade {
  padding: 10px 20px;
  color: #fff;
  background-color: #d84a36;
  border: none;
  border-radius: 15px;
}
/* 导航栏中的每一项 */
.tab-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
/* 文字标签样式 */
.tab-text {
  margin-top: 2px;
  font-size: 12px;
}
</style>
