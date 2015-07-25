var Parse = require('parse').Parse;

var DeliverySlot = Parse.Object.extend('DeliverySlot');

exports.index = function (req, res) {
  var query = new Parse.Query(DeliverySlot);

  query.find().then(function (results) {
    res.send(results);
  })
};