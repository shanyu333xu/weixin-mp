<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '同花顺自选股',
  },
}
</route>

<template>
  <!-- 搜索框,其实是跳转到搜索页面 -->
  <view class="searchbox">
    <navigator
      class="searchnavigator"
      url="/pages/search/search"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      <icon type="search" />
      <text>搜股票名称/股票代码</text>
    </navigator>
  </view>
  <!-- 自选列表 -->
  <ThsStockList :stocks="stocks" />
</template>

<script lang="ts" setup>
import { StockData } from '@/types/stockService'
import { fetchStockData } from '@/service/stockService'
// 测试数据
const stocks = ref<StockData[]>([])
const getStocks = async () => {
  const stockCodes = ['sh601006', 'sh601001']
  const stockData = await fetchStockData(stockCodes)
  stocks.value = Object.values(stockData)
  console.log(stockData)
}

onShow(() => {
  getStocks()
})
</script>

<style lang="scss" scoped>
.searchbox {
  display: flex;
  justify-content: center;
  padding: 5px;
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 20px;
}
.searchnavigator {
  padding: 0px 80px 0px 80px;
}
</style>
