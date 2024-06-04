<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '同花顺模拟炒股',
  },
}
</route>

<template>
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
</template>

<script lang="ts" setup>
const searchText = ref('')
const onSearchConfirm: UniHelper.InputOnConfirm = (event) => {
  searchText.value = event.detail.value
  console.log(`搜索内容： ${searchText.value}`)
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 20px;
}

.search-input {
  width: 100%;
  padding: 0px 80px 0px 80px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
}
</style>
