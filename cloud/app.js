var express = require('express');

var deliverySlotController = require('cloud/controller/delivery-slot');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/delivery-slots', deliverySlotController.index);

app.listen();