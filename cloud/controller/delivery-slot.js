var DeliverySlot = Parse.Object.extend('DeliverySlot');

exports.index = function (req, res) {
  var query = new Parse.Query(DeliverySlot);

  query.find().then(function (results) {
    res.send(results);
  });
};

exports.decreaseAllowedDeliveries = function (req, res) {
  var query = new Parse.Query(DeliverySlot);

  query.get(req.params.id).then(function (deliverySlot) {
    var newDeliveryCount = deliverySlot.get('maxDeliveriesAllowed') - 1;
    var fieldsToUpdate = {maxDeliveriesAllowed: newDeliveryCount};

    if (newDeliveryCount === 0) {
      fieldsToUpdate.available = false;
    }

    deliverySlot.save(fieldsToUpdate).then(function (updatedSlot) {
      res.send(updatedSlot);
    })
  });
};

//Dummy to create a slot
exports.createDeliverySlot = function (req, res) {
  var requestBody = req.body;

  var deliverySlot = new DeliverySlot({
    maxDeliveriesAllowed: requestBody.maxDeliveriesAllowed,
    day: requestBody.day,
    timeDescription: requestBody.timeDescription
  });

  deliverySlot.save(null, {
    success: function (deliverySlot) {
      res.status(201).send(deliverySlot);
    },
    error: function (deliverySlot, error) {
      res.status(400).send(error);
    }
  });
};
