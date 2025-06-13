export default (req, res) => {
  res.redirect(308, 'https://your-backend-url.com/api' + req.url);
};