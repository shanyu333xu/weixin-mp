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
  <ThsStockList :stocks="stocks" />
</template>

<script lang="ts" setup>
import ThsStockList from '@/components/ThsStockList.vue'
// 测试数据
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
</script>

<style lang="scss" scoped>
//
</style>
