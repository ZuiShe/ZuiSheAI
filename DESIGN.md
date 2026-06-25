# zuishe DESIGN.md — 醉社酒类批发流通平台设计规范

> 基于 Apple DESIGN.md 结构改写，色值/字体本地化适配。  
> 版本：v1.0 · 2026-06-25 · 主色 #2858F8

---

## Overview

醉社是面向烟酒批发流通领域的 B2B 平台。设计语言是**商品摄影优先、UI 让位**：商品大图是主角，界面是配角。色彩克制（一个蓝色 + 米色背景 + 深灰文字），字体只用系统字体（不依赖外部 CDN），间距基于 8px 网格。

**Key Characteristics:**
- 商品摄影优先；UI 退后让商品说话
- 米色画布 + 单一蓝色（#2858F8）作为所有交互色
- 字体仅 3 种：商品标题 / 正文 / 辅助文字
- 圆角 4 级：none / sm / md / pill
- 阴影 1 种：商品图落地的单一投影（与 Apple 一致）

---

## Colors

### 品牌主色（Action Blue）
- **Primary** `#2858F8` —— 所有链接、按钮、选中态都用这个色
- **Primary Focus** `#1A40C8` —— 键盘 focus 描边
- **Primary On Dark** `#5C8BFF` —— 深色背景上的链接（首页 hero 渐变末端）
- **Primary Hover** `#3470FF` —— 鼠标悬浮态（可选）

### 灰度（Text & Surface）
- **Ink** `#1A1A2E` —— 标题、正文、深灰近黑
- **Body Muted** `#666666` —— 副文字、说明
- **Ink Muted 48** `#7A7A7A` —— 禁用、版权
- **Hairline** `#E8E8EC` —— 1px 边线、分隔线
- **Divider Soft** `#F0F0F4` —— 次级边框

### 表面（Canvas & Surface）
- **Canvas** `#FFFFFF` —— 卡片底色
- **Canvas Parchment** `#FAF5F0` —— 米色画布（页面背景）
- **Surface Pearl** `#FCFCFD` —— 次级按钮底色
- **Surface Black** `#000000` —— tabBar 激活图标

### 状态（Semantic）
- **On Primary** `#FFFFFF` —— 主色按钮文字
- **On Dark** `#FFFFFF` —— 深色背景文字
- **On Parchment** `#1A1A2E` —— 米色背景文字

### 不可用
- ❌ 第二种蓝色（保持单一强调色）
- ❌ 渐变装饰（除 hero 区外）

---

## Typography

### Font Family

- **Display / Body**: `PingFang SC, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif`
- **Number**: `font-variant-numeric: tabular-nums`（价格等数字对齐）

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `hero-display` | 56rpx | 700 | 1.07 | -0.5rpx | hero 标题 |
| `display-lg` | 44rpx | 700 | 1.15 | -0.3rpx | 商品卡大标题 |
| `display-md` | 36rpx | 600 | 1.2 | 0 | 区块标题 |
| `lead` | 32rpx | 500 | 1.3 | 0 | 副标题 |
| `body-strong` | 30rpx | 600 | 1.4 | 0 | 商品名 |
| `body` | 28rpx | 400 | 1.5 | 0 | 正文 |
| `caption` | 24rpx | 400 | 1.4 | 0 | 注释、价格 |
| `fine-print` | 22rpx | 400 | 1.3 | 0 | 版权、说明 |
| `nav-link` | 20rpx | 500 | 1.0 | 0 | tabBar 文字 |
| `button-large` | 30rpx | 500 | 1.0 | 0 | 主按钮 |
| `button-utility` | 26rpx | 500 | 1.0 | 0 | 次按钮 |

> 单位说明：uni-app 用 rpx（750 设计稿）。移动端 1px = 2rpx。

### Principles

- **标题用 weight 600/700**（比正文重 200-300）
- **正文用 weight 400**
- **价格用 tabular-nums**（数字等宽）
- **行高 = 字号 × 1.4-1.5**（不挤不散）

---

## Layout

### Spacing System

- **基础单位**: 8rpx
- **Tokens**:
  - `xxs` 4rpx
  - `xs` 8rpx
  - `sm` 12rpx
  - `md` 16rpx
  - `lg` 24rpx
  - `xl` 32rpx
  - `xxl` 48rpx
  - `section` 64rpx

