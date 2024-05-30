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
</template>

<script>
export default {
  data() {
    return {
      marketStatus: '',
      marketStatusIcon: '',
      marketTime: '',
      szIndex: {},
      szcIndex: {},
      cybIndex: {},
    }
  },
  methods: {
    async fetchData() {
      try {
        const res = await uni.request({
          url: 'https://hq.sinajs.cn/list=sh000001,sz399001,sz399006',
          method: 'GET',
        })
        const data = res.data
        this.szIndex = this.parseIndexData(data.split(';')[0])
        this.szcIndex = this.parseIndexData(data.split(';')[1])
        this.cybIndex = this.parseIndexData(data.split(';')[2])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    parseIndexData(dataStr) {
      const data = dataStr.split(',')
      const price = parseFloat(data[3])
      const prevClose = parseFloat(data[2])
      const change = (price - prevClose).toFixed(2)
      const changePercent = ((change / prevClose) * 100).toFixed(2)
      return { price: price.toFixed(2), change, changePercent }
    },
    updateMarketStatus() {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const isOpen = (hours > 9 || (hours === 9 && minutes >= 30)) && hours < 15
      const days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const dayOfWeek = days[now.getDay()]

      if (isOpen) {
        this.marketStatus = '开盘'
        this.marketStatusIcon = '/static/images/open.png' // 使用静态图标
        this.marketTime = now.toLocaleTimeString() + ` ${dayOfWeek}`
      } else {
        this.marketStatus = '闭盘'
        this.marketStatusIcon = '/static/images/close.png' // 使用静态图标
        const nextOpen = new Date(now)
        nextOpen.setDate(now.getDate() + (now.getDay() === 5 ? 3 : 1)) // 如果是周五，加3天，否则加1天
        nextOpen.setHours(9, 30, 0, 0)
        this.marketTime = `下次开盘: ${nextOpen.toLocaleString()} ${days[nextOpen.getDay()]}`
      }
    },
  },
  mounted() {
    this.fetchData()
    this.updateMarketStatus()
    setInterval(() => {
      this.updateMarketStatus()
    }, 60000) // 每分钟更新一次状态
  },
}
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
