import { execSync } from 'child_process';
import { cpSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Clean previous build
const vercelOutput = join(rootDir, '.vercel/output');
if (existsSync(vercelOutput)) {
  rmSync(vercelOutput, { recursive: true, force: true });
}

// Build the app
console.log('📦 Building TanStack Start app...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

// Create Vercel output structure
const staticDir = join(vercelOutput, 'static');
const functionsDir = join(vercelOutput, 'functions');

mkdirSync(staticDir, { recursive: true });
mkdirSync(functionsDir, { recursive: true });

// Copy static assets from .output/public
console.log('📁 Copying static assets...');
const outputPublic = join(rootDir, '.output/public');
if (existsSync(outputPublic)) {
  cpSync(outputPublic, staticDir, { recursive: true, filter: (src) => {
    // Don't copy server files
    return !src.includes('server');
  }});
}

// Create server function for SSR
console.log('⚙️  Creating server function...');
const indexFuncDir = join(functionsDir, 'index.func');
mkdirSync(indexFuncDir, { recursive: true });

// Copy server output
const serverOutput = join(rootDir, '.output/server');
if (existsSync(serverOutput)) {
  cpSync(serverOutput, join(indexFuncDir, 'server'), { recursive: true });
}

// Copy node_modules (only necessary ones)
console.log('📚 Copying dependencies...');
const nodeModules = join(rootDir, 'node_modules');
const funcNodeModules = join(indexFuncDir, 'node_modules');
if (existsSync(nodeModules)) {
  // Copy only @tanstack packages and other essentials
  const essentialPackages = [
    '@tanstack',
    'react',
    'react-dom',
    '@radix-ui',
    'vinxi'
  ];
  
  mkdirSync(funcNodeModules, { recursive: true });
  
  essentialPackages.forEach(pkg => {
    const pkgPath = join(nodeModules, pkg);
    if (existsSync(pkgPath)) {
      cpSync(pkgPath, join(funcNodeModules, pkg), { recursive: true });
    }
  });
}

// Create function config
writeFileSync(
  join(indexFuncDir, '.vc-config.json'),
  JSON.stringify({
    runtime: 'nodejs20.x',
    handler: 'index.mjs',
    launcherType: 'Nodejs',
    supportsResponseStreaming: true
  }, null, 2)
);

// Create function handler
writeFileSync(
  join(indexFuncDir, 'index.mjs'),
  `export default async function handler(req) {
  try {
    const { default: server } = await import('./server/index.js');
    
    // Convert Vercel request to standard Request
    const url = new URL(req.url, \`https://\${req.headers.host}\`);
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
    
    // Call the server handler
    const response = await server.fetch(request, {}, {});
    
    return response;
  } catch (error) {
    console.error('Server error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
`
);

// Create Vercel config with proper routing
writeFileSync(
  join(vercelOutput, 'config.json'),
  JSON.stringify({
    version: 3,
    routes: [
      // Static assets
      {
        src: '^/assets/(.*)$',
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
        continue: true
      },
      // Try static files first
      { handle: 'filesystem' },
      // Everything else goes to SSR
      {
        src: '/(.*)',
        dest: '/index'
      }
    ]
  }, null, 2)
);

console.log('✅ Vercel build complete!');
console.log('📤 Ready to deploy with: vercel deploy');
