angular.module('employeeApp')
  .service('EmployeeService', ['$http', function ($http) {
    const apiUrl = 'http://localhost:5000/api/employees';

    this.getEmployees = function () {
      return $http.get(apiUrl);
    };

    this.addEmployee = function (employee) {
      return $http.post(apiUrl, employee);
    };

    this.deleteEmployee = function (id) {
      return $http.delete(`${apiUrl}/${id}`);
    };
  }]);
