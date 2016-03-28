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



function getScope() {
    var div = document.querySelector('[ng-controller=GroceryListController]');
    var scope = angular.element(div).scope();
    return scope;
}

TogetherJS.hub.on("togetherjs.hello", function (msg) {
    var scope = getScope();
    TogetherJS.send({
        type: "init",
        list: scope.list
    });
});

TogetherJS.hub.on("init", function (msg) {
    var scope = getScope();
    scope.list = msg.list;
    scope.$digest();
});


TogetherJS.hub.on("grocery.add", function (msg) {
    var scope = getScope();
    scope.pushGrocery();
    scope.$digest();
});

TogetherJS.hub.on("grocery.remove", function (msg) {
    var scope = getScope();
    scope.removeGrocery(msg.index);
    scope.$digest();
});

