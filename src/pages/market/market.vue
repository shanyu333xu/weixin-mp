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
      <view :class="['index-box', szIndex.change >= 0 ? 'up' : 'down']">
        <text class="index-name">上证综指</text>
        <text class="index-price">{{ szIndex.price }}</text>
        <text class="index-change">{{ szIndex.change }} ({{ szIndex.changePercent }}%)</text>
      </view>
      <view :class="['index-box', szcIndex.change >= 0 ? 'up' : 'down']">
        <text class="index-name">深证成指</text>
        <text class="index-price">{{ szcIndex.price }}</text>
        <text class="index-change">{{ szcIndex.change }} ({{ szcIndex.changePercent }}%)</text>
      </view>
      <view :class="['index-box', cybIndex.change >= 0 ? 'up' : 'down']">
        <text class="index-name">创业板指</text>
        <text class="index-price">{{ cybIndex.price }}</text>
        <text class="index-change">{{ cybIndex.change }} ({{ cybIndex.changePercent }}%)</text>
      </view>
    </view>
  </view>
  <ThsStockList :stocks="stocks" :maxRows="10" />
</template>

<script lang="ts" setup>
import ThsStockList from '@/components/ThsStockList.vue'
const stocks = [
  {
    name: '股票B',
    code: '000001',
    price: '10.00',
    change: '-0.5%',
    speed: '-0.1%',
  },
  {
    name: '股票B',
    code: '000001',
    price: '10.00',
    change: '-0.5%',
    speed: '-0.1%',
  },
  {
    name: '股票A',
    code: '000001',
    price: '10.00',
    change: '+0.5%',
    speed: '+0.1%',
  },
  {
    name: '股票A',
    code: '000001',
    price: '10.00',
    change: '+0.5%',
    speed: '+0.1%',
  },
  {
    name: '股票B',
    code: '000001',
    price: '10.00',
    change: '-0.5%',
    speed: '-0.1%',
  },
  {
    name: '股票A',
    code: '000001',
    price: '10.00',
    change: '+0.5%',
    speed: '+0.1%',
  },
  {
    name: '股票B',
    code: '000001',
    price: '10.00',
    change: '-0.5%',
    speed: '-0.1%',
  },
  {
    name: '股票B',
    code: '000001',
    price: '10.00',
    change: '-0.5%',
    speed: '-0.1%',
  },
  {
    name: '股票A',
    code: '000001',
    price: '10.00',
    change: '+0.5%',
    speed: '+0.1%',
  },
  {
    name: '股票A',
    code: '000001',
    price: '10.00',
    change: '+0.5%',
    speed: '+0.1%',
  },
  {
    name: '股票B',
    code: '000001',
    price: '10.00',
    change: '-0.5%',
    speed: '-0.1%',
  },
  {
    name: '股票A',
    code: '000001',
    price: '10.00',
    change: '+0.5%',
    speed: '+0.1%',
  },
]
const marketStatus = ref('')
const marketStatusIcon = ref('')
const marketTime = ref('')
const szIndex = ref({})
const szcIndex = ref({})
const cybIndex = ref({})

const fetchData = async () => {
  try {
    const res = await uni.request({
      url: 'https://hq.sinajs.cn/list=sh000001,sz399001,sz399006',
      method: 'GET',
    })
    const data = res.data
    szIndex.value = parseIndexData(data.split(';')[0])
    szcIndex.value = parseIndexData(data.split(';')[1])
    cybIndex.value = parseIndexData(data.split(';')[2])
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const parseIndexData = (dataStr) => {
  const data = dataStr.split(',')
  const price = parseFloat(data[3])
  const prevClose = parseFloat(data[2])
  const change = (price - prevClose).toFixed(2)
  const changePercent = ((change / prevClose) * 100).toFixed(2)
  return { price: price.toFixed(2), change, changePercent }
}

const updateMarketStatus = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const isOpen = (hours > 9 || (hours === 9 && minutes >= 30)) && hours < 15
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
    nextOpen.setDate(now.getDate() + (now.getDay() === 5 ? 3 : 1))
    nextOpen.setHours(9, 30, 0, 0)
    marketTime.value = `下次开盘: ${nextOpen.toLocaleString()} ${days[nextOpen.getDay()]}`
  }
}

onMounted(() => {
  fetchData()
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
