# 🚀 Deploy lên Vercel với CORS

## ✅ Domain của bạn đã được cấu hình

Domain `https://modern-car-showroom.vercel.app` đã được cho phép (cùng với mọi domain khác).

## 📋 Checklist Deploy

### 1. Commit và Push code

```bash
git add .
git commit -m "Add CORS configuration for all domains"
git push
```

### 2. Deploy lên Vercel

**Option A: Auto Deploy (Khuyến nghị)**
- Vercel sẽ tự động deploy khi bạn push code lên Git
- Đợi vài phút để build hoàn thành

**Option B: Manual Deploy**
```bash
npm install -g vercel
vercel --prod
```

### 3. Xóa Cache (Quan trọng!)

Sau khi deploy, xóa cache để áp dụng config mới:

**Trong Vercel Dashboard:**
1. Vào project → Settings → Data Cache
2. Click "Purge Everything"

**Hoặc dùng CLI:**
```bash
vercel --prod --force
```

### 4. Test CORS

**Option A: Dùng Node.js script**
```bash
node test-cors.js https://modern-car-showroom.vercel.app
```

**Option B: Dùng Browser**
1. Mở `test-cors.html` trong browser
2. Nhập: `https://modern-car-showroom.vercel.app`
3. Click "Test CORS"

**Option C: Dùng curl**
```bash
# Test preflight
curl -X OPTIONS \
  -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: GET" \
  -i \
  https://modern-car-showroom.vercel.app

# Test GET
curl -X GET \
  -H "Origin: https://example.com" \
  -i \
  https://modern-car-showroom.vercel.app
```

## 🔍 Verify CORS Headers

Sau khi deploy, check response headers:

```bash
curl -I https://modern-car-showroom.vercel.app
```

Bạn sẽ thấy:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin
Access-Control-Allow-Credentials: true
```

## 🧪 Test từ Domain khác

Mở Console (F12) trên bất kỳ website nào và chạy:

```javascript
fetch('https://modern-car-showroom.vercel.app')
  .then(res => {
    console.log('✅ CORS works!');
    console.log('Headers:', {
      origin: res.headers.get('Access-Control-Allow-Origin'),
      methods: res.headers.get('Access-Control-Allow-Methods'),
    });
    return res.text();
  })
  .then(html => console.log('Got HTML:', html.substring(0, 100)))
  .catch(err => console.error('❌ CORS failed:', err));
```

## 🚨 Troubleshooting

### Vẫn bị CORS error?

**1. Clear Browser Cache**
```
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```

**2. Hard Refresh**
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

**3. Check Vercel Logs**
- Vào Vercel Dashboard → Deployments
- Click vào deployment mới nhất
- Check "Build Logs" và "Function Logs"

**4. Verify Build Output**
- Check file `vercel.json` có trong build không
- Check `src/server.ts` đã được compile

**5. Redeploy**
```bash
vercel --prod --force
```

### CORS works nhưng 404?

Có thể do routing issue. Check:
1. File `public/_routes.json` có trong build không
2. Vercel có detect đúng framework không

### OPTIONS request bị block?

Vercel có thể cache OPTIONS response. Fix:
1. Purge cache trong Vercel Dashboard
2. Thêm `Access-Control-Max-Age` header (đã có)

## 📊 Expected Results

Sau khi deploy thành công:

✅ **Preflight (OPTIONS)**
```
Status: 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
```

✅ **GET Request**
```
Status: 200 OK
Access-Control-Allow-Origin: *
Content-Type: text/html
```

✅ **Security Headers**
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
```

## 🎯 Next Steps

1. ✅ Deploy code lên Vercel
2. ✅ Purge cache
3. ✅ Test CORS với script
4. ✅ Test từ domain khác
5. ✅ Verify trong production

## 💡 Tips

- **Auto Deploy:** Mỗi lần push code, Vercel tự động deploy
- **Preview URLs:** Mỗi PR có preview URL riêng
- **Environment Variables:** Set trong Vercel Dashboard nếu cần
- **Custom Domain:** Add trong Settings → Domains

## 📞 Support

Nếu vẫn gặp vấn đề:
1. Check Vercel logs
2. Run `node test-cors.js`
3. Check browser console (F12)
4. Verify `vercel.json` syntax

---

**Domain của bạn:** https://modern-car-showroom.vercel.app
**Status:** ✅ Đã được cấu hình CORS cho mọi domain
