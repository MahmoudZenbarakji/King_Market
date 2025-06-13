const cloudinary = require('cloudinary').v2;

// Use the correct environment variable names
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test connection with better error handling
cloudinary.api.ping()
  .then(result => {
    console.log('Cloudinary connection successful!');
    console.log('Account details:', {
      cloud_name: result.cloud_name,
      user: result.user,
      plan: result.plan
    });
  })
  .catch(err => {
    console.error('Cloudinary connection failed:');
    console.error('Error details:', err.error);
    console.error('HTTP code:', err.http_code);
    console.error('Request URL:', err.request_options.href);
    console.error('Using credentials:', {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'Not Set'
    });
  });

module.exports = cloudinary;