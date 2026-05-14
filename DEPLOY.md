# 🚀 Hướng dẫn Deploy

Dự án này được thiết kế cho **Cloudflare Pages** (không phải Vercel).

## ✅ Deploy lên Cloudflare Pages

### Cách 1: Qua Dashboard (Đơn giản nhất)

1. **Đăng nhập Cloudflare Dashboard**
   - Truy cập: https://dash.cloudflare.com
   - Vào **Workers & Pages** → **Create application** → **Pages**

2. **Connect Git Repository**
   - Chọn repository GitHub/GitLab của bạn
   - Authorize Cloudflare

3. **Cấu hình Build**
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: .output/public
   Root directory: /
   ```

4. **Environment Variables** (nếu cần)
   - Thêm các biến môi trường nếu có

5. **Deploy**
   - Click "Save and Deploy"
   - Đợi vài phút để build và deploy

### Cách 2: Qua Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Build
npm run build

# Deploy
wrangler pages deploy .output/public --project-name=your-project-name
```

## 🔧 Tại sao không dùng Vercel?

Dự án này sử dụng:
- `@lovable.dev/vite-tanstack-config` với Cloudflare adapter
- `@cloudflare/vite-plugin` 
- Cloudflare Workers runtime
- `wrangler.jsonc` config

Để deploy Vercel, bạn cần:
1. Xóa `@cloudflare/vite-plugin`
2. Thay đổi `vite.config.ts`
3. Thay đổi `src/server.ts` (hiện dùng Cloudflare Workers API)
4. Cài đặt Node.js adapter

→ **Khuyến nghị: Dùng Cloudflare Pages** (miễn phí, nhanh, phù hợp với cấu hình hiện tại)

## 🎯 Sau khi Deploy

- URL sẽ có dạng: `https://your-project.pages.dev`
- Có thể add custom domain
- Tự động deploy khi push code lên Git
- Preview deployments cho mỗi PR

## 🆓 Cloudflare Pages Free Plan

- Unlimited requests
- Unlimited bandwidth
- 500 builds/month
- 1 build at a time
- Hoàn toàn đủ cho production!
