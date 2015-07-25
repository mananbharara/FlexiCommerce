var express = require('express');

var deliverySlotController = require('cloud/controller/delivery-slot');
var orderController = require('cloud/controller/order');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/delivery-slots', deliverySlotController.index);
app.put('/delivery-slots/:id', deliverySlotController.decreaseAllowedDeliveries);
app.put('/orders/delivery-slots', orderController.updateWithDeliverySlot);

app.post('/delivery-slots', deliverySlotController.createDeliverySlot);
app.post('/orders', orderController.createOrder);

app.listen();