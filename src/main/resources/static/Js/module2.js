var app = angular.module("myApp", []);

app.controller("emp", ["$scope",  "$http",function($scope, $http){
    $scope.employee = [];
    $scope.employees = [];

    $scope.doSearch = function(){
        if ($scope.searchEmpNo) {
            $http.get("http://localhost:8080/api/employees/" + $scope.searchEmpNo)
                .then(function(response){
                    $scope.employee = response.data;
                }, function(error){
                    console.error("Error fetching employee data:", error);
                });
        } else {
            console.log("Employee number is required");
        }
    };

    $scope.getEmployees = function (){
      $http.get("http://localhost:8080/api/employees")
          .then(function (response){
         $scope.employees = response.data;
      });
    };

    $scope.getEmployees();
}]);


app.directive("empDetails", function(){
    return {
        templateUrl: "emp-details.html"
    }
});