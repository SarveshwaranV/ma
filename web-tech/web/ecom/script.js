
angular.module('myApp', [])
  .factory('ProductService', ['$http', function($http) {
    return {
      getProducts: function() {
        return $http.get('http://localhost:3000/api/products');
      },
      addProduct: function(product) {
        return $http.post('http://localhost:3000/api/products', product);
      }
    };
  }])
  .factory('CartService', [function() {
    var cart = [];
    return {
      getCart: function() {
        return cart;
      },
      addToCart: function(product) {
        if (cart.indexOf(product) != -1)
          window.alert("Already added");
        else
          cart.push(product);
      },
      removeFromCart: function(product) {
        var index = cart.indexOf(product);
        if (index !== -1) {
          cart.splice(index, 1);
        }
        return cart;
      }
    };
  }])
  .controller('ProductController', ['$scope', 'ProductService', 'CartService', function($scope, ProductService, CartService) {
    ProductService.getProducts().then(function(response) {
      $scope.products = response.data;
    });

    $scope.searchCategory = '';
    $scope.isAdmin = true;
    $scope.newProduct = {};
    $scope.cart = CartService.getCart();

    $scope.addToCart = function(product) {
      CartService.addToCart(product);
      $scope.newProduct = {};
    };

    $scope.removeFromCart = function(product) {
      $scope.cart = CartService.removeFromCart(product);
    };

    $scope.addProduct = function() {
      ProductService.addProduct($scope.newProduct).then(function(response) {
        $scope.products.push(response.data);
        $scope.newProduct = {};
      });
    };
  }]);