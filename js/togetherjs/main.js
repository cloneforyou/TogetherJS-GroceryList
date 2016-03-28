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