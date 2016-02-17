app.factory('login',function($http, $q, AuthToken){
	var loginFactory = {};
	loginFactory.Checklogin = function(UserName, Password){
        
		return $http.post('/api/login',{
                UserName: UserName,
                Password: Password
            })
		.success(function(data) {
			AuthToken.setToken(data.token);
			return data;
		});
	}

	loginFactory.isLoggedIn = function() {
		if(AuthToken.getToken())
				return true;
		else
			return false;
	}

	loginFactory.logout = function() {
		AuthToken.setToken();
	}

	loginFactory.getUser = function() {
		if(AuthToken.getToken())
			return $http.get('/api/me');
		else
			return $q.reject({ message: "User has no token"});

	}

	return loginFactory;
})
.factory('AuthToken', function($window) {

	var authTokenFactory = {};

	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	}

	authTokenFactory.setToken = function(token) {

		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');

	}

	return authTokenFactory;
})
.factory('AuthInterceptor', function($q, $location, AuthToken) {

	var interceptorFactory = {};


	interceptorFactory.request = function(config) {

		var token = AuthToken.getToken();

		if(token) {

			config.headers['x-access-token'] = token;

		}

		return config;

	};

	return interceptorFactory;
});
