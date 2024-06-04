<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '同花顺模拟炒股',
  },
}
</route>

<template>
  <!-- 搜索输入框 -->
  <view class="search-container">
    <input
      class="search-input"
      type="text"
      placeholder="请输入股票名称/股票代码"
      confirm-type="search"
      @confirm="onSearchConfirm"
    />
  </view>
  <!-- 搜索历史 -->
  <view></view>
  <!-- 搜索结果 -->
  <ThsStockList v-if="stocks" :stocks="stocks" />
  <!-- 大家都在搜 -->
  <view v-else>
    <view></view>
  </view>
</template>

<script lang="ts" setup>
import { fetchStockData } from '@/service/stockService'
import { StockData } from '@/types/stockService'

const searchText = ref<string>('')
const stocks = ref<StockData[] | null>(null)
const onSearchConfirm: UniHelper.InputOnConfirm = (event) => {
  searchText.value = event.detail.value
  console.log(`搜索内容： ${searchText.value}`)
  const stockCodes = search(searchText)
  getStocks(stockCodes)
}
const search = (searchText) => {
  // 测试数据
  const stockCodes = ['sh601006', 'sh601001']
  console.log(stockCodes)
  return stockCodes
}
const getStocks = async (stockCodes: string[]) => {
  const stockData = await fetchStockData(stockCodes)
  stocks.value = Object.values(stockData)
}
onShow(async () => {})
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 20px;
}

.search-input {
  width: 100%;
  padding: 0px 80px 0px 80px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
}
</style>
