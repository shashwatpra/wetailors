'use strict';
app.controller('DeleteUserController',function($rootScope,$location,$timeout,user){
	var deleteUserCtrl = this;
	user.getUserInfo()
		.success(function(data) {
			deleteUserCtrl.userdtls = data;
		});

	deleteUserCtrl.DeleteUser = function(name){
		var index = -1;		
		//var comArr = eval( $scope.companies );
		for( var i = 0; i < deleteUserCtrl.userdtls.length; i++ ) {
			if( deleteUserCtrl.userdtls[i].name === name ) {
				index = i;
				break;
			}
		}
		if(index != -1){
			user.DeleteUsers(deleteUserCtrl.userdtls[index])
		.success(function(data){
			alert(data.message);
			user.getUserInfo()
			.success(function(data) {
				deleteUserCtrl.userdtls = data;
			});
		});	
		}
		
	}

	deleteUserCtrl.UpdatePage = function(_id){
		$rootScope._id=_id;
		$location.path('/UpdateUsers');
		//$window.location.href ="/UpdateUsers";
	}
    
     $timeout(
         function () { 
             $("#userList").DataTable({
                              "paging": true,
                              "lengthChange": false,
                              "searching": false,
                              "ordering": true,
                              "info": true,
                              "autoWidth": false
                                }); }, 100);
})