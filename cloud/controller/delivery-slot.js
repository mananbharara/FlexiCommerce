var DeliverySlot = Parse.Object.extend('DeliverySlot', {
  initialize: function (attrs) {
    this.maxDeliveriesAllowed = attrs.maxDeliveriesAllowed;
    this.day = attrs.day;
    this.timeDescription = attrs.timeDescription;
  }
});

exports.index = function (req, res) {
  var query = new Parse.Query(DeliverySlot);

  query.find().then(function (results) {
    res.send(results);
  });
};