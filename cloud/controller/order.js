var Order = Parse.Object.extend('Order');

//Dummy to create an order
exports.createOrder = function (req, res) {
  var requestBody = req.body;

  var order = new Order({name: requestBody.name});

  order.save(null, {
    success: function (order) {
      res.status(201).send(order);
    },
    error: function (order, error) {
      res.status(400).send(error);
    }
  })
};

exports.updateWithDeliverySlot = function (req, res) {
  var requestBody = req.body;
  var query = new Parse.Query(Order).containedIn('objectId', requestBody.orderIds);

  query.find().then(function (orders) {
    var ordersToUpdate = orders.map(function (order) {
      order.set('deliverySlotId', requestBody.deliverySlotId);
      return order;
    });

    Parse.Object.saveAll(ordersToUpdate, {
      success: function (updatedOrders) {
        res.send(updatedOrders);
      }
    });
  });
};
