app.factory('home',function($http,$q){
	var homeFactory = {};
	homeFactory.getUserInfo = function(){
		return $http.get('/api/user')
		.success(function(data) {
			//AuthToken.setToken(data.token);
			return data;
		});
	}

	return homeFactory;
});