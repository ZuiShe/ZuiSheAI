<script setup lang="ts">
import { ref } from "vue";

interface Product {
  id: string;
  spu_name: string;
  spec: string | null;
  unit: string;
  alcohol_content: string | null;
  status: number;
  cover_image: string | null;
}

interface Category {
  id: string;
  cat_name: string;
  product_count: string;
}

function imageUrl(cover: string | null): string {
  if (!cover) return "";
  const idx = cover.indexOf("/uploads/");
  if (idx === -1) return cover;
  return (
    "https://be.zuishe.com.cn/api/image?p=" +
    encodeURIComponent(cover.substring(idx + 9))
  );
}

const categories = ref<Category[]>([]);
const activeCat = ref("all");
const products = ref<Product[]>([]);
const loading = ref(true);

async function loadCategories() {
  try {
    const res = await uni.request({
      url: "https://be.zuishe.com.cn/api/categories",
      method: "GET",
    });
    const data = res.data as any;
    if (data.success) {
      categories.value = [{ id: "all", cat_name: "全部", product_count: "" }, ...data.data];
    }
  } catch (e) {
    console.error("加载分类失败", e);
  }
}

async function loadProducts() {
  loading.value = true;
  try {
    const res = await uni.request({
      url: "https://be.zuishe.com.cn/api/products",
      method: "GET",
    });
    const data = res.data as any;
    if (data.success) {
      products.value = data.data;
    }
  } catch (e) {
    uni.showToast({ title: "加载失败", icon: "none" });
  } finally {
    loading.value = false;
  }
}

loadCategories();
loadProducts();
</script>

<template>
  <view class="page">
    <!-- 顶部 hero -->
    <view class="hero">
      <text class="hero-title">订货中心</text>
      <text class="hero-subtitle">批发价 · 全国配送 · 厂家直供</text>
    </view>

    <!-- 分类 tab -->
    <scroll-view class="cat-tabs" scroll-x>
      <view
        v-for="cat in categories"
        :key="cat.id"
        class="cat-tab"
        :class="{ active: activeCat === cat.id }"
        @click="activeCat = cat.id"
      >
        <text>{{ cat.cat_name }}</text>
      </view>
    </scroll-view>

    <!-- 商品列表 -->
    <view v-if="loading" class="empty-state">加载中…</view>
    <view v-else-if="products.length === 0" class="empty-state">
      暂无商品
    </view>
    <view v-else class="product-list">
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
          <text class="meta-text">
            <text v-if="p.alcohol_content">{{ p.alcohol_content }}° · </text>
            {{ p.unit }}
          </text>
          <view class="product-actions">
            <text class="price-tag">¥ --</text>
            <view class="btn-primary action-btn">+ 加入订货</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 32rpx;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #2858F8, #1A40C8);
  border-radius: var(--rounded-md);
  padding: 48rpx;
  text-align: center;
  color: var(--color-on-primary);
  margin-bottom: 32rpx;
}
.hero-title {
  display: block;
  font-size: 44rpx;
  font-weight: 700;
  letter-spacing: -0.5rpx;
  margin-bottom: 8rpx;
}
.hero-subtitle {
  display: block;
  font-size: 26rpx;
  opacity: 0.9;
}

/* 分类 tab */
.cat-tabs {
  white-space: nowrap;
  margin-bottom: 24rpx;
  padding: 8rpx 0;
}
.cat-tab {
  display: inline-block;
  padding: 16rpx 32rpx;
  font-size: 28rpx;
  color: var(--color-body-muted);
  border-radius: var(--rounded-pill);
  margin-right: 16rpx;
  background: var(--color-surface-pearl);
}
.cat-tab.active {
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-weight: 500;
}

/* 商品列表 */
.product-list {
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
  gap: 12rpx;
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
.meta-text {
  font-size: 24rpx;
  color: var(--color-body-muted);
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rpx;
}
.price-tag {
  font-size: 32rpx;
  font-weight: 700;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}
.action-btn {
  padding: 12rpx 24rpx;
  font-size: 24rpx;
}
</style>