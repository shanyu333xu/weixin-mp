<!-- src\pages\favorites\favorites.vue -->
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
  <ThsStockList ref="stockListRef" :stockCodes="stockCodes" />
</template>

<script lang="ts" setup>
import { useStockList } from '@/composables/exStockList'

// 测试数据
const stockCodes = ref<string[]>([
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
])
// 列表触底增量
const { stockListRef, onScrolltolower } = useStockList()
onReachBottom(async () => {
  await stockListRef.value.getStockData()
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
