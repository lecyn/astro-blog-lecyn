# Third-Party Notices

本项目包含改编自以下开源项目的代码，特此声明。

## Mizuki

- 来源：https://github.com/LyraVoid/Mizuki
- 许可证：Apache License 2.0
- 版权：Copyright 2025 Matsuzaka Yuki
- 用途：以下功能与实现改编自 Mizuki 项目。

受影响的文件：

- `src/plugins/rehype-code-language.ts` — 代码块语言信息提取（对应 Mizuki 的 `language-badge.ts`）
- `src/components/TableOfContents.astro` — 文章目录组件（滑动指示器、序号徽章、滚动高亮逻辑）
- `src/components/Sidebar.astro` — 打字机效果（对应 Mizuki 的 `TypewriterText.astro`）
- `src/layouts/BlogPost.astro` — 图片灯箱、代码块复制按钮与语言标签

上述文件依据 Apache License 2.0 的条款改编并修改，保留原版权声明。

---

## Fuwari（Mizuki 的上游）

Mizuki 基于 [Fuwari](https://github.com/saicaca/fuwari) 开发，Fuwari 使用 MIT 许可证。

### Fuwari MIT License

MIT License

Copyright (c) 2023 saicaca

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
