var app= angular.module("myApp",[]);

app.controller("myController",["$scope","$http",function($scope,$http){
var refresh = function(){
		$http.get("/contatcList").success(function(response){
			$scope.contatcList= response;
			$scope.contact= "";
		});

}
refresh();

		$scope.AddContact= function(){

			$http.post("/contatcList", $scope.contact).success(function(response){
				console.log(response);
				refresh();
			})
		}
		$scope.EditContact= function(id){

			$http.get("/contatcList/" +id).success(function(response){
				$scope.contact = response;
			})
		}
		$scope.UpdateConatct = function(){

			$http.put("/contatcList/"+$scope.contact._id,$scope.contact)
			.success(function(response){
				refresh();
			})
		}

		$scope.removeContact = function(id) {
			$http.delete("/contatcList/" +id).success(function(response){
				$scope.contact = response;
				refresh();
		})
	}
}]);