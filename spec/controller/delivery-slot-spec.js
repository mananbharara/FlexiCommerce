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

  afterEach(function() {
    ParseMock.clearStubs();
  })
});