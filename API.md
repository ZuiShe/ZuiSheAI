# 醉社后端 API 接口文档（小程序对接用）

> **Base URL**: `https://be.zuishe.com.cn`  
> **协议**: HTTPS  
> **认证**: 暂无（公开 API）  
> **响应格式**: 全部 JSON  
> **小程序域名白名单**: 需把 `be.zuishe.com.cn` 加入微信公众平台「开发管理 → 服务器域名」

---

## 通用约定

### 1. 请求方式
- 所有接口均为 `GET` / `POST` 方式
- 推荐使用 `wx.request`（微信小程序原生）

### 2. 响应统一格式

```json
{
  "success": true,         // 是否成功
  "count": 10,             // 数据条数（仅列表接口）
  "data": [...] or {...},  // 业务数据
  "error": "错误信息"       // 失败时返回（success=false）
}
```

### 3. HTTP 状态码

| 状态码 | 含义 |
|---|---|
| 200 | 成功 |
| 400 | 参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

### 4. 错误处理示例

```javascript
wx.request({
  url: 'https://be.zuishe.com.cn/api/products',
  method: 'GET',
  success: (res) => {
    if (res.data.success) {
      // 处理数据
      console.log(res.data.data)
    } else {
      wx.showToast({ title: res.data.error, icon: 'none' })
    }
  },
  fail: (err) => {
    wx.showToast({ title: '网络错误', icon: 'none' })
  }
})
```

---

## 接口列表

### 1. 健康检查 `GET /health`

**用途**: 服务器状态监控

**响应示例**:
```json
{
  "status": "ok",
  "service": "zuishe-backend",
  "time": "2026-06-25T11:30:00.000Z"
}
```

**小程序代码**:
```javascript
wx.request({
  url: 'https://be.zuishe.com.cn/health',
  method: 'GET'
})
```

---

### 2. 服务信息 `GET /`

**用途**: API 根路径，确认服务在线

**响应示例**:
```json
{
  "message": "zuishe.com.cn API 服务运行中",
  "version": "1.0.0",
  "docs": "https://be.zuishe.com.cn/health"
}
```

---

### 3. 商品列表 `GET /api/products`

**用途**: 获取商品列表（首页/订货页用）

**Query 参数**: 无（暂硬编码前 10 个）

**响应示例**:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "1",
      "spu_name": "泸州老窖 1952 浓香型白酒 52度 500ml",
      "spec": null,
      "unit": "箱",
      "alcohol_content": "52.00",
      "status": 1,
      "cover_image": "https://app.zuishe.com.cn/uploads/products/浓香白酒/泸州老窖 1952 浓香型白酒 52度 500ml/1/泸州老窖 1952 浓香型白酒 52度 500ml-1.jpg"
    }
  ]
}
```

**字段说明**:

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 商品 ID（bigint 转 string） |
| `spu_name` | string | 商品名称 |
| `spec` | string \| null | 规格（如 500ml） |
| `unit` | string | 单位（默认"箱"） |
| `alcohol_content` | string | 度数（numeric 转 string） |
| `status` | number | 状态（1=上架） |
| `cover_image` | string \| null | 封面图 URL（**含中文路径**） |

**⚠️ 图片 URL 处理**:

数据库里的 `cover_image` 是带中文路径的全 URL，**不能直接用**。需要转换为图片代理 URL：

```javascript
function getImageUrl(cover) {
  if (!cover) return ''
  const idx = cover.indexOf('/uploads/')
  if (idx === -1) return cover
  const relativePath = cover.substring(idx + 9)  // 跳过 "/uploads/"
  return 'https://be.zuishe.com.cn/api/image?p=' + encodeURIComponent(relativePath)
}

