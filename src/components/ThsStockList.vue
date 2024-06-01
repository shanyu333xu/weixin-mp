<template>
  <!-- 股票列表 -->
  <view class="stock_table">
    <!-- 表头 -->
    <view class="stock_head" role="row">
      <view class="stock_cell" role="columnheader">股票名称</view>
      <view class="stock_cell right" role="columnheader">最新价</view>
      <view class="stock_cell right" role="columnheader">涨跌幅</view>
      <view class="stock_cell right" role="columnheader">涨速</view>
    </view>
    <!-- 内容 -->
    <navigator
      class="stock_item"
      v-for="(item, index) in limitedStocks"
      :key="index"
      :url="`/pages/stock-detail/stock-detail?code=${item.code}`"
      open-type="navigate"
      hover-class="navigator-hover"
      :class="{
        positive: item.change > 0,
        negative: item.change < 0,
      }"
      role="row"
    >
      <view class="stock_cell" role="cell">
        <view class="stock_name">{{ item.name }}</view>
        <view class="stock_code">{{ item.code }}</view>
      </view>
      <view class="stock_cell right" role="cell">
        <text class="stock_number">{{ item.currentPrice }}</text>
      </view>
      <view class="stock_cell right" role="cell">
        <text class="stock_number">{{ item.changePercent }}%</text>
      </view>
      <view class="stock_cell right" role="cell">
        <text class="stock_number">{{ item.speedPercent }}%</text>
      </view>
    </navigator>
  </view>
</template>

<script lang="ts" setup>
import { StockData } from '@/types/stockService'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  stocks: StockData[]
  maxRows?: number
}>()

// 计算属性，限制显示的行数
const limitedStocks = computed(() => {
  if (props.maxRows !== undefined) {
    return props.stocks.slice(0, props.maxRows)
  }
  return props.stocks
})
</script>
<style lang="scss" scoped>
.stock_table {
  width: 100%;
  margin: 20px 0;
}

.stock_head {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: bold;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.stock_item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  text-decoration: none;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.stock_item:nth-child(even) {
  background-color: #f9f9f9;
}

.stock_item:hover {
  background-color: #e0e0e0;
}

.navigator-hover {
  background-color: #d0d0d0;
}

.stock_cell {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}

.stock_name {
  font-weight: bold;
  text-align: left;
}

.stock_code {
  color: #999;
  text-align: left;
}

.right {
  text-align: right;
}

.positive .stock_number {
  color: red;
}

.negative .stock_number {
  color: green;
}
</style>
