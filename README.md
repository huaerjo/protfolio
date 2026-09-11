# 戴金菊 · 个人设计作品集

已恢复 2026-09-08 的 React + Vite 版本。

## 运行

```sh
pnpm install
pnpm dev
```

打开 http://localhost:3000 。运行 `pnpm build` 生成 dist。

- `src/main.jsx`：首页、六个项目、案例浏览、分类筛选及联系方式。
- `src/style.css`：桌面和移动端样式。
- `public/images/`：原作品集图片。
- `public/portfolio.pdf`：完整作品集下载。
- `backups/static-2026-09-09/`：今天静态版的备份。

## Figma 高清素材（2026-09-09）

61 页图片已替换为 Figma 导出的原尺寸图片，使用无损 WebP；首页另用 1200px 轻量封面。原始 PNG 位于 `tmp/figma-originals/`，原 PDF 图片备份位于 `backups/pdf-images/`。

页面对应表在 `scripts/figma-page-map.json`，图片处理脚本为 `scripts/prepare-figma-images.py`。详情图片尺寸信息在 `src/image-dimensions.json`，防止加载时布局跳动。下载的 PDF 保持原文件。

## 全屏基础版（2026-09-09）

模块顺序：首页 Hero → 个人经历 → 精选项目 → 个人优势 → 联系收尾。身份为 UI 设计师 / AI 设计师 / 交互设计师，使用用户确认的 13 年经验。

`src/style.css` 顶部的 `--max-width:1700px` 控制桌面版心。首页背景使用 `public/video/hero-ambient.webm`，静态封面为 `hero-poster.png`，可直接替换同路径素材；调整格式时同步修改 `src/main.jsx` 中的 source 类型。视频支持暂停，减少动态效果偏好下默认暂停。

上一版源码备份在 `backups/before-fullscreen-20260909/`。
