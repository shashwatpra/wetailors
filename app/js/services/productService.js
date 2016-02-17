app.factory('product',function($http,$q){
	var productFactory = {};
    productFactory.getProducts = function(){
		return $http.get('/api/Products/List')
		.success(function(data) {
			return data;
		});
	}
    
    productFactory.addProducts = function(productData){
		return $http.post('/api/Products/Add',productData)
		.success(function(data){
			return data;
		});
	}
    
    return productFactory;
});