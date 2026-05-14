# 🔄 Migrate từ Cloudflare sang Vercel

## ⚠️ Cảnh báo
Việc này phức tạp và không khuyến nghị. Cloudflare Pages tốt hơn cho dự án này.

## Các bước cần làm:

### 1. Xóa Cloudflare dependencies
```bash
npm uninstall @cloudflare/vite-plugin
```

### 2. Thay đổi vite.config.ts
```typescript
import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  server: {
    preset: 'vercel'
  }
})
```

### 3. Thay đổi src/server.ts
Xóa Cloudflare Workers API, dùng Node.js API

### 4. Xóa wrangler.jsonc

### 5. Tạo vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public"
}
```

### 6. Test local
```bash
npm run build
npm run preview
```

## ❌ Nhược điểm:
- Mất nhiều thời gian
- Có thể gặp lỗi khó debug
- Phải maintain 2 codebase khác nhau

## ✅ Khuyến nghị:
**Dùng Cloudflare Pages** - đơn giản, nhanh, miễn phí!
