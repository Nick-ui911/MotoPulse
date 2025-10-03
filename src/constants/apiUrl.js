// Environment-based URL configuration
const isProduction = process.env.NODE_ENV === 'production';

// Production URLs - Update these with your actual production domain
const PRODUCTION_API_URL = 'https://your-production-domain.com/api';
const PRODUCTION_WEB_URL = 'https://your-production-domain.com';

// Development URLs
const DEVELOPMENT_API_URL = 'http://localhost:3000/api';
const DEVELOPMENT_WEB_URL = 'http://localhost:3000';

// Export URLs based on environment
export const BASE_URL = isProduction ? PRODUCTION_API_URL : DEVELOPMENT_API_URL;
export const WEB_URL = isProduction ? PRODUCTION_WEB_URL : DEVELOPMENT_WEB_URL;