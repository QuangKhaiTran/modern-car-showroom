# 🔧 Fix lỗi 404 trên Vercel

## ❌ Vấn đề

Dự án dùng **Cloudflare Workers adapter** (`@lovable.dev/vite-tanstack-config`) nhưng deploy lên **Vercel** → Không tương thích → 404 error.

## ✅ Giải pháp

### Option 1: Deploy lên Cloudflare Pages (Khuyến nghị ⭐)

Đây là cách **đơn giản nhất** vì dự án đã được config sẵn cho Cloudflare.

#### Bước 1: Tạo account Cloudflare
1. Truy cập: https://dash.cloudflare.com
2. Đăng ký/Đăng nhập (miễn phí)

#### Bước 2: Connect Git Repository
1. Vào **Workers & Pages**
2. Click **Create application**
3. Chọn **Pages** tab
4. Click **Connect to Git**
5. Authorize Cloudflare với GitHub/GitLab
6. Chọn repository của bạn

#### Bước 3: Cấu hình Build
```
Framework preset: None
Build command: npm run build
Build output directory: .output/public
Root directory: (leave empty)
Node version: 20
```

#### Bước 4: Deploy
- Click **Save and Deploy**
- Đợi 2-3 phút
- Done! ✅

#### Kết quả:
- URL: `https://your-project.pages.dev`
- Có thể add custom domain
- Auto deploy khi push code
- **KHÔNG BỊ 404!** ✨

---

### Option 2: Fix Vercel (Phức tạp hơn)

Nếu bạn nhất định muốn dùng Vercel:

#### Đã làm:
- ✅ Tạo `api/index.js` - Vercel serverless function
- ✅ Cập nhật `vercel.json` - Routing config
- ✅ Adapter Cloudflare Workers → Vercel

#### Cần làm thêm:

**1. Commit và push code mới:**
```bash
git add .
git commit -m "Add Vercel adapter for Cloudflare Workers"
git push
```

**2. Trong Vercel Dashboard:**
- Settings → General → Node.js Version → **20.x**
- Settings → General → Build & Development Settings:
  ```
  Framework Preset: Other
  Build Command: npm run build
  Output Directory: dist/client
  Install Command: npm install
  ```

**3. Redeploy:**
```bash
vercel --prod --force
```

**4. Check logs:**
- Deployments → Latest → Function Logs
- Xem có error gì không

#### Nếu vẫn 404:

**Debug steps:**

1. **Check build output:**
```bash
# Local test
npm run build
ls dist/server/
ls dist/client/
ls api/
```

2. **Verify API function:**
- Vercel Dashboard → Functions
- Phải thấy `api/index.js` trong list

3. **Test API directly:**
```bash
curl https://modern-car-showroom.vercel.app/api/index
```

4. **Check routing:**
- Verify `vercel.json` có trong deployment
- Check rewrite rules

---

## 🎯 So sánh 2 Options

| Feature | Cloudflare Pages | Vercel |
|---------|------------------|--------|
| Setup | ✅ Đơn giản | ⚠️ Phức tạp |
| Tương thích | ✅ Native | ⚠️ Cần adapter |
| Build time | ⚡ 1-2 phút | 🐌 3-5 phút |
| Bandwidth | ✅ Unlimited | ⚠️ 100GB/month |
| 404 errors | ✅ Không có | ❌ Có thể có |
| Cost | 💰 Free | 💰 Free (limited) |

## 💡 Khuyến nghị

### ⭐ Dùng Cloudflare Pages vì:
1. ✅ Dự án đã config sẵn
2. ✅ Không cần thay đổi code
3. ✅ Build nhanh hơn
4. ✅ Unlimited bandwidth
5. ✅ Không bị 404
6. ✅ Đơn giản hơn nhiều

### ⚠️ Chỉ dùng Vercel nếu:
- Bạn đã có Vercel Pro account
- Cần tích hợp với Vercel ecosystem
- Sẵn sàng debug và maintain adapter

---

## 🚀 Quick Start - Cloudflare Pages

```bash
# 1. Build local để test
npm run build

# 2. Push code lên Git
git push

# 3. Vào Cloudflare Dashboard
# https://dash.cloudflare.com

# 4. Workers & Pages → Create → Pages → Connect Git

# 5. Chọn repo và config:
#    Build command: npm run build
#    Output: .output/public

# 6. Deploy!
```

**Thời gian:** 5 phút
**Kết quả:** Website chạy ngon, không 404! ✨

---

## 📞 Cần giúp?

### Cloudflare Pages:
- Docs: https://developers.cloudflare.com/pages/
- Discord: https://discord.gg/cloudflaredev

### Vercel:
- Check `api/index.js` có được deploy không
- Check Function Logs trong Dashboard
- Verify `vercel.json` syntax

---

## ✅ Checklist

### Cloudflare Pages:
- [ ] Tạo Cloudflare account
- [ ] Connect Git repository
- [ ] Config build settings
- [ ] Deploy
- [ ] Test website
- [ ] ✨ No 404!

### Vercel (nếu cần):
- [ ] Commit code mới
- [ ] Push to Git
- [ ] Update Vercel settings
- [ ] Redeploy
- [ ] Check Function Logs
- [ ] Debug nếu cần

---

**Khuyến nghị cuối cùng:** Dùng Cloudflare Pages! Đơn giản, nhanh, không lỗi. 🚀
