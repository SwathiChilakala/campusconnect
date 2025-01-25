const express = require('express');
const rateLimit = require('express-rate-limit');
const cache = require('memory-cache');

const app = express();
const port = 3000;

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Caching Middleware
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = cache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.get('/data', cacheMiddleware(30), (req, res) => {
  // Simulate a slow response
  setTimeout(() => {
    res.json({ message: 'This is cached data!' });
  }, 2000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
