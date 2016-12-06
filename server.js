const express = require('express');
const request = require('request');
const app = express();

app.use(express.static(__dirname + '/build'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/images', (req, res) => {
  console.log(request);
  request('https://api.flickr.com/services/feeds/photos_public.gne?tags=christmas,jul,xmas&tagmode=any&format=json&nojsoncallback=1', (err, response, body) => {
    res.type('json');
    res.send(body);
  })

});

const PORT = process.env.port || 4444;
app.listen(PORT, () => {
  console.log('Server running on', PORT);
})
