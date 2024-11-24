angular.module('studentApp').filter('age', function () {
    return function (birthDate) {
        const ageDifMs = Date.now() - new Date(birthDate).getTime();
        return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
    };
});
