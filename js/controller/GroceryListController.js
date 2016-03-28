angular.module('GroceryList').controller('GroceryListController', function ($scope) {

    $scope.grocery = new GroceryItem();

    $scope.list = [];

    $scope.add = function () {
        if ($scope.grocery.name == "")
            return;

        if ($scope.grocery.price == "")
            $scope.grocery.price = 0;

        if (TogetherJS.running)
            TogetherJS.send({type:"grocery.add"});

        $scope.pushGrocery();
    };

    $scope.pushGrocery = function () {
        $scope.list.push($scope.grocery);
        $scope.grocery = new GroceryItem();
    }

    $scope.remove = function (item) {
        var index = $scope.list.indexOf(item);

        if (TogetherJS.running)
            TogetherJS.send({ type: "grocery.remove", index: index});

        $scope.removeGrocery(index);
    };

    $scope.removeGrocery = function (index) {
        $scope.list.splice(index, 1);
    }
});