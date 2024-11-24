angular.module('myApp', [])
  .controller('ProjectController', ['$scope', '$http', function($scope, $http) {
    $scope.projects = [];

    // Fetch projects from server
    $scope.fetchProjects = function() {
      $http.get('http://localhost:3000/api/projects').then(function(response) {
        $scope.projects = response.data;
      });
    };

    // Add new project
    $scope.addProject = function() {
      $http.post('http://localhost:3000/api/projects', $scope.newProject).then(function(response) {
        $scope.projects.push(response.data);
        $scope.newProject = {}; // Clear input fields
      });
    };

    // Delete project
    $scope.deleteProject = function(project) {
      $http.delete(`http://localhost:3000/api/projects/${project._id}`).then(function() {
        const index = $scope.projects.indexOf(project);
        $scope.projects.splice(index, 1);
      });
    };
    $scope.editProject = function(project) {
        $scope.editedProject = angular.copy(project);
      };
      
      $scope.updateProject = function() {
        $http.put(`http://localhost:3000/api/projects/${$scope.editedProject._id}`, $scope.editedProject)
          .then(function(response) {
            // Find the project in the list and update it
            for (let i = 0; i < $scope.projects.length; i++) {
              if ($scope.projects[i]._id === response.data._id) {
                $scope.projects[i] = response.data;
                break;
              }
            }
            $scope.editedProject = null; // Clear edit form
          });
      };
      

    $scope.fetchProjects();
  }]);
