<!-- src\pages\search\search.vue -->
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
  <ThsStockList v-if="serched" ref="stockListRef" :stockCodes="stockCodes" />
  <!-- 大家都在搜 -->
  <view v-else>
    <view></view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import ThsStockList from '@/components/ThsStockList.vue'
import { BaseStockData } from '@/types/stockService'
import BaseStocksList from '@/store/BaseStocksList.json'
import { useStockList } from '@/composables/exStockList'

const searchText = ref<string>('')
const stockCodes = ref<string[]>([])
const serched = ref(false)

const onSearchConfirm: UniHelper.InputOnConfirm = (event) => {
  searchText.value = event.detail.value
  console.log(`搜索内容： ${searchText.value}`)
  if (!searchText.value) {
    stockCodes.value = []
    serched.value = false
    return
  }
  search(searchText.value)
  console.log(`搜索结果： ${stockCodes.value}`)
}

const search = (searchText) => {
  serched.value = true
  // 将搜索文本转换为小写，以便进行不区分大小写的匹配
  const query = searchText.toLowerCase()
  // 过滤出与搜索文本匹配的股票数据
  stockCodes.value = BaseStocksList.filter(
    (stock: BaseStockData) =>
      stock.name.toLowerCase().includes(query) ||
      stock.code.toLowerCase().includes(query) ||
      stock.industry?.toLowerCase().includes(query),
  ).map((stock: BaseStockData) => stock.code)
}

// 列表触底增量
const { stockListRef, onScrolltolower } = useStockList()
onReachBottom(async () => {
  await stockListRef.value.getStockData()
})
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
