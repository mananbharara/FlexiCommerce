require('../spec-helper');
var deliverySlotController = require('../../cloud/controller/delivery-slot');

describe('Delivery slot controller', function () {
  it('create an instance of delivery slot', function () {
    var req = {}, res = {};
    res.send = sinon.spy();
    ParseMock.stubQueryFind(function () {
      return [];
    });

    deliverySlotController.index(req, res);

    expect(res.send.calledOnce).to.equal(true);
    expect(res.send.calledWith([])).to.equal(true);
  });

  it('should have a fixed number of deliveries allowed with time slot description and day', function () {
    var deliverySlot = new Parse.Object('DeliverySlot', {
      maxDeliveriesAllowed: 20,
      day: 'Sat Jul 25 2015',
      timeDescription: '7:00am - 9:30am'
    });

    expect(deliverySlot.maxDeliveriesAllowed).to.equal(20);
    expect(deliverySlot.day).to.equal('Sat Jul 25 2015');
    expect(deliverySlot.timeDescription).to.equal('7:00am - 9:30am');
    expect(deliverySlot.available).to.equal(true);
  });

  afterEach(function () {
    ParseMock.clearStubs();
  })
});