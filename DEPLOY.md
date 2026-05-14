# 🚀 Hướng dẫn Deploy - Hỗ trợ mọi platform

Dự án này đã được cấu hình để deploy trên **bất kỳ platform nào** với CORS mở cho tất cả domains.

## ✅ Các Platform được hỗ trợ

### 1. Cloudflare Pages (Khuyến nghị - Nhanh nhất)

**Qua Dashboard:**
1. Truy cập: https://dash.cloudflare.com
2. Workers & Pages → Create → Pages → Connect Git
3. Cấu hình:
   ```
   Build command: npm run build
   Build output: .output/public
   ```
4. Deploy!

**Qua CLI:**
```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy .output/public --project-name=your-project
```

### 2. Vercel

**Qua Dashboard:**
1. Import project từ Git
2. Framework: Other
3. Build command: `npm run build`
4. Output directory: `.output/public`
5. Deploy!

**Qua CLI:**
```bash
npm install -g vercel
vercel
```

### 3. Netlify

**Qua Dashboard:**
1. Import project từ Git
2. Build command: `npm run build`
3. Publish directory: `.output/public`
4. Deploy!

**Qua CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 4. Railway / Render / Fly.io

Tất cả đều tương thích! Chỉ cần:
- Build command: `npm run build`
- Output: `.output/public`

## 🌐 CORS Configuration

Dự án đã được cấu hình để **chấp nhận request từ mọi domain**:

✅ `Access-Control-Allow-Origin: *`
✅ `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH`
✅ `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`

### Các file cấu hình CORS:

- **src/server.ts** - CORS middleware cho SSR
- **public/_headers** - Headers cho Cloudflare Pages & Netlify
- **vercel.json** - Headers cho Vercel
- **netlify.toml** - Config cho Netlify

## 🔒 Security Headers

Ngoài CORS, dự án cũng có các security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 🎯 Custom Domain

Sau khi deploy, bạn có thể add custom domain:

**Cloudflare Pages:**
- Custom Domains → Add domain → Follow DNS instructions

**Vercel:**
- Settings → Domains → Add domain

**Netlify:**
- Domain settings → Add custom domain

## 🆓 So sánh Free Plans

| Platform | Bandwidth | Builds/month | Build time |
|----------|-----------|--------------|------------|
| Cloudflare Pages | Unlimited | 500 | Fast ⚡ |
| Vercel | 100GB | Unlimited | Medium |
| Netlify | 100GB | 300 min | Medium |

## 🧪 Test CORS

Sau khi deploy, test CORS bằng:

```javascript
// Từ bất kỳ domain nào
fetch('https://your-domain.com/api/endpoint')
  .then(res => res.json())
  .then(data => console.log(data))
```

Hoặc dùng curl:
```bash
curl -H "Origin: https://example.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://your-domain.com
```

## 🔧 Tùy chỉnh CORS

Nếu muốn giới hạn domains cụ thể, sửa trong `src/server.ts`:

```typescript
// Thay vì:
headers.set("Access-Control-Allow-Origin", origin || "*");

// Dùng:
const allowedOrigins = ["https://domain1.com", "https://domain2.com"];
if (allowedOrigins.includes(origin)) {
  headers.set("Access-Control-Allow-Origin", origin);
}
```

## 📞 Support

Nếu gặp vấn đề khi deploy, check:
1. Build logs trên platform
2. Browser console (F12)
3. Network tab để xem CORS headers

