<template>
  <!-- 股票列表 -->
  <view class="stock-list">
    <!-- 表头 -->
    <view class="stock-header">表头</view>
    <!-- 内容 -->
    <view class="stock-item" v-for="(item, index) in stocks" :key="index">
      <navigator
        :url="`/pages/stock-detail/stock-detail?code=${item.code}`"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <text>{{ item.name }}</text>
        <text>{{ item.code }}</text>
        <text>{{ item.price }}</text>
        <text>{{ item.change }}</text>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 定义props接收
const props = defineProps<{
  stocks
}>()
</script>

<style lang="scss" scoped>
//
</style>
