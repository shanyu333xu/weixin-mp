<template>
  <view class="navigation-bar"></view>
      <view class="searchbox">
        <navigator
          class="searchnavigator"
          url="/src/pages/search/search"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          <icon type="search" />
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
.navigation-bar {
  display: flex;
  align-items: center;
  padding: 29px;
  background-color: #fff;
}
</style>
