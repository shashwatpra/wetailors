app.factory('user',function($http,$q){
	var userFactory = {};

	userFactory.getUserInfo = function(){
		return $http.get('/api/user')
		.success(function(data) {
			//AuthToken.setToken(data.token);
			return data;
		});
	}

	userFactory.Addusers = function(userData){
		return $http.post('/api/user',userData)
		.success(function(data){
			return data;
		});
	}

	userFactory.DeleteUsers = function(userData){
		return $http.post('/api/user/delete', userData)
		.success(function(data){
			return data;
		});
	}

	userFactory.getUserbyid=function(_id){
		return $http.post('/api/getuserbyid',{'_id':_id})
		.success(function(user){
			return user;
		});
	}
    
    userFactory.getCity=function(_id){
        return $http.post('/api/getCityList',{'_id':_id})
        .success(function(result){
            return result;
        });
    }
    
    userFactory.getCountry=function(_id){
        return $http.post('/api/getCountryList',{})
        .success(function(result){
            return result;
        });
    }
    
    userFactory.getStateByid=function(_id){
        return $http.post('/api/getStateList',{'_id':_id})
        .success(function(result){
            return result;
        });
    }
    
    userFactory.getAreaByid = function(_id){
        return $http.post('/api/getAreaByid',{'_id':_id})
        .success(function(result){
           return result; 
        });
    }
    
	userFactory.UpdateUser=function(userData){
		return $http.post('/api/user/update',userData)
		.success(function(data){
			return data;
		});
	}

	return userFactory;
});