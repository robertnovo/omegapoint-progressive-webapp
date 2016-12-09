const express = require('express');
const request = require('request');
const app = express();

app.use(express.static(__dirname + '/build'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let cachedBody = undefined;
var cacheTime = performance.now();

app.get('/images', (req, res) => {
  res.type('json');
  if (cacheTime < performance.now() - 60000) {
    cachedBody = undefined;
  }
  if (cachedBody !== undefined) {
    res.send(cachedBody);
  } else {
    request('https://api.flickr.com/services/feeds/photos_public.gne?tags=christmas,tree,xmas&tagmode=any&format=json&nojsoncallback=1', (err, response, body) => {
      cachedBody = body;
      cacheTime = performance.now();
      res.send(body);
    });
  }
});

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log('Server running on', PORT);
})
