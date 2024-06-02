<template>
  <view class="navigation-bar"></view>
  <view>
    <text>搜索栏</text>
    <navigator url="/pages/search/search" open-type="navigate" hover-class="navigator-hover">
      <text>搜股票名称/股票代码</text>
    </navigator>
  </view>

  <ThsStockList :stocks="stocks" />
</template>

<script>
import { fetchStockData } from '../../service/stockService';

export default {
  data() {
    return {
      stocks: [],
    };
  },
  mounted() {
    this.getStocks();
  },
  methods: {
    async getStocks() {
      //把提取stockDB中的stockid pop到stockCodes数组中
      const stockCodes = ['sh601006'];
      const stockData = await fetchStockData(stockCodes);
      this.stocks = Object.values(stockData);
      console.log(stockData);
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  padding: 29px;
  background-color: #fff;
}
</style>
