angular.module('studentApp').factory('StudentFactory', function () {
    return {
        log: function (message) {
            console.log('Factory Log:', message);
        }
    };
});
