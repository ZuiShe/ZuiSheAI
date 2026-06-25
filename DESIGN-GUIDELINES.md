# zuishe.com.cn 设计 + 开发指南

> 本文档用于项目开发时的参考。简短实用，避免冗余。

---

## 1. Web Design Guidelines（网页设计原则）

### 核心原则
- **清晰层级**：标题/正文/说明三层字号对比 ≥ 1.5x
- **充足留白**：内容块间距 ≥ 16px，行高 1.5-1.7
- **响应式优先**：先移动端设计，再扩展桌面端
- **8px 网格**：所有间距/尺寸基于 8 的倍数（4px 用于细节）
- **对比度**：文字与背景对比度 ≥ 4.5:1（WCAG AA）

### 本项目主色
- 主色：`#2858F8`（蓝）
- 深色变体：`#1A40C8`（渐变末端）
- 背景：`#faf5f0`（米色）
- 文字：`#1A1A2E`（深灰近黑）
- 次要文字：`#999`

---

## 2. Tailwind Design System（Tailwind 实用类）

### 你当前是 uni-app，**不能用 Tailwind**（CSS 不支持所有 utility）
但思想可以借鉴 —— 用语义化 class 复用：

```css
/* 推荐定义的全局类（在 App.vue） */
.btn-primary { background: #2858F8; color: white; padding: 16rpx 32rpx; border-radius: 8rpx; }
.card { background: white; border-radius: 16rpx; padding: 24rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); }
```

### 关键概念对照
| Tailwind | uni-app 等价 |
|---|---|
| `flex` | `display: flex`（uni-app H5 支持完整 CSS） |
| `gap-4` | `gap: 32rpx`（rpx = 750 设计稿 / 屏幕宽度） |
| `text-xl` | `font-size: 32rpx` |
| `rounded-lg` | `border-radius: 8rpx` |

### 何时用 Tailwind？
如果你以后做**单独的 Node.js 后台管理端**（非 uni-app），可以用 Tailwind。本项目前端继续用 scoped CSS。

---

## 3. UI Component Patterns（组件模式）

### 本项目组件分层

```
页面 (pages/*.vue)
  ↓ 使用
通用组件 (components/*.vue) ← 推荐抽出来
  ↓ 使用
uni-app 基础组件 (view/text/image/button)
```

### 推荐抽离的通用组件

| 组件 | 用途 | 关键 props |
|---|---|---|
| `ProductCard.vue` | 商品卡片 | `product: Product` |
| `EmptyState.vue` | 空状态/加载中/错误 | `type: 'loading'\|'empty'\|'error'` |
| `PriceTag.vue` | 价格显示（含原价划线） | `price: number, original?: number` |
| `CategoryTabs.vue` | 分类切换 | `categories: Category[], active: number` |

### 设计原则
- **单一职责**：一个组件只做一件事
- **Props 类型化**：用 TypeScript interface 明确 props
- **不直接 fetch**：组件只渲染，数据由页面通过 props 传入

---

## 4. API Design（API 设计）

### 本项目已建立的 API 端点

| 端点 | 方法 | 用途 |
|---|---|---|
| `/health` | GET | 健康检查 |
| `/` | GET | 服务信息 |
| `/api/products` | GET | 商品列表（前 10 个） |
| `/api/categories` | GET | 分类列表（含商品数） |
| `/api/stats` | GET | 统计数据（总数） |
| `/api/image?p=...` | GET | 图片代理（解决中文路径） |

### 设计原则
- **统一响应格式**：`{ success: bool, count?: number, data: any, error?: string }`
- **错误用 HTTP 状态码**：400 参数错 / 404 不存在 / 500 服务器错
- **不要暴露数据库错误细节**：返回通用消息，详细错误进日志
- **路径前缀**：`/api/` 表示业务接口
- **GET 只读 / POST 创建 / PUT 更新 / DELETE 删除**（本项目暂只用 GET）

### 接下来要加的 API

| 端点 | 方法 | 用途 |
|---|---|---|
| `/api/products/:id` | GET | 商品详情 |
| `/api/products?category=1&page=1&limit=20` | GET | 商品分页 + 筛选 |
| `/api/categories/tree` | GET | 分类树（一级 + 内部分类） |
| `/api/brands` | GET | 品牌列表 |
| `/api/orders` | POST | 创建订单（需登录） |

---

## 5. Database Schema Design（数据库设计）

### 本项目现有 49 张表

#### 核心业务表
| 表 | 用途 | 关键字段 |
|---|---|---|
| `company` | 入驻公司（你 = id=1） | name, contact |
| `category` | 一级分类（19 条） | name, parent_id |
| `inner_category` | 内部分类（96 条） | name, parent_id |
| `brand` | 品牌（85 条） | name |
| `spu` | 商品（348 条） | spu_name, category_id, brand_id, cover_image, images (jsonb) |
| `supplier_product` | 供应商商品（743 条） | supplier_id, spu_id, base_price, status |

#### 业务扩展表（暂空）
| 表 | 用途 |
|---|---|
| `user` | 用户 |
| `order_info` / `order_item` | 订单 |
| `cart` / `cart_item` | 购物车 |
| `quotation` / `quotation_item` | 报价单 |
| `payment_record` | 支付记录 |
| `address` | 收货地址 |

### 设计原则（实战经验）
- **主键用 `bigint`**：预留扩展空间（避免 int 4G 上限）
- **时间字段必须**：`created_at`, `updated_at`
- **软删除优于硬删除**：加 `deleted_at` 字段，业务过滤
- **状态字段**：用 `status` 字段（数字或枚举），不要用多个 bool
- **JSON 字段谨慎用**：本项目 `images` 用了 jsonb（多图），查询慢但灵活
- **中文字段值**：URL 里含中文必须 URL 编码，或用代理 API（已解决）

### SQL 文件规范

| 文件 | 用途 |
|---|---|
| `zuishe_pg_*.sql` | schema 定义（结构） |
| `migrate_product_import.sql` | 业务数据迁移 |
| `fix_unique_constraints.sql` | 修补脚本 |
| `import_products_data.sql` | 真实数据（**不入仓**） |

---

## 下一步建议

按这个指南你可以：
1. 把通用组件抽出来（ProductCard / EmptyState / PriceTag）
2. 完善商品 API（分页 + 分类筛选）
3. 加用户/订单表（开始业务逻辑）
4. 用 main 色调统一所有页面（已完成）

---

**更新日期**：2026-06-25
**适用版本**：uni-app Vue 3 + NestJS 10 + PostgreSQL 16
**主色**：`#2858F8`