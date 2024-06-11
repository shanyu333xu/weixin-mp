<template>
  <BackButton></BackButton>
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
  <ThsStockList v-if="serched" ref="stockListRef" :stockCodes="stockCodes" />

  <view v-if="!serched">
    <p class="dajia">大家都在搜</p>
    <navigator
      class="stock_item"
      v-for="(item, index) in stockData1"
      :key="index"
      :url="`/src/pages/stock-detail/stock-detail?code=${item.code}`"
      open-type="navigate"
      hover-class="navigator-hover"
      role="row"
    >
    <!-- -->
      <view class="stock_cell" role="cell">
            
        <view class="stock_info">
            <img :src="`/static/images/数字${index + 1}.png`" class="stock_image" />
          <view class="stock_name">{{ item.name }}</view>
          <text
            class="stock_number"
            :class="{
              positive: item.currentPrice > 0,
              negative: item.currentPrice < 0
            }"
          >
            {{ formattedPrice(item.currentPrice) }}%
          </text>
        </view>
      </view>
   <!--   <button class="favorite-button" @click.stop="handleFavoriteTap(item.code)">
        {{ isFavorite[item.code] ? "删自选" : "加自选" }}
      </button> -->
      <button 
          :class="{
            'favorite-button': true,
            'delete-button': isFavorite[item.code]
          }"
          @click.stop="handleFavoriteTap(item.code)"
        >
          {{ isFavorite[item.code] ? "删自选" : "加自选" }}
        </button>
      
    </navigator>
  </view>
</template>

<script lang="ts" setup>

import { ref, watch, nextTick,onMounted} from "vue";
import { fetchStockData } from "/src/service/stockService";
import ThsStockList from "/components/ThsStockList/ThsStockList";
import { BaseStockData } from "../../types/stockService";
import BaseStocksList from "/src/store/BaseStocksList.json";
import { useStockList } from "/src/composables/exStockList";
import { StockData } from "/src/types/stockService";
// import store from '/src/uni_modules/uni-id-pages/common/store.js'
import {store} from '@/uni_modules/uni-id-pages/common/store';
import pageJson from "@/pages.json"
const db=uniCloud.database();  
const stocks = ref<StockData[]>([]);
const searchText = ref<string>("");
const stockCodes = ref<string[]>([]);
const serched = ref(false);
const stockData1 = ref<StockData[]>([]);
const stockCodes1 = ref<string[] | null>([
	"sh600056",
	"sh688621",
	"sh600356",
	"sh600560",
]);

const isFavorite = ref<Record<string, boolean>>({});
let likeTime = ref<number>(0);
async function handleFavoriteTap(code: string) {
  if (!store.hasLogin) {
    uni.showModal({
      title: "登录后才可进行后续操作",
      success: (res) => {
        if (res.confirm) {
          uni.navigateTo({
            url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode"
          });
        }
      }
    });
    return;
  }

  let time = Date.now();
  if (time - likeTime.value < 2000) {
    uni.showToast({
      title: "操作太频繁，请稍后...",
      icon: "none"
    });
    return;
  }

  likeTime.value = time; // 更新 likeTime 的值

  try {
    let count = await db.collection("stockDB")
      .where(`stockid == "${code}" && userid == $cloudEnv_uid`).count();

    if (count.result.total) {
      await db.collection("stockDB")
        .where(`stockid == "${code}" && userid == $cloudEnv_uid`)
        .remove();

      isFavorite.value[code] = false;

      // 显示提示信息
      uni.showToast({
        title: "已删除",
        icon: "success"
      });
    } else {
      await db.collection("stockDB").add({
        stockid: code,
      });

      isFavorite.value[code] = true;

      uni.showToast({
        title: "已添加",
        icon: "success"
      });
    }
  } catch (error) {
    console.error("操作失败", error);
    uni.showToast({
      title: "操作失败",
      icon: "none"
    });
  }
}
const getStockData1 = async () => {
	const res = await fetchStockData(stockCodes1.value);
    stockData1.value = res;
    
        // 获取当前用户的收藏状态
        const favoritesRes = await db.collection("stockDB").where(`userid == $cloudEnv_uid`).get();
        const favoriteStocks = favoritesRes.result.data.map((item: { stockid: string }) => item.stockid);
    
        favoriteStocks.forEach((stockid: string) => {
          isFavorite.value[stockid] = true;
           });
};
// 页面挂载时调用getStockData1
onMounted(() => {
	getStockData1();
});
const onSearchConfirm: UniHelper.InputOnConfirm = (event) => {
	searchText.value = event.detail.value;
	console.log(`搜索内容： ${searchText.value}`);
	if (!searchText.value) {
		stockCodes.value = [];
		serched.value = false;
		return;
	}
	search(searchText.value);
	console.log(`搜索结果： ${stockCodes.value}`);
};

