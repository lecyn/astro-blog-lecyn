# Lecyn's Blog

一个基于 [Astro](https://astro.build) 构建的个人博客，部署在 [Cloudflare Workers](https://developers.cloudflare.com/workers/) 上，记录编程学习、技术探索与个人成长。

[![Astro](https://img.shields.io/badge/Astro-5.16.9-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[**🖥️ 在线访问**](https://blog.lecyn.cn/)

## ✨ 功能特性

- ✅ 基于 Astro + TypeScript，静态站点生成，性能优异
- ✅ Markdown & MDX 支持，GitHub 风格语法（GFM，`remark-gfm`）
- ✅ 自定义代码块语言标注插件（`src/plugins/rehype-code-language`）
- ✅ 三种内容集合：博客（blog）、笔记（notes）、分享（shares）
- ✅ SEO 友好：canonical URL、OpenGraph、JSON-LD 结构化数据（WebSite / Person / BreadcrumbList）
- ✅ 站点地图（sitemap）与 RSS 订阅支持
- ✅ 响应式设计，明暗主题与自定义主题色
- ✅ 侧边栏与文章目录（Table of Contents）
- ✅ 内置 Cloudflare Observability 日志

## 🛠 技术栈

- [Astro](https://astro.build) — 静态站点框架
- [TypeScript](https://www.typescriptlang.org/) — 类型安全
- [MDX](https://mdxjs.com/) — 组件化 Markdown
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) — 部署平台（`@astrojs/cloudflare` 适配器）
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — Cloudflare CLI

## 🚀 项目结构

```
.
├── public/                 # 静态资源（字体、图片等）
├── src/
│   ├── components/         # Astro 组件（Header、Sidebar、Footer 等）
│   ├── content/            # 内容集合
│   │   ├── blog/           # 博客文章（.md / .mdx）
│   │   ├── notes/          # 笔记
│   │   └── shares/         # 分享
│   ├── data/               # 站点数据（如 intros.json）
│   ├── layouts/            # 页面布局
│   ├── pages/              # 路由页面
│   │   ├── blog/           # /blog
│   │   ├── notes/          # /notes
│   │   ├── share/          # /share
│   │   └── rss.xml.js      # RSS 订阅
│   ├── plugins/            # 自定义 Markdown/Rehype 插件
│   ├── styles/             # 全局样式
│   ├── consts.ts           # 站点常量（标题、描述、作者等）
│   └── content.config.ts   # 内容集合 Schema 定义
├── astro.config.mjs        # Astro 配置
├── wrangler.json           # Cloudflare Workers 配置
└── package.json
```

## 🧞 快速开始

所有命令均在项目根目录运行：

| 命令                        | 操作                                                     |
| :-------------------------- | :------------------------------------------------------- |
| `npm install`               | 安装依赖                                                 |
| `npm run dev`               | 启动本地开发服务器（`localhost:4321`）                   |
| `npm run build`             | 构建生产站点到 `./dist/`                                 |
| `npm run preview`           | 本地预览生产构建（`astro build && wrangler dev`）        |
| `npm run deploy`            | 部署到 Cloudflare Workers                                 |
| `npm run check`             | 构建、类型检查并演练部署（`astro build && tsc && wrangler deploy --dry-run`） |
| `npm run cf-typegen`        | 生成 Cloudflare 类型定义（`wrangler types`）             |
| `npm run astro ...`         | 运行 Astro CLI 命令，如 `astro add`、`astro check`       |

## 📝 内容管理

文章存放在 `src/content/` 下的三个集合目录中，使用 `.md` 或 `.mdx` 文件：

| 集合 | 目录                  | 路由          |
| :--- | :-------------------- | :------------ |
| 博客 | `src/content/blog/`   | `/blog/...`   |
| 笔记 | `src/content/notes/`  | `/notes/...`  |
| 分享 | `src/content/shares/` | `/share/...`  |

Frontmatter 字段（见 `src/content.config.ts`）：

```markdown
---
title: 文章标题        # 必填
description: 文章摘要   # 必填
pubDate: 2026-08-14    # 必填，发布日期
updatedDate: 2026-08-15 # 可选，更新日期
heroImage: /path/to/image # 可选，封面图
---
```

站点的标题、描述、作者等全局信息在 `src/consts.ts` 中配置。静态资源放在 `public/` 目录下。

## 🚀 部署

本项目使用 `@astrojs/cloudflare` 适配器部署到 Cloudflare Workers：

```bash
npm run deploy
```

站点地址与部署相关配置见 `astro.config.mjs`（`site` 字段）和 `wrangler.json`。

## 📄 许可证

本项目基于 [Apache License 2.0](LICENSE) 开源。

### 第三方软件声明

部分代码改编自 [Mizuki](https://github.com/LyraVoid/Mizuki)（Apache License 2.0），涉及代码块语言提取、文章目录、打字机效果与图片灯箱等功能。原版权声明与完整许可证文本保留在 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 中。

本模板源自 Cloudflare 的 [astro-blog-starter-template](https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template)，其灵感来自 [Bear Blog](https://github.com/HermanMartinus/bearblog/)。

## 🙏 致谢

- 感谢 [Mizuki](https://github.com/LyraVoid/Mizuki) 提供代码实现参考（Apache License 2.0）
- 感谢 [Fuwari](https://github.com/saicaca/fuwari) 作为 Mizuki 的上游模板（MIT License）
- 感谢 Cloudflare 的 [astro-blog-starter-template](https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template) 作为本项目的起点
- 感谢 [alcy.cc](https://t.alcy.cc/) 提供背景图片 API
