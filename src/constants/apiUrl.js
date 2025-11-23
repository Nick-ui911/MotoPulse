// Environment-based URL configuration
// For client-side components, we need to detect at runtime
let BASE_URL, WEB_URL;

if (typeof window === 'undefined') {
  // Server-side: use NODE_ENV
  const isProduction = process.env.NODE_ENV === 'production';
  BASE_URL = isProduction ? 'https://moto-pulse.vercel.app/api' : 'http://localhost:3000/api';
  WEB_URL = isProduction ? 'https://moto-pulse.vercel.app' : 'http://localhost:3000';
} else {
  // Client-side: detect based on current hostname
  const isProduction = window.location.hostname !== 'localhost' && 
                       !window.location.hostname.includes('127.0.0.1') &&
                       !window.location.hostname.includes('192.168');
  
  BASE_URL = isProduction 
    ? 'https://moto-pulse.vercel.app/api' 
    : `${window.location.protocol}//${window.location.host}/api`;
  
  WEB_URL = isProduction 
    ? 'https://moto-pulse.vercel.app' 
    : `${window.location.protocol}//${window.location.host}`;
}

export { BASE_URL, WEB_URL };