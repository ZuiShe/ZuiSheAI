<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch - 醉社启动");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style>
/* 全局样式 - 与原 HTML 风格一致 */
page {
  background: #faf5f0;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
}
.container {
  padding: 20rpx;
}
.btn-primary {
  background: #2858F8;
  color: white;
  border-radius: 8rpx;
  padding: 16rpx 32rpx;
  text-align: center;
}
.card {
  background: white;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.empty-state {
  text-align: center;
  color: #999;
  padding: 60rpx 20rpx;
}
</style>