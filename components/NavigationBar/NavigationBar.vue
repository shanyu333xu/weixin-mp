<template>
  <view class="navigation-bar">
    <image
      src="@/static/images/login.png"
      class="nav-bar-logo"
      @click="navigateToLogin"
    />
    <text class="nav-bar-title">{{ title }}</text>
    <view class="nav-bar-placeholder"></view>
  </view>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';
   const props = defineProps<{
      title: string
    }>();
const navigateToLogin = () => {
  uni.navigateTo({
    url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
  });
};
</script>

<style scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  padding: 24px;
  background-color: #fff;
}
.nav-bar-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.nav-bar-title {
  font-size: 15px;
  color: #333;
  text-align: center;
}
</style>
