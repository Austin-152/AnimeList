# AnimeList

基于 Next.js 16 的现代动漫/视频发现与播放站点。支持带联想的快速搜索、趋势榜单、分集播放与进度记忆、以及基于 Logto 的安全登录。界面采用 Tailwind CSS + Ant Design，并配合 GSAP 动画，兼顾美观与性能。

- 输入联想搜索（防抖）
- 趋势榜单：按周期（日/周/月/总）与类型（电影/连续剧/综艺/动漫）
- 播放页：分集列表、键盘快捷键、Cookie 记忆上次观看进度
- 基于 Logto (@logto/next) 的登录与受保护 API
- 指定接口启用 RSA 公钥加密数据传输
- Next.js Images 远程图片白名单
- 技术栈：Next.js 16、React 19、TypeScript、Tailwind CSS、Ant Design、GSAP、Embla Carousel、Axios

## 技术栈

- 框架：Next.js 16（Pages Router）+ React 19 + TypeScript
- UI：Tailwind CSS、Ant Design、Embla Carousel、GSAP 动画
- 认证：Logto (@logto/next)
- 数据：Axios、SWR（可选）、带加密的自定义 API 层

## 快速开始

环境要求：
- Node.js 18+
- 至少一种包管理器：npm / pnpm / yarn / bun

安装依赖并启动开发服务：

```bash
# 安装依赖
npm install
# 或
pnpm install
# 或
yarn
# 或
bun install

# 启动开发服务
npm run dev
# 或
pnpm dev
# 或
yarn dev
# 或
bun dev
```

打开 http://localhost:3000。

## 环境变量

在项目根目录创建 .env.local 文件：

```bash
# 后端 API 基地址（前后端均可用）
NEXT_PUBLIC_BASE_URL=https://animeapi.rypro.me

# Logto（OIDC）配置
LOGTO_ENDPOINT=https://your-logto.example.com
LOGTO_APP_ID=your-app-id
LOGTO_APP_SECRET=your-app-secret
LOGTO_CALLBACK_URL=http://localhost:3000

# Cookie/Session 加密密钥（32+ 随机字符）
COOKIE_SECRET=replace_with_a_strong_random_string
```

说明：
- next.config.mjs 会将这些值映射为 Next.js 的运行时变量（BaseURL、Logto*）。本地开发建议使用 .env.local。
- 请在 Logto 控制台为该应用配置回调地址（Redirect URIs）：
  - http://localhost:3000/api/logto/callback
  - 登录/登出由 /api/logto/[action].ts 交由 @logto/next 处理。

## NPM 脚本

- dev：next dev
- build：next build
- start：next start
- lint：eslint .

## 目录结构（要点）

- src/pages
  - index.tsx：主页（动画 Hero + 搜索）
  - trending.tsx：排行榜（按周期与类型）
  - movies.tsx、series.tsx：内容分类页
  - search/[keyword].tsx：搜索结果页
  - video-page/[id].tsx：播放页（分集选择、快捷键、Cookie 进度）
  - api/
    - logto/[action].ts：Logto 登录/回调/登出路由
    - getUserInfo.ts：返回用户精简后的 claims；未登录返回 401
    - token.ts：登录后返回用 RSA 公钥加密的用户信息
- src/app/api/api.tsx：Axios 客户端与搜索/联想/详情/趋势等封装
- src/middlewares/cryptoMiddleware.ts：对特定接口加密请求体
- src/lib/logto.js：Logto 客户端配置
- src/lib/crypto.tsx：基于 node-forge 的 RSA 加密工具
- src/components：Navbar、Footer、SearchBox、Carousel、TrendingList 等
- public/：静态资源

## 核心流程

- 认证
  - /api/logto/[action] 由 @logto/next 统一处理（signin/callback/signout）。
  - /api/getUserInfo 用于检测登录态（未登录返回 401）。

- 搜索与联想
  - SearchBox 内置防抖，调用 fetchKeywordSuggestions 与后端对接；需要登录。

- 播放
  - /video-page/[id] 拉取详情并使用 iframe 播放（m3u8）。支持左右方向键切换分集，并通过 Cookie 记忆上次观看进度。

- 请求加密
  - 对 /api/query/ole/search、/api/query/ole/keyword、/api/query/ole/detail 三类请求，middleware 会拉取服务端公钥，用 RSA（OAEP）加密 payload，并发送 { timestamp, data } JSON。

## 开发提示

- 当前采用 Pages Router 路由。app/ 目录仅存放工具，不承载路由。
- next.config.mjs 已允许来自 olevod.tv 等域名的远程图片。
- Axios 的 baseURL 由 process.env.BaseURL 提供，映射自 NEXT_PUBLIC_BASE_URL。

## 部署

- 构建：`npm run build`
- 启动：`npm start`
- 可部署至 Vercel 或任意 Node 运行环境。

## 故障排查

- 搜索返回 401：请先通过 Logto 登录，并检查 Logto 配置是否正确。
- 环境变量未生效：修改 .env.local 后需重启开发服务。
- 图片无法显示：检查 next.config.mjs 中的 images.remotePatterns 是否包含目标域名。

## 许可协议

请根据需要添加开源协议（License）。未选择前建议保持仓库私有。
