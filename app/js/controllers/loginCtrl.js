'use strict';
app.controller('AuthController', function($rootScope,$location,login,$state){
	var logctrl = this;
    //alert('yes');
	logctrl.loggedIn = login.isLoggedIn();
	if(logctrl.loggedIn){
		if($state.current.name == "login"){
			$state.go('dashboard');
		}
	}
	
	$rootScope.$on('$stateChangeStart', function() {

		logctrl.loggedIn = login.isLoggedIn();

		login.getUser()
			.then(function(data) {
                
				logctrl.user = data.data;
			});
	});
	
	logctrl.doLogin = function(){
		login.Checklogin(logctrl.loginData.UserName, logctrl.loginData.Password)
		.success(function(data) {
			//alert(data.message);
			login.getUser()
			.then(function(data) {
				logctrl.user = data.data;
			});

			if(data.success){
				$state.go('dashboard');
				//$location.path('/home');			
			}
			else
			{
				logctrl.error = data.message;
			}
			
		});
	}

	logctrl.doLogout = function(){
		login.logout();
		$location.path('/login');
	}
});