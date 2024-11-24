angular.module('mentalHealthApp', ['ngAnimate'])
    .controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
        $scope.currentPage = 'home'; 
        $scope.userLoggedIn = false;
        $scope.loginUsername = '';
        $scope.loginPassword = '';
        $scope.mentalHealthForm = {
            mood: '',
            stressLevel: ''
        };
        $scope.mentalHealthResources = [];
        $scope.currentDateTime = new Date();

        $interval(function() {
            $scope.currentDateTime = new Date();
        }, 1000);

        // Show different pages
        $scope.showPage = function(page) {
            $scope.currentPage = page;
        };

        // Submit the mental health form
        $scope.submitMentalHealthForm = function() {
            $http.post('/submitForm', $scope.mentalHealthForm)
                .then(function(response) {
                    $scope.formSubmitted = true;
                    $scope.mentalHealthForm = { mood: '', stressLevel: '' };
                })
                .catch(function(error) {
                    console.error('Error submitting form:', error);
                });
        };

        // Login functionality
        $scope.login = function() {
            const user = {
                username: $scope.loginUsername,
                password: $scope.loginPassword
            };
            $http.post('/login', user)
                .then(function(response) {
                    $scope.userLoggedIn = true;
                    $scope.showPage('home');
                })
                .catch(function(error) {
                    console.error('Login error:', error);
                });
        };

        // Fetch resources from the backend
        $http.get('/resources')
            .then(function(response) {
                $scope.mentalHealthResources = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching resources:', error);
            });
    }]);
