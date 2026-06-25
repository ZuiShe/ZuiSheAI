<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("[zuishe] App Launch - 醉社启动");
});
onShow(() => {
  console.log("[zuishe] App Show");
});
onHide(() => {
  console.log("[zuishe] App Hide");
});
</script>

<style>
/* ========== 全局 token（基于 DESIGN.md） ========== */
page {
  /* 颜色 */
  --color-primary: #2858F8;
  --color-primary-hover: #3470FF;
  --color-primary-focus: #1A40C8;
  --color-primary-on-dark: #5C8BFF;

  --color-ink: #1A1A2E;
  --color-body-muted: #666666;
  --color-ink-muted-48: #7A7A7A;

  --color-hairline: #E8E8EC;
  --color-divider-soft: #F0F0F4;

  --color-canvas: #FFFFFF;
  --color-canvas-parchment: #FAF5F0;
  --color-surface-pearl: #FCFCFD;
  --color-surface-black: #000000;

  --color-on-primary: #FFFFFF;
  --color-on-dark: #FFFFFF;

  --color-text-secondary: #999999;

  /* 圆角 */
  --rounded-none: 0;
  --rounded-sm: 8rpx;
  --rounded-md: 16rpx;
  --rounded-pill: 9999rpx;

  /* 阴影 */
  --shadow-card: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  --shadow-product: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);

  /* 基础 */
  background: var(--color-canvas-parchment);
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", "Microsoft YaHei", sans-serif;
  color: var(--color-ink);
  font-size: 28rpx;
  line-height: 1.5;
}

/* ========== 全局工具类 ========== */

/* 文字对齐 */
.text-center { text-align: center; }

/* Flex 工具 */
.flex { display: flex; }
.flex-row { display: flex; flex-direction: row; }
.flex-col { display: flex; flex-direction: column; }
.flex-1 { flex: 1; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }

/* 间距 */
.mt-xs { margin-top: 8rpx; }
.mt-sm { margin-top: 12rpx; }
.mt-md { margin-top: 16rpx; }
.mt-lg { margin-top: 24rpx; }
.mt-xl { margin-top: 32rpx; }
.mt-xxl { margin-top: 48rpx; }

/* 通用按钮 */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--rounded-pill);
  padding: 16rpx 32rpx;
  font-size: 30rpx;
  font-weight: 500;
  text-align: center;
  display: inline-block;
  border: none;
  line-height: 1;
}
.btn-primary:active {
  transform: scale(0.96);
  background: var(--color-primary-focus);
}

.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1rpx solid var(--color-primary);
  border-radius: var(--rounded-pill);
  padding: 16rpx 32rpx;
  font-size: 30rpx;
  font-weight: 500;
  text-align: center;
  display: inline-block;
  line-height: 1;
}

.btn-utility {
  background: var(--color-surface-pearl);
  color: var(--color-ink);
  border-radius: var(--rounded-md);
  padding: 12rpx 20rpx;
  font-size: 26rpx;
  font-weight: 500;
  text-align: center;
  display: inline-block;
  line-height: 1;
}

/* 卡片 */
.card {
  background: var(--color-canvas);
  border-radius: var(--rounded-md);
  padding: 24rpx;
  box-shadow: var(--shadow-card);
}

/* 空状态 */
.empty-state {
  text-align: center;
  color: var(--color-body-muted);
  padding: 100rpx 40rpx;
  font-size: 28rpx;
}
</style>