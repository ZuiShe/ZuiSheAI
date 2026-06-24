<template>
  <view class="page">
    <view class="profile-header">
      <view class="avatar">👤</view>
      <view class="info">
        <text class="name">未登录用户</text>
        <text class="role">醉社 · 酒类批发流通平台</text>
      </view>
    </view>

    <view class="menu card">
      <view class="menu-item">
        <text class="menu-icon">📦</text>
        <text class="menu-label">我的订单</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item">
        <text class="menu-icon">❤️</text>
        <text class="menu-label">我的收藏</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item">
        <text class="menu-icon">📍</text>
        <text class="menu-label">收货地址</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item">
        <text class="menu-icon">⚙️</text>
        <text class="menu-label">设置</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <view class="version card">
      <text class="version-text">版本 1.0.0 · uni-app + Vue 3</text>
    </view>
  </view>
</template>

<script setup lang="ts">
// 我的页面 - 基础框架，待开发
</script>

<style scoped>
.page {
  padding: 20rpx;
}
.profile-header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #2858F8, #1A40C8);
  color: white;
  padding: 40rpx 30rpx;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}
.avatar {
  font-size: 80rpx;
  margin-right: 24rpx;
}
.info {
  flex: 1;
}
.name {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
}
.role {
  display: block;
  font-size: 24rpx;
  opacity: 0.9;
}
.menu {
  padding: 0 30rpx;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-icon {
  font-size: 36rpx;
  margin-right: 24rpx;
}
.menu-label {
  flex: 1;
  font-size: 30rpx;
  color: #1A1A2E;
}
.menu-arrow {
  font-size: 36rpx;
  color: #ccc;
}
.version {
  text-align: center;
  padding: 20rpx;
  margin-top: 30rpx;
}
.version-text {
  font-size: 22rpx;
  color: #999;
}
</style>