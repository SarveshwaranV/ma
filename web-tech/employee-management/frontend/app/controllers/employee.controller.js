angular.module('employeeApp')
  .controller('EmployeeController', ['EmployeeService', 'EmployeeFactory', function (EmployeeService, EmployeeFactory) {
    const vm = this;

    vm.departmentFilter = '';

    EmployeeService.getEmployees().then(function (response) {
      EmployeeFactory.setEmployees(response.data);
      vm.employees = EmployeeFactory.getEmployees();
    });

    vm.getFilteredEmployees = function () {
      EmployeeFactory.setDepartmentFilter(vm.departmentFilter);
      return EmployeeFactory.getFilteredEmployees();
    };

    vm.deleteEmployee = function (id) {
      EmployeeService.deleteEmployee(id).then(function () {
        vm.employees = vm.employees.filter(emp => emp._id !== id);
      });
    };

    vm.getTotalSalary = function () {
      return vm.employees.reduce((sum, emp) => sum + emp.salary, 0);
    };
  }]);