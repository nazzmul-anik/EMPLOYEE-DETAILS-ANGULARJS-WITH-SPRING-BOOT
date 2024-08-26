var app = angular.module('employeeApp', []);

app.controller('EmployeeController', function($scope, $http, $filter) {
    $scope.employees = [];
    $scope.employee = [];

    // Get All Employees
    $scope.getEmployees = function() {
        $http.get('/api/employees').then(function(response) {
            $scope.employees = response.data;
        });
    };

    // Get Id Employee

    $scope.doSearch = function (){
        console.log("Employee No : " + $scope.employeeNo);
        $http.get('/api/employees/' + $scope.employeeNo).then(function (response){
           $scope.employee = response.data;
           $scope.employeeName = $filter("uppercase")($scope.employee.name);
           $scope.date = new Date();
        });
    }

    // Add Employee
    $scope.addEmployee = function() {
        $http.post('/api/employees', $scope.newEmployee).then(function(response) {
            $scope.employees.push(response.data);
            $scope.newEmployee = {}; // Clear form
        });
    };

    // Edit Employee
    $scope.editEmployee = function(employee) {
        $scope.editingEmployee = angular.copy(employee);
    };

    $scope.createEmplyee = function (){
        $scope.editingEmployee = null;
    };

    // Update Employee
    $scope.updateEmployee = function() {
        $http.put('/api/employees/' + $scope.editingEmployee.id, $scope.editingEmployee).then(function(response) {
            for (var i in $scope.employees) {
                if ($scope.employees[i].id == $scope.editingEmployee.id) {
                    $scope.employees[i] = response.data;
                    break;
                }
            }
            $scope.editingEmployee = null; // Clear form
        });
    };

    // Delete Employee
    $scope.deleteEmployee = function(id) {
        $http.delete('/api/employees/' + id).then(function(response) {
            $scope.employees = $scope.employees.filter(function(employee) {
                return employee.id != id;
            });
        });
    };

    // Initialize by getting all employees
    $scope.getEmployees();
});
