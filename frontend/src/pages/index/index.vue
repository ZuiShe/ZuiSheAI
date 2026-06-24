<script setup lang="ts">
import { ref } from "vue";

// ============== Composable: useProducts ==============
interface Product {
  id: string;
  spu_name: string;
  spec: string | null;
  unit: string;
  alcohol_content: string | null;
  status: number;
  cover_image: string | null;
}

function imageUrl(cover: string | null): string {
  if (!cover) return '';
  // 从 "https://app.zuishe.com.cn/uploads/xxx" 提取 "xxx"
  const idx = cover.indexOf('/uploads/');
  if (idx === -1) return cover;
  const relativePath = cover.substring(idx + 9); // 跳过 "/uploads/"
  return 'https://be.zuishe.com.cn/api/image?p=' + encodeURIComponent(relativePath);
}

function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref("");

  async function load() {
    loading.value = true;
    error.value = "";
    try {
      const res = await uni.request({
        url: "https://be.zuishe.com.cn/api/products",
        method: "GET",
      });
      const data = res.data as any;
      if (res.statusCode === 200 && data.success) {
        products.value = data.data;
      } else {
        error.value = "API 返回异常";
      }
    } catch (e: any) {
      error.value = e.errMsg || e.message || "网络请求失败";
      uni.showToast({ title: "加载商品失败", icon: "none" });
    } finally {
      loading.value = false;
    }
  }

  return { products, loading, error, load };
}

const { products, loading, error, load: loadProducts } = useProducts();
loadProducts();
</script>

<template>
  <view class="page">
    <view class="banner card">
      <view class="badge">🔥 新人专享</view>
      <view class="title">首单满 1000 减 100</view>
      <view class="subtitle">注册即享批发价 · 全国配送</view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="section-title">📦 实时商品</text>
        <text class="section-tag" v-if="!loading">{{ products.length }} 件</text>
      </view>

      <view v-if="loading" class="empty-state">加载中…</view>
      <view v-else-if="error" class="empty-state error">{{ error }}</view>
      <view v-else>
        <view
          v-for="p in products"
          :key="p.id"
          class="product-card card"
        >
          <view class="pc-head">
            <image
              v-if="p.cover_image"
              :src="imageUrl(p.cover_image)"
              mode="aspectFill"
              class="pc-thumb"
            />
            <text v-else class="pc-icon">🍶</text>
            <text class="pc-tag">ID: {{ p.id }}</text>
          </view>
          <view class="pc-title">{{ p.spu_name }}</view>
          <view class="pc-spec">
            <text v-if="p.alcohol_content">{{ p.alcohol_content }}° · </text>
            <text>{{ p.unit }}</text>
          </view>
        </view>
      </view>

      <button class="btn-primary" @click="loadProducts" style="margin-top: 30rpx;">
        刷新商品
      </button>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 20rpx;
}
.banner {
  background: linear-gradient(135deg, #2858F8, #1A40C8);
  color: white;
  text-align: center;
}
.badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  margin-bottom: 16rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
  display: block;
  margin-bottom: 8rpx;
}
.subtitle {
  font-size: 24rpx;
  opacity: 0.9;
}
.section {
  margin-top: 30rpx;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 0 10rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1A1A2E;
}
.section-tag {
  font-size: 24rpx;
  color: #999;
}
.error {
  color: #2858F8;
}
.product-card {
  margin-bottom: 20rpx;
}
.pc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}
.pc-icon {
  font-size: 40rpx;
}
.pc-thumb {
  width: 80rpx;
  height: 80rpx;
  border-radius: 8rpx;
  object-fit: cover;
}
.pc-tag {
  background: #2858F8;
  color: white;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
}
.pc-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1A1A2E;
  margin-bottom: 8rpx;
  line-height: 1.4;
}
.pc-spec {
  font-size: 24rpx;
  color: #999;
}
</style>