#!/usr/bin/env node

/**
 * Quick CORS Test Script
 * Usage: node test-cors.js https://modern-car-showroom.vercel.app
 */

const url = process.argv[2] || 'https://modern-car-showroom.vercel.app';

console.log(`\n🧪 Testing CORS for: ${url}\n`);

// Test 1: Preflight OPTIONS request
async function testPreflight() {
  console.log('1️⃣  Testing Preflight (OPTIONS)...');
  try {
    const response = await fetch(url, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://example.com',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Access-Control-Allow-Origin: ${response.headers.get('Access-Control-Allow-Origin')}`);
    console.log(`   Access-Control-Allow-Methods: ${response.headers.get('Access-Control-Allow-Methods')}`);
    console.log(`   Access-Control-Allow-Headers: ${response.headers.get('Access-Control-Allow-Headers')}`);
    
    if (response.headers.get('Access-Control-Allow-Origin')) {
      console.log('   ✅ Preflight PASSED\n');
      return true;
    } else {
      console.log('   ❌ Preflight FAILED - No CORS headers\n');
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Preflight FAILED - ${error.message}\n`);
    return false;
  }
}

// Test 2: Actual GET request
async function testGet() {
  console.log('2️⃣  Testing GET Request...');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Origin': 'https://example.com',
      },
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Access-Control-Allow-Origin: ${response.headers.get('Access-Control-Allow-Origin')}`);
    console.log(`   Content-Type: ${response.headers.get('Content-Type')}`);
    
    if (response.headers.get('Access-Control-Allow-Origin')) {
      console.log('   ✅ GET Request PASSED\n');
      return true;
    } else {
      console.log('   ❌ GET Request FAILED - No CORS headers\n');
      return false;
    }
  } catch (error) {
    console.log(`   ❌ GET Request FAILED - ${error.message}\n`);
    return false;
  }
}

// Test 3: Security Headers
async function testSecurityHeaders() {
  console.log('3️⃣  Testing Security Headers...');
  try {
    const response = await fetch(url);

    const securityHeaders = {
      'X-Content-Type-Options': response.headers.get('X-Content-Type-Options'),
      'X-Frame-Options': response.headers.get('X-Frame-Options'),
      'X-XSS-Protection': response.headers.get('X-XSS-Protection'),
      'Referrer-Policy': response.headers.get('Referrer-Policy'),
    };

    console.log('   Security Headers:');
    Object.entries(securityHeaders).forEach(([key, value]) => {
      console.log(`   ${key}: ${value || '❌ Missing'}`);
    });
    
    const allPresent = Object.values(securityHeaders).every(v => v);
    if (allPresent) {
      console.log('   ✅ Security Headers PASSED\n');
      return true;
    } else {
      console.log('   ⚠️  Some security headers missing\n');
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Security Headers Test FAILED - ${error.message}\n`);
    return false;
  }
}

// Run all tests
async function runTests() {
  const results = await Promise.all([
    testPreflight(),
    testGet(),
    testSecurityHeaders(),
  ]);

  const allPassed = results.every(r => r);
  
  console.log('═══════════════════════════════════════');
  if (allPassed) {
    console.log('✅ All CORS tests PASSED!');
    console.log('Your domain is properly configured.');
  } else {
    console.log('❌ Some tests FAILED!');
    console.log('Please check the configuration.');
  }
  console.log('═══════════════════════════════════════\n');
}

runTests().catch(console.error);
