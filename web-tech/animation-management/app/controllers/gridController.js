angular.module('gridApp').controller('gridController', ['$scope', 'numberService', function ($scope, numberService) {
    $scope.grid = numberService.generateGrid(6, 6);

    $scope.selectedIndex = null;
    $scope.fadeIndex = null;


    function reverseNumber(number) {
        return parseInt(number.toString().split('').reverse().join(''), 10);
    }
    
    $scope.onCellClick = function (index) {
        $scope.selectedIndex = index;
        $scope.grid[index] = reverseNumber($scope.grid[index]);
    };

    // // Event: Cell Click
    // $scope.onCellClick = function (index) {
    //     $scope.selectedIndex = index;
    //     alert('You clicked on number: ' + $scope.grid[index]);
    // };

    $scope.onMouseOver = function (index) {
        $scope.fadeIndex = index;
    };

    $scope.onMouseOut = function (index) {
        if ($scope.fadeIndex === index) {
            $scope.fadeIndex = null;
        }
    };

    

}]);
