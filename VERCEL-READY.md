# ✅ Sẵn sàng deploy lên Vercel!

## 📦 Đã chuẩn bị

- ✅ `api/index.js` - Vercel serverless function
- ✅ `api/package.json` - ES modules config
- ✅ `vercel.json` - Routing và headers
- ✅ Build output: `dist/client` (static) + `dist/server` (SSR)
- ✅ CORS enabled cho mọi domain

## 🚀 Deploy ngay (3 bước)

### Bước 1: Commit và Push

```bash
git add .
git commit -m "Add Vercel adapter with CORS support"
git push
```

### Bước 2: Deploy

**Option A: Auto Deploy (Khuyến nghị)**
- Vercel sẽ tự động deploy khi bạn push
- Đợi 3-5 phút

**Option B: Manual Deploy**
```bash
# Install Vercel CLI (nếu chưa có)
npm install -g vercel

# Deploy
vercel --prod
```

### Bước 3: Verify

```bash
# Test CORS
node test-cors.js https://modern-car-showroom.vercel.app

# Hoặc test bằng curl
curl -I https://modern-car-showroom.vercel.app
```

## 🔧 Vercel Settings

Nếu cần config manual trong Dashboard:

### Build Settings
```
Framework Preset: Other
Build Command: npm run build
Output Directory: dist/client
Install Command: npm install
Node.js Version: 20.x
```

### Environment Variables
Không cần thiết lập gì thêm (trừ khi có API keys)

## 📊 Cấu trúc Build

```
dist/
├── client/          → Static files (HTML, CSS, JS, images)
│   ├── assets/
│   └── index.html
└── server/          → SSR server code
    ├── index.js     → Entry point
    └── assets/      → Server chunks

api/
└── index.js         → Vercel function (routes to server)
```

## 🌐 Routing

```
Request Flow:
1. User → https://modern-car-showroom.vercel.app/
2. Vercel → api/index.js (serverless function)
3. api/index.js → dist/server/index.js (SSR)
4. Response → User (with CORS headers)
```

## ✅ Expected Results

### Homepage (/)
```http
HTTP/2 200 OK
access-control-allow-origin: *
content-type: text/html
```

### API/Dynamic Routes
```http
HTTP/2 200 OK
access-control-allow-origin: *
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
```

### Static Assets (/assets/*)
```http
HTTP/2 200 OK
cache-control: public, max-age=31536000, immutable
access-control-allow-origin: *
```

## 🧪 Testing

### Test 1: Homepage
```bash
curl https://modern-car-showroom.vercel.app
```
Expected: HTML content

### Test 2: CORS Headers
```bash
curl -I https://modern-car-showroom.vercel.app
```
Expected: `access-control-allow-origin: *`

### Test 3: Preflight
```bash
curl -X OPTIONS \
  -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: GET" \
  https://modern-car-showroom.vercel.app
```
Expected: 204 with CORS headers

### Test 4: From Browser
```javascript
// Open console on any website
fetch('https://modern-car-showroom.vercel.app')
  .then(r => r.text())
  .then(h => console.log('✅ CORS works!'))
  .catch(e => console.error('❌ Failed:', e))
```

## 🚨 Troubleshooting

### Issue: Still 404

**Check:**
1. Vercel detected correct framework?
   - Dashboard → Settings → General → Framework Preset
   - Should be "Other" or auto-detected

2. Build output correct?
   - Dashboard → Deployments → Latest → Build Logs
   - Should see `dist/client` created

3. API function deployed?
   - Dashboard → Functions
   - Should see `api/index.js`

**Fix:**
```bash
# Force redeploy
vercel --prod --force

# Or in Dashboard
Deployments → Latest → ... → Redeploy
```

### Issue: 500 Error

**Check Function Logs:**
1. Dashboard → Deployments → Latest
2. Click on deployment
3. Functions → api/index.js → Logs

**Common causes:**
- Import path wrong (`dist/server/index.js`)
- ES modules not configured (`api/package.json`)
- Server code not built

**Fix:**
```bash
# Test build locally
npm run build
node -e "import('./dist/server/index.js').then(m => console.log(m))"
```

### Issue: CORS still blocked

**Check:**
1. Headers in response?
   ```bash
   curl -I https://modern-car-showroom.vercel.app | grep -i access-control
   ```

2. Vercel cache?
   - Dashboard → Settings → Data Cache → Purge

3. Browser cache?
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## 📈 Performance

### Expected Build Time
- First build: 3-5 minutes
- Subsequent builds: 2-3 minutes

### Expected Response Time
- Homepage: < 500ms
- API routes: < 300ms
- Static assets: < 100ms (CDN)

## 🎯 Success Checklist

- [ ] Code committed and pushed
- [ ] Vercel deployment started
- [ ] Build completed successfully
- [ ] No errors in Function Logs
- [ ] Homepage loads (200 OK)
- [ ] CORS headers present
- [ ] Can fetch from other domains
- [ ] Static assets cached properly

## 📞 Need Help?

### Check Logs
```bash
# Vercel CLI
vercel logs https://modern-car-showroom.vercel.app

# Or in Dashboard
Deployments → Latest → Function Logs
```

### Test Build Locally
```bash
# Windows
.\test-build.ps1

# Mac/Linux
bash test-build.sh
```

### Review Config
- `vercel.json` - Routing and headers
- `api/index.js` - Serverless function
- `api/package.json` - ES modules

## 🎉 After Successful Deploy

1. ✅ Test website: https://modern-car-showroom.vercel.app
2. ✅ Test CORS: `node test-cors.js https://modern-car-showroom.vercel.app`
3. ✅ Add custom domain (optional): Dashboard → Settings → Domains
4. ✅ Monitor: Dashboard → Analytics

---

**Domain:** https://modern-car-showroom.vercel.app
**Status:** Ready to deploy! 🚀
**CORS:** Enabled for all domains ✨

**Next:** Run `git push` and wait for Vercel to deploy!
