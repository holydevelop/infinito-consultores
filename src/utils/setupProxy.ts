const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: any) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://3.237.252.239:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/users': '',
      },
    })
  );
};