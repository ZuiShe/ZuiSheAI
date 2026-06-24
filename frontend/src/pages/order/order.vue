<template>
  <view class="page">
    <view class="header card">
      <text class="title">订货中心</text>
      <text class="subtitle">批发价 · 全国配送</text>
    </view>

    <view class="empty-state card">
      <text class="empty-icon">📋</text>
      <text class="empty-text">订货功能开发中</text>
      <text class="empty-hint">后期会接入后端订单 API</text>
    </view>
  </view>
</template>

<script setup lang="ts">
// 订货页面 - 待开发
// 后期会调用：POST /api/orders
</script>

<style scoped>
.page {
  padding: 20rpx;
}
.header {
  background: linear-gradient(135deg, #2858F8, #1A40C8);
  color: white;
  text-align: center;
  padding: 40rpx 30rpx;
}
.title {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  margin-bottom: 10rpx;
}
.subtitle {
  display: block;
  font-size: 26rpx;
  opacity: 0.9;
}
.empty-state {
  text-align: center;
  padding: 100rpx 30rpx;
  margin-top: 30rpx;
}
.empty-icon {
  font-size: 80rpx;
  display: block;
  margin-bottom: 20rpx;
}
.empty-text {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #1A1A2E;
  margin-bottom: 10rpx;
}
.empty-hint {
  display: block;
  font-size: 24rpx;
  color: #999;
}
</style>