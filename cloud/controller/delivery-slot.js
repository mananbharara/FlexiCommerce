var DeliverySlot = Parse.Object.extend('DeliverySlot', {
  initialize: function (attrs) {
    this.maxDeliveriesAllowed = attrs.maxDeliveriesAllowed;
    this.day = attrs.day;
    this.timeDescription = attrs.timeDescription;
    this.available = true;
  }
});

exports.index = function (req, res) {
  var query = new Parse.Query(DeliverySlot);

  query.find().then(function (results) {
    res.send(results);
  });
};

exports.decreaseAllowedDeliveries = function (req, res) {
  var query = new Parse.Query(DeliverySlot);

  query.get(req.params.id).then(function (deliverySlot) {
    deliverySlot.save({maxDeliveriesAllowed: deliverySlot.maxDeliveriesAllowed - 1}).then(function (updatedSlot) {
      res.send(updatedSlot);
    })
  });
};