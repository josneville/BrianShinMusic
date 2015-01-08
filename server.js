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

app.get('/data', function(req, res) {		
	blog.posts([], function(err, result) {
		if (err) {
			res.status(400).send("Unknown error");
			return;
		}	
		res.status(200).send(result);
	});			
});

app.listen(app.get('port'));
