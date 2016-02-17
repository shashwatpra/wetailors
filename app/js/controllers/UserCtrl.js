'use strict';
app.controller('AddUserController',function($scope,user){
	var addUserCtrl = this;
    addUserCtrl.listUasers=function(){
    user.getUserInfo()
		.success(function(data) {
			addUserCtrl.userdtl = data;
		});
    }
    addUserCtrl.listUasers();
    user.getCountry()
    .success(function(data){
        addUserCtrl.countrydata = data.collectionCountry;
        $scope.CountryselectedVal = addUserCtrl.countrydata[0]._id;
        //addUserCtrl.userdata[0].CountryID._id=$scope.CountryselectedVal;
        addUserCtrl.gerStatesByID($scope.CountryselectedVal);
        
    });
        
    addUserCtrl.gerStatesByID = function(countryID)
    {
        user.getStateByid(countryID)
        .success(function(data){
            addUserCtrl.statedata = data.collectionState;
            $scope.StateselectedVal = addUserCtrl.statedata[0]._id;
            //addUserCtrl.userdata[0].StateID._id=$scope.CityselectedVal;
            addUserCtrl.gerCityByID($scope.StateselectedVal);
        });
    }
    
    addUserCtrl.gerCityByID = function(stateID)
    {
        user.getCity(stateID)
        .success(function(data){
            addUserCtrl.citydata = data.collectionCity;
            $scope.CityselectedVal = addUserCtrl.citydata[0]._id;
            //addUserCtrl.userdata[0].CityID._id=$scope.CityselectedVal;
            addUserCtrl.getAreaByID($scope.CityselectedVal);
        });
    }
    
    addUserCtrl.getAreaByID = function(CityID)
    {
        user.getAreaByid(CityID)
        .success(function(data){
            addUserCtrl.areadata = data.collectionArea;
            $scope.AreaselectedVal = addUserCtrl.areadata[0]._id;
            //addUserCtrl.userdata[0].AreaID._id=$scope.AreaselectedVal;
        });
    }
    
    addUserCtrl.onStateChange = function(result)
    {
        //addUserCtrl.userdata[0].StateID._id = result;
        $scope.StateselectedVal = result;
        user.getCity(result)
        .success(function(data){
            addUserCtrl.citydata = data.collectionCity;
            if(data.collectionCity.length > 0){
                $scope.CityselectedVal=data.collectionCity[0]._id;
                addUserCtrl.getAreaByID($scope.CityselectedVal);
            }
            else{
                addUserCtrl.areadata =  null;
            }
            //updateUserCtrl.citydata
        });
    }
    
    addUserCtrl.onCityChange = function(result)
    {
        addUserCtrl.userdata[0].CityID._id = result;
        $scope.CityselectedVal = result;
        addUserCtrl.getAreaByID($scope.CityselectedVal);
    }
    
    addUserCtrl.onAreaChange = function(result)
    {
        addUserCtrl.userdata[0].AreaID._id = result;
        $scope.selectedVal = result;
    }
    
	addUserCtrl.AddUser = function(){
        addUserCtrl.userdata.CountryID = {};
        addUserCtrl.userdata.StateID = {};
        addUserCtrl.userdata.CityID={};
        addUserCtrl.userdata.AreaID = {};
        addUserCtrl.userdata.CountryID['_id']=$scope.CountryselectedVal;
        //addUserCtrl.userdata[0].CountryID.addAttribute('_id',$scope.CountryselectedVal);
        addUserCtrl.userdata.StateID['_id']=$scope.StateselectedVal;
        addUserCtrl.userdata.CityID['_id']=$scope.CityselectedVal;
        addUserCtrl.userdata.AreaID['_id']=$scope.AreaselectedVal;
		user.Addusers(addUserCtrl.userdata)
		.success(function(data){
            addUserCtrl.listUasers();
			alert(data.message);
		});
	}
});