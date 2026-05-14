// Vercel Serverless Function for TanStack Start with Cloudflare Workers adapter
export default async function handler(req, res) {
  try {
    // Import the Cloudflare Workers server
    const serverModule = await import('../dist/server/index.js');
    const server = serverModule.default;

    // Convert Vercel request to Cloudflare Workers Request
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url || '/', `${protocol}://${host}`);

    // Create a proper Request object
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value) headers.set(key, Array.isArray(value) ? value[0] : value);
    });

    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      }
    }

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
    });

    // Call the Cloudflare Workers fetch handler
    const response = await server.fetch(request, {}, {
      waitUntil: () => {},
      passThroughOnException: () => {},
    });

    // Convert Response to Vercel response
    res.status(response.status);

    // Copy headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send body
    if (response.body) {
      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Vercel function error:', error);
    
    res.status(500).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>500 - Server Error</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
            .error-container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 500px;
            }
            h1 { color: #e53e3e; margin: 0 0 1rem; }
            p { color: #666; margin: 0.5rem 0; }
            .error-details {
              margin-top: 1rem;
              padding: 1rem;
              background: #f7fafc;
              border-radius: 4px;
              font-family: monospace;
              font-size: 0.875rem;
              text-align: left;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>500 - Internal Server Error</h1>
            <p>Đã xảy ra lỗi khi xử lý request của bạn.</p>
            <p>Vui lòng thử lại sau hoặc liên hệ support.</p>
            <div class="error-details">
              ${error.message || 'Unknown error'}
            </div>
          </div>
        </body>
      </html>
    `);
  }
}

