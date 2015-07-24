var express = require('express');

var app = express();

app.get('/stuff', function (req, res) {
  res.send('hi');
});


app.use(express.bodyParser());
app.use(express.methodOverride());

app.listen();