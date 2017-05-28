myApp.factory('StockFactory', function($websocket) {
  // Open a WebSocket connection
  var dataStream = $websocket('ws://stocks.mnet.website');

  var collection = [];
  var stockUpdates = [];

  dataStream.onMessage(function(message) {
    stockUpdates.length = 0;
    stockUpdates.push(JSON.parse(message.data));
  });

  var methods = {
    collection: collection,
    stockUpdates: stockUpdates,
    get: function() {
      dataStream.send(JSON.stringify({ action: 'get' }));
    }
  };

  return methods;
});