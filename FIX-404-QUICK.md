# ⚡ Fix 404 - Quick Guide

## ❌ Vấn đề
```
404: NOT_FOUND
Code: NOT_FOUND
```

## ✅ Giải pháp nhanh nhất

### 🎯 Deploy lên Cloudflare Pages (5 phút)

1. **Vào:** https://dash.cloudflare.com
2. **Click:** Workers & Pages → Create → Pages → Connect Git
3. **Chọn:** Repository của bạn
4. **Config:**
   ```
   Build command: npm run build
   Build output: .output/public
   ```
5. **Deploy!**

**Done!** ✨ Không còn 404!

---

## 🔧 Nếu muốn dùng Vercel

### Bước 1: Commit code mới
```bash
git add .
git commit -m "Add Vercel adapter"
git push
```

### Bước 2: Test build local
```bash
# Windows
.\test-build.ps1

# Mac/Linux
bash test-build.sh
```

### Bước 3: Deploy
```bash
vercel --prod --force
```

### Bước 4: Check logs
- Vào Vercel Dashboard
- Deployments → Latest → Function Logs
- Xem có error gì

---

## 💡 Tại sao bị 404?

Dự án dùng **Cloudflare Workers adapter** nhưng deploy lên **Vercel**.

**Giải pháp:**
- ✅ Deploy Cloudflare Pages (đơn giản)
- ⚠️ Dùng adapter cho Vercel (phức tạp)

---

## 🚀 Khuyến nghị

**Dùng Cloudflare Pages:**
- ✅ Không cần thay đổi code
- ✅ Build nhanh (1-2 phút)
- ✅ Unlimited bandwidth
- ✅ Không bị 404
- ✅ Miễn phí

**Chi tiết:** Xem file `FIX-404-VERCEL.md`

---

## 📞 Cần giúp?

1. Test build: `.\test-build.ps1` (Windows) hoặc `bash test-build.sh` (Mac/Linux)
2. Xem logs: Vercel Dashboard → Function Logs
3. Đọc chi tiết: `FIX-404-VERCEL.md`

---

**TL;DR:** Deploy lên Cloudflare Pages thay vì Vercel = Fix 404 ngay! 🎉
