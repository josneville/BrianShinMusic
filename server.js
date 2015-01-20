var express = require('express');
var app = express();
var morgan = require('morgan');
var tumblr = require('tumblr');

app.use(morgan('dev'));
app.use(express.static(__dirname + "/dist"));

app.set('port', process.env.PORT || 5000);

var oauth = {
  consumer_key: 'MpVXcr7u9qQPWXki5X0iguUIjAdEcLm3XhPunjqkzvuCaDhBki',
  consumer_secret: 'Zer4O83ntSsHj6rtWEGKOraq5QDIJmC9DQ55k6Y3DG54d322d9',
  access_token_key: 'qaV0XHMPKb5CjnqlekiB5za0wMgGZ4ZdSzL6qlO5pm40Z1KDPQ',
  access_token_secret: 'hfWvcveiYkLkuyFs1DNXHL2Umckkh43WmgiWlRxZGRCEuGYPkM'
};

var blog = new tumblr.Blog('musicbrianshin.tumblr.com', oauth);

var data = {}

setInterval(function(){
  blog.posts([], function(err, result1) {
    if (err) {
      res.status(400).send("Unknown error");
      return;
    }
    blog.video([], function(err, result2){
      if (err) {
        res.status(400).send("Unknown error");
        return;
      }
      var photos = result1.posts;
      var videos = result2.posts;
      var posts = photos.concat(videos);
      posts.sort(function(post1, post2) {
        if (new Date(post1.date) > new Date(post2.date)) return -1;
        if (new Date(post1.date) < new Date(post2.date)) return 1;
        return 0;
      });
      data = posts;
    });
  });
}, 10000);

app.get('/data', function(req, res) {
  if (!isEmptyObject(data)){
    res.status(200).send(data);
  }
  else{
    res.status(400).send("No data yet");
  }
});

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

app.listen(app.get('port'));
