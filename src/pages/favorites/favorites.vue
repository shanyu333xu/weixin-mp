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
  <view>
    <navigator url="/pages/search/search" open-type="navigate" hover-class="navigator-hover">
      <image src="" mode="scaleToFill" />
      <text>搜股票名称/股票代码</text>
    </navigator>
  </view>
  <!-- 消息栏 -->
  <view>消息栏</view>
  <!-- 自选列表 -->
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
// 测试数据
const stocks = [
  {
    name: '股票A',
    code: '000001',
    price: '10.00',
    change: '+0.5%',
  },
  {
    name: '股票B',
    code: '000002',
    price: '20.50',
    change: '-1.2%',
  },
  {
    name: '股票C',
    code: '000003',
    price: '15.75',
    change: '+2.0%',
  },
  {
    name: '股票D',
    code: '000004',
    price: '10.00',
    change: '+0.5%',
  },
  {
    name: '股票F',
    code: '000005',
    price: '21.50',
    change: '-1.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
  {
    name: '股票G',
    code: '000006',
    price: '15.75',
    change: '+2.8%',
  },
]
</script>

<style lang="scss" scoped>
//
</style>
