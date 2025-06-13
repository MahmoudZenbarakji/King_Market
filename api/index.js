// /api/index.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  let target = '';
  
  // Proxy to backend API
  if (req.url.startsWith('/api')) {
    target = 'https://king-market.onrender.com'; // Your backend URL
  }
  
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove /api prefix when forwarding
    },
  })(req, res);
};