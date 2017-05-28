myApp.controller('StockCtrl', function ($scope, StockFactory) {
      $scope.MyData = StockFactory;

      $scope.$watch('MyData.stockUpdates[0]', function(n, o){
        var temp = _.map(n, function(item){
            return {'name': item[0], 'value': item[1], 'lastUpdated': new Date(), 'status': 'new'};
        });
        _.each(temp, function(item){
            var x = _.findWhere($scope.MyData.collection, {'name': item.name});
            if(x){ //stock already present
                x.lastUpdated = new Date();
                x.status = x.value > item.value ? 'dec' : 'inc';
            }
            else{ //new stock
                $scope.MyData.collection.push(item);
            }
        });
      });
});