angular.module('movieApp', [])
.controller('MovieController', function($scope, $http) {
    $scope.reservation = {
        movieName: '',
        customerName: '',
        numTickets: 1,
        showTime: ''
    };
    
    $scope.reservations = [];

    // Load all reservations when page loads
    function loadReservations() {
        $http.get('/api/reservations')
            .then(function(response) {
                $scope.reservations = response.data;
            })
            .catch(function(error) {
                console.error('Error loading reservations:', error);
            });
    }

    // Make a new reservation
    $scope.makeReservation = function() {
        if (!$scope.reservation.movieName || !$scope.reservation.customerName || 
            !$scope.reservation.numTickets || !$scope.reservation.showTime) {
            alert('Please fill in all fields');
            return;
        }

        $http.post('/api/reservations', $scope.reservation)
            .then(function(response) {
                loadReservations();
                // Reset form
                $scope.reservation = {
                    movieName: '',
                    customerName: '',
                    numTickets: 1,
                    showTime: ''
                };
                alert('Reservation successful!');
            })
            .catch(function(error) {
                console.error('Error making reservation:', error);
                alert('Error making reservation. Please try again.');
            });
    };

    // Load reservations when controller initializes
    loadReservations();
});
