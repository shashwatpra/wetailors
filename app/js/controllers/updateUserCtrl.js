'use strict';
app.controller('UpdateUsersController',function($rootScope,$scope,$location,user){
	var updateUserCtrl = this;
	if($rootScope._id != '' && $rootScope._id != undefined){
        
		$scope._id= $rootScope._id;	
	}
    else{
        $location.path('/AllUsers');
    }
	
    $scope.colours = [{
		name: "Red",
		hex: "#F21B1B"
	}, {
		name: "Blue",
		hex: "#1B66F2"
	}, {
		name: "Green",
		hex: "#07BA16"
	}];
	$scope.colour = "";
    $scope.SelectedState = '56aef85e8dfe838e2a477eed';
    
    $scope.Stateupdate=function(val){
        $scope.SelectedState = val;
    }
    
	user.getUserbyid($rootScope._id)
		.success(function(data){
			updateUserCtrl.userdata = data.collectionUser;
            updateUserCtrl.countrydata = data.collectionCountry;
            updateUserCtrl.statedata = data.collectionState;
            updateUserCtrl.citydata = data.collectionCity;
            updateUserCtrl.areadata = data.collectionArea;
            $scope.AreaselectedVal = updateUserCtrl.userdata[0].AreaID._id;
            $scope.CityselectedVal = updateUserCtrl.userdata[0].CityID._id;
            $scope.StateselectedVal = updateUserCtrl.userdata[0].StateID._id;
            $scope.CountryselectedVal = updateUserCtrl.userdata[0].CountryID._id;
		});

	updateUserCtrl.UpdateUser = function(){
		user.UpdateUser(updateUserCtrl.userdata[0])
		.success(function(data){
			alert(data.message);
		});
		//alert($rootScope.username);
	}

    updateUserCtrl.onCountryChange = function(result){
        updateUserCtrl.userdata[0].CountryID._id = result;
        $scope.CountryselectedVal = result;
    }
    
    updateUserCtrl.onStateChange = function(result){
        updateUserCtrl.userdata[0].StateID._id = result;
        $scope.StateselectedVal = result;
        user.getCity(result)
        .success(function(data){
            updateUserCtrl.citydata = data.collectionCity;
            if(data.collectionCity.length > 0){
                $scope.CityselectedVal=data.collectionCity[0]._id;
                updateUserCtrl.getAreaByID($scope.CityselectedVal);
            }
            else{
                updateUserCtrl.areadata =  null;
            }
            //updateUserCtrl.citydata
        });
    }
    
    updateUserCtrl.getAreaByID = function(data){
        updateUserCtrl.areadata =  null;
        //$scope.AreaselectedVal = null;
        user.getAreaByid(data)
        .success(function(data){
            updateUserCtrl.areadata = data.collectionArea;
        });
    }
    
    updateUserCtrl.onCityChange = function(result){
        updateUserCtrl.userdata[0].CityID._id = result;
        $scope.CityselectedVal = result;
        updateUserCtrl.getAreaByID($scope.CityselectedVal);
    }
    
    updateUserCtrl.onAreaChange = function(result){
        updateUserCtrl.userdata[0].AreaID._id = result;
        $scope.selectedVal = result;
    }
    
	updateUserCtrl.showHindPassword = function(){
		if($('#password').attr('type') == 'password'){
			$('#password').attr('type','text');
		}
		else{
			$('#password').attr('type','password');	
		}
    }
});