const search = (searchText) => {
	serched.value = true;
	// 将搜索文本转换为小写，以便进行不区分大小写的匹配
	const query = searchText.toLowerCase();
	// 过滤出与搜索文本匹配的股票数据
	stockCodes.value = BaseStocksList.filter(
		(stock: BaseStockData) =>
			stock.name.toLowerCase().includes(query) ||
			stock.code.toLowerCase().includes(query) ||
			stock.industry?.toLowerCase().includes(query)
	).map((stock: BaseStockData) => stock.code);
};
import type { ThsStockListInstance } from "../types/components";
const useStockList = () => {
	// 组件实例
	const stockListRef = ref<ThsStockListInstance | null>(null);

	// 滚动触底事件
	const onScrolltolower = () => {
		console.log("Scroll to lower");
		stockListRef.value?.getStockData();
	};

	return { stockListRef, onScrolltolower };
};
// 列表触底增量
import { onReachBottom } from "@dcloudio/uni-app";
const { stockListRef, onScrolltolower } = useStockList();
onReachBottom(async () => {
	await stockListRef.value.getStockData();
});
function formattedPrice(price: number): string {
  if (price > 0) {
    return `+${price}`;
  } else if (price < 0) {
    return `-${price}`;
  } else {
    return `${price}`;
  }
}


</script>

<style lang="scss" scoped>
.search-container {
	display: flex;
	justify-content: center;
	padding: 8px;
	margin: 10px;
	border: 1px solid #000000;
	border-radius: 20px;
}

.search-input {
	width: 100%;
	padding: 0px 10px 0px 10px;
	font-size: 16px;
	border: none;
	border-radius: 20px;
}
.dajia{
    margin-top:30px;
    padding-left:20px ;
    font: optional;
    font-size: 16px;
    font-weight: bolder;
    }
    
    .stock_item {
    	display: flex;
    	justify-content: space-between;
    	padding: 5px;
    	text-decoration: none;
    	background-color: #fff;
        margin-left:15px;
        font-size:15px;
    }
    .stock_cell {
    	display: flex;
    	flex: 1;
    	flex-direction: column;
    	justify-content: center;
    }
    .stock_info {
      display: flex;
      align-items: center;
    }
    .stock_name {
      text-align: left;
    }
    
    .stock_number {
      text-align: left;
      margin-left: 10px;
      font-weight:bolder;
    }
    .positive {
      color: red;
    }
    
    .negative {
      color: green;
    }
    .favorite-button {
      background-color: #fff;
      border: 1px solid #F17958;
      color: #F17958;
      font-size:14px;
      border-radius: 20px;
      padding: 0px 10px;
      cursor: pointer;
    }
    .delete-button {
      background-color: #ccc;
     border-color: #ccc; 
     color:#fff;
     
    }
 .stock_image {
   width: 15px; 
   height: 15px; 
   margin-right: 10px;
   object-fit: cover;
 }
</style>
