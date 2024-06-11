<template>
  <view class="navigation-bar">
    <view class="back-button">
      <image class="icon" @click="goBack" src="/static/images/back-arrow.png" />
    </view>
    <text class="nav-bar-title">{{ title }} {{ code }}</text>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    goBackHandler: {
      type: Function,
      required: false
    }
  },
  methods: {
    goBack() {
      if (this.goBackHandler) {
        this.goBackHandler();
      } else {
        uni.navigateBack({
          delta: 1
        });
      }
    }
  }
};
</script>

<style scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 10px;
  background-color: #fff;
  position: relative;
}

.back-button {
  display: flex;
  align-items: center;
  position: absolute;
  left: 10px;
}

.icon {
  width: 30px;
  height: 30px;
}

.nav-bar-title {
  font-size: 15px;
  color: #333;
  text-align: center;
  flex-grow: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
