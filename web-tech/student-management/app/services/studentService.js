angular.module('studentApp').service('StudentService', function ($http, StudentFactory) {
    const baseUrl = 'http://localhost:3000/api/students';

    this.getStudents = function () {
        return $http.get(baseUrl);
    };

    this.addStudent = function (student) {
        return $http.post(baseUrl, student);
    };

    this.deleteStudent = function (id) {
        return $http.delete(`${baseUrl}/${id}`);
    };
});
