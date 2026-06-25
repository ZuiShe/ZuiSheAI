<script setup lang="ts">
import { ref } from "vue";

interface MenuItem {
  icon: string;
  label: string;
  badge?: string;
}

const menuSections = ref<{ title: string; items: MenuItem[] }[]>([
  {
    title: "我的交易",
    items: [
      { icon: "📦", label: "我的订单" },
      { icon: "❤️", label: "我的收藏" },
      { icon: "📍", label: "收货地址" },
    ],
  },
  {
    title: "客户服务",
    items: [
      { icon: "💬", label: "联系客服" },
      { icon: "📞", label: "投诉建议" },
    ],
  },
  {
    title: "其他",
    items: [
      { icon: "⚙️", label: "设置" },
      { icon: "ℹ️", label: "关于醉社", badge: "v1.0" },
    ],
  },
]);
</script>

<template>
  <view class="page">
    <!-- 用户信息 -->
    <view class="profile-header">
      <view class="avatar">
        <text>👤</text>
      </view>
      <view class="user-info">
        <text class="user-name">未登录用户</text>
        <text class="user-role">醉社 · 酒类批发流通平台</text>
      </view>
      <view class="login-btn btn-secondary">登录 / 注册</view>
    </view>

    <!-- 菜单 -->
    <view
      v-for="section in menuSections"
      :key="section.title"
      class="menu-section"
    >
      <text class="menu-section-title">{{ section.title }}</text>
      <view class="card menu-card">
        <view
          v-for="(item, idx) in section.items"
          :key="item.label"
          class="menu-item"
          :class="{ 'menu-item-last': idx === section.items.length - 1 }"
        >
          <text class="menu-icon">{{ item.icon }}</text>
          <text class="menu-label">{{ item.label }}</text>
          <view v-if="item.badge" class="menu-badge">{{ item.badge }}</view>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <text class="version-text">版本 1.0.0 · uni-app + Vue 3</text>
  </view>
</template>

<style scoped>
.page {
  padding: 32rpx;
}

/* Profile header */
.profile-header {
  background: linear-gradient(135deg, #2858F8, #1A40C8);
  border-radius: var(--rounded-md);
  padding: 48rpx 32rpx;
  display: flex;
  align-items: center;
  color: var(--color-on-primary);
  margin-bottom: 40rpx;
  box-shadow: var(--shadow-product);
}
.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: var(--rounded-pill);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
}
.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.user-name {
  font-size: 36rpx;
  font-weight: 600;
  letter-spacing: -0.3rpx;
}
.user-role {
  font-size: 24rpx;
  opacity: 0.85;
}
.login-btn {
  font-size: 24rpx;
  padding: 12rpx 24rpx;
  background: var(--color-on-primary);
  color: var(--color-primary);
  border-color: var(--color-on-primary);
}

/* 菜单区 */
.menu-section {
  margin-bottom: 32rpx;
}
.menu-section-title {
  font-size: 24rpx;
  font-weight: 600;
  color: var(--color-body-muted);
  padding: 0 8rpx;
  margin-bottom: 16rpx;
  text-transform: uppercase;
  letter-spacing: 1rpx;
}
.menu-card {
  padding: 0;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 32rpx 24rpx;
  border-bottom: 1rpx solid var(--color-divider-soft);
}
.menu-item-last {
  border-bottom: none;
}
.menu-icon {
  font-size: 36rpx;
  margin-right: 24rpx;
}
.menu-label {
  flex: 1;
  font-size: 30rpx;
  color: var(--color-ink);
}
.menu-badge {
  font-size: 22rpx;
  background: var(--color-surface-pearl);
  color: var(--color-body-muted);
  padding: 4rpx 12rpx;
  border-radius: var(--rounded-sm);
  margin-right: 12rpx;
}
.menu-arrow {
  font-size: 36rpx;
  color: var(--color-text-secondary);
  font-weight: 300;
}

.version-text {
  display: block;
  text-align: center;
  font-size: 22rpx;
  color: var(--color-body-muted);
  margin-top: 48rpx;
}
</style>