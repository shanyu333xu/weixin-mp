

<template>
  <!-- 搜索框,其实是跳转到搜索页面 -->
  <view>
    <navigator url="/pages/search/search" open-type="navigate" hover-class="navigator-hover">
      <image src="" mode="scaleToFill" />
      <text>搜股票名称/股票代码</text>
    </navigator>
  </view>
  <!-- 消息栏 -->
  <view>消息栏</view>
  <!-- 自选列表 -->
  <ThsStockList :stocks="stocks" />
</template>

<script lang="ts" setup>
import ThsStockList from '../../components/ThsStockList.vue'
import { StockData } from '../../types/stockService'
import { fetchStockData } from '../../service/stockService'
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
//
</style>
