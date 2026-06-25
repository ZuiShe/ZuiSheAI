<script setup lang="ts">
import { ref } from "vue";

// ============== 类型 ==============
interface Product {
  id: string;
  spu_name: string;
  spec: string | null;
  unit: string;
  alcohol_content: string | null;
  status: number;
  cover_image: string | null;
}

// ============== 工具函数 ==============
function imageUrl(cover: string | null): string {
  if (!cover) return "";
  const idx = cover.indexOf("/uploads/");
  if (idx === -1) return cover;
  return (
    "https://be.zuishe.com.cn/api/image?p=" +
    encodeURIComponent(cover.substring(idx + 9))
  );
}

// ============== Composable ==============
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
    <!-- Hero Banner -->
    <view class="hero">
      <view class="hero-badge">🔥 新人专享</view>
      <text class="hero-title">首单满 1000 减 100</text>
      <text class="hero-subtitle">注册即享批发价 · 全国配送 · 正品保障</text>
      <view class="btn-primary hero-btn">立即查看 →</view>
    </view>

    <!-- 商品列表 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">📦 实时商品</text>
        <text class="section-tag" v-if="!loading">{{ products.length }} 件</text>
      </view>

      <view v-if="loading" class="empty-state">加载中…</view>
      <view v-else-if="error" class="empty-state">{{ error }}</view>
      <view v-else class="product-grid">
        <view v-for="p in products" :key="p.id" class="card product-card">
          <image
            v-if="p.cover_image"
            :src="imageUrl(p.cover_image)"
            mode="aspectFill"
            class="product-thumb"
          />
          <view v-else class="product-thumb product-thumb-placeholder">
            <text>🍶</text>
          </view>
          <view class="product-info">
            <text class="product-name">{{ p.spu_name }}</text>
            <view class="product-meta">
              <text v-if="p.alcohol_content" class="meta-text">
                {{ p.alcohol_content }}° · {{ p.unit }}
              </text>
              <text v-else class="meta-text">{{ p.unit }}</text>
            </view>
            <view class="tag-hot">ID: {{ p.id }}</view>
          </view>
        </view>
      </view>

      <view class="btn-primary refresh-btn" @click="loadProducts">
        刷新商品
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 32rpx;
}

/* Hero Banner */
.hero {
  background: linear-gradient(135deg, #2858F8, #1A40C8);
  border-radius: var(--rounded-md);
  padding: 64rpx 48rpx;
  text-align: center;
  color: var(--color-on-primary);
  margin-bottom: 40rpx;
  box-shadow: var(--shadow-product);
}
.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 6rpx 20rpx;
  border-radius: var(--rounded-pill);
  font-size: 24rpx;
  margin-bottom: 24rpx;
}
.hero-title {
  display: block;
  font-size: 56rpx;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1rpx;
  margin-bottom: 16rpx;
}
.hero-subtitle {
  display: block;
  font-size: 28rpx;
  opacity: 0.9;
  margin-bottom: 32rpx;
}
.hero-btn {
  background: var(--color-on-primary);
  color: var(--color-primary);
  display: inline-block;
  padding: 16rpx 40rpx;
}

/* 区块标题 */
.section {
  margin-top: 0;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  padding: 0 8rpx;
}
.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: var(--color-ink);
}
.section-tag {
  font-size: 24rpx;
  color: var(--color-body-muted);
}

/* 商品网格 */
.product-grid {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.product-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20rpx;
}
.product-thumb {
  width: 160rpx;
  height: 160rpx;
  border-radius: var(--rounded-sm);
  object-fit: cover;
  flex-shrink: 0;
  background: var(--color-canvas-parchment);
}
.product-thumb-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80rpx;
}
.product-info {
  flex: 1;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.product-name {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-meta {
  display: flex;
  align-items: center;
}
.meta-text {
  font-size: 24rpx;
  color: var(--color-body-muted);
}

.tag-hot {
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: var(--rounded-sm);
  align-self: flex-start;
  margin-top: 4rpx;
}

.refresh-btn {
  margin-top: 32rpx;
  display: block;
  text-align: center;
}
</style>