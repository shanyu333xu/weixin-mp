<template>
  <view class="rise-fall-section">
    <view class="progress-bar">
      <view class="progress-bar-segment green" :style="{ flex: riseCount }"></view>
      <view class="progress-bar-segment gray" :style="{ flex: neutralCount }"></view>
      <view class="progress-bar-segment red" :style="{ flex: fallCount }"></view>
    </view>
    <view class="rise-fall-text">
      <text class="fall-text">跌 {{ fallCount }} 家</text>
      <text class="rise-text">涨 {{ riseCount }} 家</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const riseCount = ref(0);
const fallCount = ref(0);
const neutralCount = ref(0);

const fetchData = () => {
  uni.request({
    url: 'https://eq.10jqka.com.cn/wechatApplication/search/searchIndex',
    method: 'POST',
    success: (response) => {
      console.log('API Response:', response); // Log the entire response to check its structure

      if (response.statusCode === 200 && response.data && response.data.result) {
        const result = response.data.result;
        riseCount.value = result.szzs;
        fallCount.value = result.xdzs;
        neutralCount.value = 5508 - result.szzs - result.xdzs;
      } else {
        console.error('Unexpected response structure:', response);
      }
    },
    fail: (error) => {
      console.error('Fetch data failed:', error);
    }
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.progress-bar {
  display: flex;
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar-segment {
  height: 100%;
}

.progress-bar-segment.green {
  background-color: #00BB00;
}

.progress-bar-segment.gray {
  background-color: rgb(216, 216, 216);
}

.progress-bar-segment.red {
  background-color: #FF0000;
}

.rise-fall-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.fall-text,
.rise-text {
  font-size: 14px;
}
</style>
