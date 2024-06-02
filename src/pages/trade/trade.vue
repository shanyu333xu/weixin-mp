<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '交易',
  },
}
</route>

<template>
  <view class="user-info">
    <view class="avatar">A股</view>
    <text class="nickname">{{ user.nickname }}</text>
    <button class="switch-button" @click="switchUser">切换用户</button>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const user = reactive({
  nickname: 'A股模拟练习',
})

function switchUser() {
  // 跳转到登录页面，请注意此处只是假设路径，需要根据云函数情况修改！
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 10px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: red;
  border-radius: 50%;
}

.nickname {
  flex: 1;
  font-size: 16px;
}

.switch-button {
  padding: 5px 10px;
  color: #fff;
  cursor: pointer;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
}
</style>
