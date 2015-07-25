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

    expect(deliverySlot.get('maxDeliveriesAllowed')).to.equal(20);
    expect(deliverySlot.get('day')).to.equal('Sat Jul 25 2015');
    expect(deliverySlot.get('timeDescription')).to.equal('7:00am - 9:30am');
  });

  it('should decrease the number of allowed deliveries for the delivery slot', function () {
    var req = {}, res = {};
    req.params = {id: 1};
    res.send = sinon.spy();

    var deliverySlot = new Parse.Object('DeliverySlot', {
      maxDeliveriesAllowed: 20,
      day: 'Sat Jul 25 2015',
      timeDescription: '7:00am - 9:30am'
    });

    var updatedSlot = new Parse.Object('DeliverySlot', {
      maxDeliveriesAllowed: 20,
      day: 'Sat Jul 25 2015',
      timeDescription: '7:00am - 9:30am'
    });

    var getReq = ParseMock.stubQueryGet(function () {
      return deliverySlot;
    });
    var saveReq = ParseMock.stubObjectSave(function () {
      return updatedSlot;
    });

    deliverySlotController.decreaseAllowedDeliveries(req, res);

    expect(getReq.calledWith(1)).to.equal(true);
    expect(saveReq.args[0][0].maxDeliveriesAllowed).to.equal(19);
    expect(res.send.calledWith(updatedSlot)).to.equal(true);
  });

  afterEach(function () {
    ParseMock.clearStubs();
  })
});