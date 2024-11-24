angular.module('studentApp').controller('StudentController', function ($scope, StudentService) {
    $scope.students = [];
    $scope.newStudent = {};

    // Load Students
    $scope.loadStudents = function () {
        StudentService.getStudents().then(function (response) {
            $scope.students = response.data;
        });
    };

    $scope.getStudents = function () {
        StudentService.getStudents()
            .then(function (response) {
                $scope.students = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching students:', error);
            });
    };
    

    // Add Student
    $scope.addStudent = function () {
        const student = {
            name: $scope.newStudent.name,
            birthDate: new Date($scope.newStudent.birthDate).toISOString().slice(0, 10),
            class: $scope.newStudent.class,
            subject1_marks: $scope.newStudent.subject1_marks,
            subject2_marks: $scope.newStudent.subject2_marks,
            subject3_marks: $scope.newStudent.subject3_marks,
        };
    
        StudentService.addStudent(student)
            .then(function () {
                console.log('Student added successfully');
                $scope.getStudents(); // Refresh the student list
            })
            .catch(function (error) {
                console.error('Error adding student:', error);
            });
    };
    

    // Delete Student
    $scope.deleteStudent = function (id) {
        StudentService.deleteStudent(id).then(function () {
            $scope.loadStudents();
        });
    };

    // Initial Load
    $scope.loadStudents();
});
