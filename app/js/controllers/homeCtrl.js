'use strict';
app.controller('HomeController',function(home){
	var homectl = this;

	//homectl.doclick = function(){
		//alert(homectl.homeData.id);
		home.getUserInfo()
		.success(function(data) {
			homectl.userdtls = data;
			//alert(data.username);
			//$location.path('/home');
		});
	//}

	
})