### Container

- **页面内边距**: 32rpx（左右）
- **卡片间距**: 20rpx
- **区块间距**: 40rpx

---

## Shapes

### Border Radius

| Token | Value | Use |
|---|---|---|
| `none` | 0 | 满屏 hero、tabBar |
| `sm` | 8rpx | 缩略图、tag |
| `md` | 16rpx | 卡片、商品格 |
| `pill` | 9999rpx | 按钮、tag、搜索框 |

### Shadow

| Level | Treatment | Use |
|---|---|---|
| Flat | 无阴影 | 满屏 hero、tabBar、按钮 |
| Card | `0 2rpx 8rpx rgba(0,0,0,0.04)` | 商品卡 |
| Product | `0 4rpx 16rpx rgba(0,0,0,0.08)` | 商品大图落地 |

**Shadow 哲学**：阴影克制，只用在卡片和商品图上，**不**用在按钮/文字。

---

## Components

### Button

**`button-primary`** —— 主操作按钮  
- 背景 `{colors.primary}` (#2858F8)  
- 文字 `{colors.on-primary}` 17px / 500  
- 圆角 `{rounded.pill}`  
- 内边距 16rpx × 32rpx  
- Active: `transform: scale(0.95)`  
- Focus: 2rpx `{colors.primary-focus}` 描边

**`button-secondary-pill`** —— 次操作按钮（描边型）  
- 背景 transparent  
- 边框 1rpx `{colors.primary}`  
- 文字 `{colors.primary}`  
- 圆角 `{rounded.pill}`

**`button-utility`** —— 工具型按钮（次要操作）  
- 背景 `{colors.surface-pearl}`  
- 文字 `{colors.ink}`  
- 圆角 `{rounded.md}` (16rpx)  
- 内边距 12rpx × 20rpx

### Card

**`product-card`** —— 商品卡片  
- 背景 `{colors.canvas}`  
- 圆角 `{rounded.md}` (16rpx)  
- 内边距 24rpx  
- 阴影 `{shadow.card}`  
- 内部: 缩略图（80×80, sm 圆角）+ 商品名（body-strong）+ 价格（caption, tabular-nums）

**`product-card-large`** —— 商品大卡（首页 hero 下方）  
- 背景 `{colors.canvas}`  
- 圆角 `{rounded.md}`  
- 内边距 32rpx  
- 阴影 `{shadow.card}`  
- 内部: 商品图（240×240, sm 圆角）+ 商品名（display-lg）+ 价格

### TabBar

**`tab-bar`** —— 底部导航  
- 背景 `{colors.canvas}`  
- 高度 100rpx  
- 激活图标色 `{colors.primary}`  
- 文字 `{typography.nav-link}`

### Tab

**`section-tab`** —— 区块切换 tab（订货页）  
- 横向滚动  
- 激活下划线 `{colors.primary}` 4rpx

### Tag

**`tag-hot`** —— 热销标签  
- 背景 `{colors.primary}`  
- 文字 `{colors.on-primary}` 22rpx  
- 圆角 `{rounded.sm}`  
- 内边距 4rpx × 12rpx

**`tag-sale`** —— 特价标签  
- 背景 `#FF6B35`（仅作价格强调）  
- 同上样式

### EmptyState

**`empty-state`** —— 空状态/加载/错误  
- 文字居中  
- 字号 `{typography.body}`  
- 颜色 `{colors.body-muted}`  
- 内边距 100rpx × 40rpx

### Loading

**`loading-spinner`** —— 加载中  
- 居中 spinner 或文字 "加载中…"  
- 字号 `{typography.caption}`  
- 颜色 `{colors.body-muted}`

---

## Hero

**`hero-banner`** —— 首页顶部 hero  
- 背景 `linear-gradient(135deg, #2858F8, #1A40C8)`  
- 文字白色，居中  
- 标题 `{typography.hero-display}`  
- 副标题 `{typography.lead}`  
- 内边距 `{spacing.xxl}` × `{spacing.xl}`

**`hero-mini`** —— 次级 banner（如新人专享）  
- 同上但更小尺寸  
- 标题 `{typography.display-md}`

---

## Profile

**`profile-header`** —— 我的页头部  
- 背景 `linear-gradient(135deg, #2858F8, #1A40C8)`  
- 头像 + 昵称 + 角色  
- 内边距 80rpx × 60rpx

**`profile-menu-item`** —— 菜单项  
- 背景 `{colors.canvas}`  
- 左 icon + 中文字 + 右箭头  
- 高度 100rpx  
- 下边框 1rpx `{colors.divider-soft}`

---

## Do's and Don'ts

### Do
- ✅ 主色 `{colors.primary}` 用于所有交互元素（链接、按钮、focus）
- ✅ 标题用 `{typography.hero-display}` / `{typography.display-lg}` 加重
- ✅ 正文用 `{typography.body}` (17px)
- ✅ 商品大图用 hero banner 的渐变区分页面区块
- ✅ 主按钮用 `{rounded.pill}`，普通按钮用 `{rounded.md}`
- ✅ 商品图片用 `{shadow.product}`，卡片用 `{shadow.card}`，其他不用阴影
- ✅ 按钮 active 用 `transform: scale(0.95)`
- ✅ tabBar 激活态用 `{colors.primary}`，未激活用灰色

### Don't
- ❌ 不要引入第二种蓝色（保持单一强调色）
- ❌ 不要给按钮加阴影（按钮要"轻"）
- ❌ 不要用渐变作为装饰背景（只在 hero 用）
- ❌ 不要把正文设为 weight 500（用 400）
- ❌ 不要给满屏区块加圆角（保持直角）
- ❌ 不要把正文行高调到 1.5 以下
- ❌ 不要混用圆角（只有 none / sm / md / pill 四级）

---

## Responsive Behavior

### Breakpoints

| 名称 | 宽度 | 关键变化 |
|---|---|---|
| 小屏手机 | ≤ 375px | 单列、tabBar 完整 |
| 手机 | 376-640px | 单列、字号缩小 |
| 平板 | 641-1024px | 双列、字号中等 |
| 桌面 | ≥ 1025px | 多列、字号放大、PC 导航显示 |

### 触摸目标
- 最小 80×80rpx
- 按钮命中区域比视觉大 16rpx

---

## Iteration Guide

1. **逐组件定义**：参考 `{component.product-card}` 完整写法
2. **变体作为新条目**：`-active` / `-disabled` / `-large` 都是独立条目
3. **永远引用 token**：不要硬编码 hex 或 px
4. **不要文档化 hover**：只写 Default + Active/Pressed
5. **价格永远 tabular-nums**
6. **阴影只用 2 种**：card + product
7. **不确定时**：优先用 surface 颜色变化，再考虑加阴影

---

## Known Gaps

- ❌ 表单错误态未定义（后续补）
- ❌ Loading 动画未具体（只有文字版）
- ❌ Toast/Modal 组件未定义
- ❌ 空购物车状态未细化
- ❌ 暗色模式未设计（暂不考虑）

---

## Token 速查

### 颜色
| 用途 | Token | 值 |
|---|---|---|
| 主色 | `{colors.primary}` | #2858F8 |
| 主色 hover | `{colors.primary-hover}` | #3470FF |
| 主色 focus | `{colors.primary-focus}` | #1A40C8 |
| 主色 on dark | `{colors.primary-on-dark}` | #5C8BFF |
| 标题文字 | `{colors.ink}` | #1A1A2E |
| 正文文字 | `{colors.ink}` | #1A1A2E |
| 副文字 | `{colors.body-muted}` | #666666 |
| 画布 | `{colors.canvas-parchment}` | #FAF5F0 |
| 卡片 | `{colors.canvas}` | #FFFFFF |
| 边线 | `{colors.hairline}` | #E8E8EC |

### 圆角
| 用途 | Token | 值 |
|---|---|---|
| 按钮 | `{rounded.pill}` | 9999rpx |
| 卡片 | `{rounded.md}` | 16rpx |
| 缩略图 | `{rounded.sm}` | 8rpx |
| 满屏 | `{rounded.none}` | 0 |

### 阴影
| 用途 | Token | 值 |
|---|---|---|
| 卡片 | `{shadow.card}` | 0 2rpx 8rpx rgba(0,0,0,0.04) |
| 商品图 | `{shadow.product}` | 0 4rpx 16rpx rgba(0,0,0,0.08) |

---

**主色固定 `#2858F8` 不变。**  
**设计哲学：克制、统一、可读。**

---

*Adapted from Apple DESIGN.md v1.0 · 2026-06-25*