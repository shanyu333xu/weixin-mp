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
    import { ref } from 'vue';

const title = ref('');
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
  padding: 10px;
  background-color: #fff;
}
.nav-bar-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.nav-bar-title {
  font-size: 13px;
  color: #333;
  text-align: center;
}
</style>
