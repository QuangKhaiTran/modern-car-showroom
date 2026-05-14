# 🌐 CORS Configuration - Mở cho mọi domain

## ✅ Đã cấu hình

Dự án đã được setup để **chấp nhận request từ bất kỳ domain nào**.

### 1. Server-side CORS (src/server.ts)

```typescript
// ✅ Tự động thêm CORS headers vào mọi response
Access-Control-Allow-Origin: * (hoặc origin cụ thể)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
```

**Tính năng:**
- ✅ Handle preflight OPTIONS requests
- ✅ Tự động detect origin và set header phù hợp
- ✅ Support credentials (cookies, auth headers)
- ✅ Cache preflight response 24h

### 2. Platform-specific Headers

**Cloudflare Pages & Netlify:**
- File: `public/_headers`
- Tự động apply headers cho static files

**Vercel:**
- File: `vercel.json`
- Config headers trong JSON

**Netlify:**
- File: `netlify.toml`
- Config headers + redirects

### 3. Security Headers

Ngoài CORS, còn có security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 🧪 Test CORS

### Cách 1: Dùng file test-cors.html

1. Mở file `test-cors.html` trong browser
2. Nhập URL website đã deploy
3. Click "Test CORS"

### Cách 2: Dùng JavaScript Console

```javascript
// Test từ bất kỳ website nào
fetch('https://your-domain.com')
  .then(res => {
    console.log('CORS Headers:', {
      origin: res.headers.get('Access-Control-Allow-Origin'),
      methods: res.headers.get('Access-Control-Allow-Methods'),
      headers: res.headers.get('Access-Control-Allow-Headers'),
    });
    return res.text();
  })
  .then(html => console.log('Success!'))
  .catch(err => console.error('CORS Error:', err));
```

### Cách 3: Dùng curl

```bash
# Test preflight
curl -X OPTIONS \
  -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: GET" \
  -i \
  https://your-domain.com

# Test actual request
curl -X GET \
  -H "Origin: https://example.com" \
  -i \
  https://your-domain.com
```

## 🔧 Tùy chỉnh CORS

### Giới hạn domains cụ thể

Sửa trong `src/server.ts`:

```typescript
function addSecurityHeaders(response: Response, origin: string): Response {
  const headers = new Headers(response.headers);
  
  // Whitelist domains
  const allowedOrigins = [
    'https://domain1.com',
    'https://domain2.com',
    'https://domain3.com'
  ];
  
  if (allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  } else {
    // Không set header = block request
  }
  
  // ... rest of headers
}
```

### Giới hạn methods

```typescript
headers.set("Access-Control-Allow-Methods", "GET, POST"); // Chỉ GET và POST
```

### Tắt credentials

```typescript
// Xóa dòng này:
headers.set("Access-Control-Allow-Credentials", "true");
```

## 📋 Checklist sau khi deploy

- [ ] Test CORS từ domain khác
- [ ] Test preflight OPTIONS request
- [ ] Check CORS headers trong Network tab
- [ ] Test với POST/PUT/DELETE methods
- [ ] Test với custom headers (Authorization, etc.)
- [ ] Verify security headers

## 🚨 Troubleshooting

### Lỗi: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Nguyên nhân:**
- Server chưa trả về CORS headers
- Build chưa include file cấu hình

**Giải pháp:**
1. Check build output có file `_headers` không
2. Verify `src/server.ts` đã được build
3. Clear cache và deploy lại

### Lỗi: "CORS policy: Response to preflight request doesn't pass"

**Nguyên nhân:**
- OPTIONS request không được handle

**Giải pháp:**
- Verify code handle OPTIONS trong `src/server.ts`
- Check platform có block OPTIONS không

### Lỗi: "CORS policy: Credentials flag is true, but Access-Control-Allow-Credentials is not"

**Nguyên nhân:**
- Request có credentials nhưng server không allow

**Giải pháp:**
- Thêm `Access-Control-Allow-Credentials: true` header
- Hoặc remove credentials từ request

## 📚 Resources

- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Cloudflare Pages Headers](https://developers.cloudflare.com/pages/platform/headers/)
- [Vercel Headers](https://vercel.com/docs/concepts/projects/project-configuration#headers)
- [Netlify Headers](https://docs.netlify.com/routing/headers/)

## ✨ Summary

Dự án đã sẵn sàng để:
- ✅ Deploy trên bất kỳ platform nào
- ✅ Chấp nhận request từ mọi domain
- ✅ Handle CORS preflight requests
- ✅ Có security headers cơ bản
- ✅ Cache static assets hiệu quả
