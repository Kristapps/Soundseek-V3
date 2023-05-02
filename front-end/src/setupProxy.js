const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/SaveSurveyData',{
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );

  app.use(createProxyMiddleware('/ProcessAudio',{
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );

  app.use(createProxyMiddleware('/GetExampleAudio',{
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );
    app.use(createProxyMiddleware('/GetExampleAudioResults',{
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );

};