// 使用：
const url = getImageUrl(product.cover_image)
wx.request({ url })
```

**小程序代码**:
```javascript
Page({
  onLoad() {
    wx.request({
      url: 'https://be.zuishe.com.cn/api/products',
      method: 'GET',
      success: (res) => {
        if (res.data.success) {
          this.setData({ products: res.data.data })
        }
      }
    })
  }
})
```

---

### 4. 商品分类 `GET /api/categories`

**用途**: 获取一级分类（含商品数量）

**响应示例**:
```json
{
  "success": true,
  "count": 19,
  "data": [
    {
      "id": "1",
      "cat_name": "白酒",
      "product_count": "85"
    }
  ]
}
```

**字段说明**:

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 分类 ID |
| `cat_name` | string | 分类名（注意是 `cat_name`，不是 `name`） |
| `product_count` | string | 该分类下的商品数（LEFT JOIN，可能不准确） |

**小程序代码**:
```javascript
wx.request({
  url: 'https://be.zuishe.com.cn/api/categories',
  method: 'GET',
  success: (res) => {
    if (res.data.success) {
      this.setData({ categories: res.data.data })
    }
  }
})
```

---

### 5. 平台统计 `GET /api/stats`

**用途**: 首页展示平台数据

**响应示例**:
```json
{
  "success": true,
  "data": {
    "total_products": "348",
    "total_brands": "85",
    "total_categories": "19",
    "total_supplier_products": "743"
  }
}
```

**字段说明**:

| 字段 | 类型 | 说明 |
|---|---|---|
| `total_products` | string | SPU 总数 |
| `total_brands` | string | 品牌数 |
| `total_categories` | string | 分类数 |
| `total_supplier_products` | string | 供应商商品数 |

**小程序代码**:
```javascript
wx.request({
  url: 'https://be.zuishe.com.cn/api/stats',
  method: 'GET',
  success: (res) => {
    if (res.data.success) {
      this.setData({ stats: res.data.data })
    }
  }
})
```

---

### 6. 图片代理 `GET /api/image?p=<relativePath>`

**用途**: 解决中文路径 URL 编码问题，从服务器读图片返回二进制

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `p` | string | 是 | uploads 目录下的相对路径（不要含 `/uploads/` 前缀） |

**示例 URL**:
```
https://be.zuishe.com.cn/api/image?p=products/浓香白酒/泸州老窖 1952 浓香型白酒 52度 500ml/1/泸州老窖 1952 浓香型白酒 52度 500ml-1.jpg
```

**响应**: 二进制图片数据（Content-Type: image/jpeg）

**⚠️ 小程序使用**:

**方式 1**: `<image>` 标签直接用（推荐）
```html
<image src="https://be.zuishe.com.cn/api/image?p=products/浓香白酒/..." mode="aspectFill"/>
```

**方式 2**: `wx.request` 获取后转 base64（不推荐，慢）
```javascript
// 暂不推荐
```

**安全说明**:
- 自动阻止 `../` 路径遍历攻击
- 支持 .jpg/.jpeg/.png/.gif/.webp/.bmp
- 缓存 24 小时

---

## 小程序接入步骤

### 1. 微信公众平台配置

登录 https://mp.weixin.qq.com → 开发管理 → 服务器域名：

```
request 合法域名：https://be.zuishe.com.cn
uploadFile 合法域名：https://be.zuishe.com.cn
downloadFile 合法域名：https://be.zuishe.com.cn
```

### 2. 小程序代码示例

```javascript
// utils/api.js
const BASE_URL = 'https://be.zuishe.com.cn'

function request(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      header: { 'content-type': 'application/json' },
      success: (res) => {
        if (res.data.success) {
          resolve(res.data)
        } else {
          wx.showToast({ title: res.data.error || '请求失败', icon: 'none' })
          reject(res.data)
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误', icon: 'none' })
        reject(err)
      }
    })
  })
}

// 图片 URL 转换
function getImageUrl(cover) {
  if (!cover) return ''
  const idx = cover.indexOf('/uploads/')
  if (idx === -1) return cover
  const relativePath = cover.substring(idx + 9)
  return BASE_URL + '/api/image?p=' + encodeURIComponent(relativePath)
}

module.exports = {
  BASE_URL,
  request,
  getImageUrl,
  // API 方法
  getProducts: () => request('/api/products'),
  getCategories: () => request('/api/categories'),
  getStats: () => request('/api/stats'),
}
```

### 3. 页面使用

```javascript
// pages/index/index.js
const api = require('../../utils/api')

Page({
  data: { products: [] },
  onLoad() {
    api.getProducts().then(res => {
      this.setData({ products: res.data })
    })
  }
})
```

```html
<!-- pages/index/index.wxml -->
<view wx:for="{{products}}" wx:key="id" class="product">
  <image src="{{item.imageUrl}}" mode="aspectFill" class="thumb"/>
  <text class="name">{{item.spu_name}}</text>
  <text class="price">¥ {{item.base_price || '--'}}</text>
</view>
```

```javascript
// 在 wxs 或 js 里
onLoad() {
  api.getProducts().then(res => {
    res.data.forEach(p => {
      p.imageUrl = api.getImageUrl(p.cover_image)
    })
    this.setData({ products: res.data })
  })
}
```

---

## 调试小技巧

### 1. 在浏览器测试 API

直接打开浏览器访问 `https://be.zuishe.com.cn/api/products`，可以看到 JSON 返回。

### 2. 在线接口测试工具

- Apifox: https://apifox.com
- Postman: https://www.postman.com

### 3. 微信开发者工具调试

「工具 → 自定义预处理」中可以 mock 接口返回，方便前端独立开发。

---

## 待补 API（暂未实现）

| 接口 | 用途 | 优先级 |
|---|---|---|
| `GET /api/products/:id` | 商品详情 | 中 |
| `GET /api/brands` | 品牌列表 | 中 |
| `GET /api/products?category=X&page=Y` | 商品分页筛选 | 高 |
| `POST /api/order` | 创建订单 | 高（需要先做用户登录） |
| `GET /api/order/list` | 我的订单 | 高 |
| `POST /api/auth/login` | 用户登录 | 高 |
| `POST /api/auth/register` | 用户注册 | 中 |

**以上接口根据你的业务优先级逐步实现。**

---

## 联系

- 接口变更会同步更新本文档
- 后端代码仓库: `https://github.com/ZuiShe/ZuiSheAI`
- 问题反馈: 直接问我

---

**最后更新**: 2026-06-25  
**后端版本**: zuishe-backend v1.0.0  
**适用客户端**: 微信小程序 / H5 / App（uni-app 多端通用）