<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '行情',
  },
}
</route>

<template>
  <view class="container">
    <view class="market-status">
      <image :src="marketStatusIcon" class="status-icon"></image>
      <text class="status-text">{{ marketStatus }}</text>
    </view>
    <view class="market-time">
      <text class="time-text">{{ marketTime }}</text>
    </view>
    <view class="indices">
      <view v-if="szIndex" :class="['index-box', parseFloat(szIndex.change) >= 0 ? 'up' : 'down']">
        <text class="index-name">上证综指</text>
        <text class="index-price">{{ szIndex.currentPrice }}</text>
        <text class="index-change">{{ szIndex.change }} ({{ szIndex.changePercent }}%)</text>
      </view>
      <view
        v-if="szcIndex"
        :class="['index-box', parseFloat(szcIndex.change) >= 0 ? 'up' : 'down']"
      >
        <text class="index-name">深证成指</text>
        <text class="index-price">{{ szcIndex.currentPrice }}</text>
        <text class="index-change">{{ szcIndex.change }} ({{ szcIndex.changePercent }}%)</text>
      </view>
      <view
        v-if="cybIndex"
        :class="['index-box', parseFloat(cybIndex.change) >= 0 ? 'up' : 'down']"
      >
        <text class="index-name">创业板指</text>
        <text class="index-price">{{ cybIndex.currentPrice }}</text>
        <text class="index-change">{{ cybIndex.change }} ({{ cybIndex.changePercent }}%)</text>
      </view>
    </view>
  </view>
  <ThsStockList :stocks="stocks" :maxRows="10" :quickSort="true" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchStockData } from '@/service/stockService'
import { StockData } from '@/types/stockService'

const szIndex = ref<StockData | null>(null)
const szcIndex = ref<StockData | null>(null)
const cybIndex = ref<StockData | null>(null)
const stocks = ref<StockData[] | null>([])

const getStocks = async () => {
  try {
    const stockCodes = [
      'sh601006',
      'sh601001',
      'sh601101',
      'sh600881',
      'sh688399',
      'sh688981',
      'sh600150',
      'sh600733',
      'sh601919',
      'sh601899',
      'sh601020',
    ]
    const stockData = await fetchStockData(stockCodes)
    stocks.value = stockData

    const [szData, szcData, cybData] = await Promise.all([
      fetchStockData(['sh000001']),
      fetchStockData(['sz399001']),
      fetchStockData(['sz399006']),
    ])

    szIndex.value = szData[0]
    szcIndex.value = szcData[0]
    cybIndex.value = cybData[0]
  } catch (error) {
    console.error('Failed to fetch stock data:', error)
  }
}

const marketStatus = ref('')
const marketStatusIcon = ref('')
const marketTime = ref('')

const updateMarketStatus = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const isOpen =
    ((hours > 9 || (hours === 9 && minutes >= 30)) &&
      (hours < 11 || (hours === 11 && minutes < 30))) ||
    (hours > 13 && hours < 15)
  const days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const dayOfWeek = days[now.getDay()]

  if (isOpen) {
    marketStatus.value = '开盘'
    marketStatusIcon.value = '/static/images/open.png'
    marketTime.value = now.toLocaleTimeString() + ` ${dayOfWeek}`
  } else {
    marketStatus.value = '闭盘'
    marketStatusIcon.value = '/static/images/close.png'
    const nextOpen = new Date(now)
    const isFridayAfternoon = now.getDay() === 5 && (hours > 15 || (hours === 15 && minutes >= 0))
    nextOpen.setDate(now.getDate() + (isFridayAfternoon ? 3 : 1))
    nextOpen.setHours(9, 30, 0, 0)
    marketTime.value = `下次开盘: ${nextOpen.toLocaleString()} ${days[nextOpen.getDay()]}`
  }
}

onMounted(async () => {
  await getStocks()
  updateMarketStatus()
  setInterval(() => {
    updateMarketStatus()
  }, 60000) // 每分钟更新一次状态
})
</script>

<style>
.container {
  padding: 10px;
}

.market-status {
  display: flex;
  align-items: center;
}

.status-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.status-text {
  font-size: 18px;
}

.market-time {
  margin-top: 5px;
  font-size: 14px;
}

.indices {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  width: calc(100% - 20px);
  margin-top: 10px;
}

.index-box {
  box-sizing: border-box;
  flex: 1;
  padding: 10px;
  color: white;
  text-align: center;
  border-radius: 5px;
}

.index-box:last-child {
  margin-right: 0;
}

.index-box.up {
  background-color: red;
}

.index-box.down {
  background-color: green;
}

.index-name,
.index-price,
.index-change {
  display: block;
  width: 100%;
}

.index-name {
  margin-bottom: 5px;
  font-size: 12px;
}

.index-price {
  margin: 5px 0;
  font-size: 22px;
  font-weight: bold;
}

.index-change {
  font-size: 12px;
}
</style>
