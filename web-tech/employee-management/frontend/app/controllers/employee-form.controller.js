angular.module('employeeApp')
  .controller('EmployeeFormController', ['EmployeeService', function (EmployeeService) {
    const vm = this;
    vm.newEmployee = {};

    vm.addEmployee = function () {
      EmployeeService.addEmployee(vm.newEmployee).then(function (response) {
        vm.newEmployee = {}; // Reset the form
        // Reload employee list (you can improve this part for efficiency)
        location.reload();
      });
    };
  }]);
