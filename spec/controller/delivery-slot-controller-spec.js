var expect = require('chai').expect;
var deliverySlotController = require('../../cloud/controller/delivery-slot');

describe('Delivery slot controller', function() {
  it('should fetch all delivery slots', function() {
    expect(deliverySlotController.index()).to.deep.equal([]);
  })
});