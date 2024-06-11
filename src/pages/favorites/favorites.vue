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
 <ThsStockList :stockCodes="stockCodes" />
  <button class="button" v-if="!hasLogin" @click="goToLogin">授权同步自选股</button>
 <button class="button"  v-if="hasLogin" @click="goSearch">添加自选股</button>
</template>

<script>
const db=uniCloud.database();
import {store} from '../../../uni_modules/uni-id-pages/common/store.js'
import pageJson from "@/pages.json"
import { fetchStockData } from '../../service/stockService';
export default {
  data() {
    return {  
      stockCodes:[],
      isFavorite: false,
    hasLogin: false,
    };
  },
onShow() {
  this.checkLoginStatus();
  this.getStocks();
},

methods: {
     checkLoginStatus() {
           // 假设 store.hasLogin 是一个布尔值，表示用户的登录状态
           this.hasLogin = store.hasLogin;
           // 如果用户退出登录，则清空 stockCodes 数组
           if (!this.hasLogin) {
             this.stockCodes = [];
           }
         },
async getStocks() {
  if(store.hasLogin){
      const res = await db.collection("stockDB")
        .where(`userid==$cloudEnv_uid`)
        .get();
      // 将具体的 stockid 数组赋值给 this.stockCodes
      if (res.result.data) {
        this.stockCodes = res.result.data.map(item => item.stockid);
      } else {
        console.log("无自选记录");
      }
    } else{
          console.log("未登录")
      }
 },
  goToLogin() {
       // 跳转到登录页面
       uni.navigateTo({
         url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode'
       });
     },
     goSearch(){
         uni.navigateTo({
           url: '/src/pages/search/search'
         });
     }
},
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
.button{
     width: 140px;
     height: 40px;
     font-size: small;
     font-weight: bolder;
     padding:5px 5px;
      color: #000;
      border: none;
      border-radius: 15px;
      cursor: pointer;

}
</style>
