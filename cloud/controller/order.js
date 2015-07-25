var Order = Parse.Object.extend('Order');

exports.updateWithDeliverySlot = function (req, res) {
  var requestBody = req.body;
  var query = new Parse.Query(Order).containedIn('id', requestBody.orderIds);

  query.find().then(function (orders) {
    var ordersToUpdate = orders.map(function (order) {
      order.deliverySlotId = requestBody.deliverySlotId;
      return order;
    });

    Parse.Object.saveAll(ordersToUpdate, {
      success: function (updatedOrders) {
        res.send(updatedOrders);
      }
    });
  });
};
