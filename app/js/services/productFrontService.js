app.factory('productFront',function($http,$q){
	var productFrontFactory = {};
    productFrontFactory.getProductFront = function(){
		return $http.get('/api/ProductsFront/List')
		.success(function(data) {
			return data;
		});
	}
    
    productFrontFactory.getProductList = function(){
        return $http.post('/api/getProductList')
        .success(function(data){
           return data; 
        });
    }
    
   /* productFrontFactory.AddFrontProduct = function(productFrontdtls){
        return $http.post('/api/FrontProductStyle/Add',productFrontdtls)
        .success(function(data){
           return data; 
        });
    }*/
    
    productFrontFactory.AddFrontProduct = function(productFrontData){
		return $http.post('/api/FrontProductStyle/Add',productFrontData)
		.success(function(data){
			return data;
		});
	}
    
    return productFrontFactory;
});