angular.module('employeeApp') .factory('EmployeeFactory', function () { 
    let employees = []; 
    let departmentFilter = '';
       return {
         setEmployees: function (data) {
           employees = data;
         },
         getEmployees: function () {
           return employees;
         },
         setDepartmentFilter: function (filter) {
           departmentFilter = filter;
         },
         getFilteredEmployees: function () {
           return employees.filter(emp => 
             departmentFilter ? emp.department.includes(departmentFilter) : true);
         }
       };
});