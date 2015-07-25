require('../spec-helper');
var orderController = require('../../cloud/controller/order');

describe('Order controller', function () {
  it('should map delivery slot with order id', function () {
    var req = {}, res = {};
    var originalOrders = [
      new Parse.Object('Order', {id: '1', name: 'someOrder1', deliverySlotId: undefined}),
      new Parse.Object('Order', {id: '2', name: 'someOrder2', deliverySlotId: undefined})
    ];
    var updatedOrders = [
      new Parse.Object('Order', {id: '1', name: 'someOrder1', deliverySlotId: 2}),
      new Parse.Object('Order', {id: '2', name: 'someOrder2', deliverySlotId: 2})
    ];

    res.send = sinon.spy();
    req.body = {orderIds: [1, 2, 3], deliverySlotId: 2};
    Parse.Query.prototype.containedIn = sinon.stub();
    Parse.Query.prototype.containedIn.returnsThis();

    ParseMock.stubQueryFind(function () {
      return originalOrders;
    });
    Parse.Object.saveAll = sinon.stub();

    orderController.updateWithDeliverySlot(req, res);

    expect(Parse.Query.prototype.containedIn.calledWith('id', [1, 2, 3])).to.equal(true);
    expect(Parse.Object.saveAll.args[0][0].length).to.equal(2);
    expect(Parse.Object.saveAll.args[0][0][0].deliverySlotId).to.equal(2);

    Parse.Object.saveAll.args[0][1].success(updatedOrders);
    expect(res.send.calledWith(updatedOrders))
  });

  afterEach(function () {
    ParseMock.clearStubs();
  })
});