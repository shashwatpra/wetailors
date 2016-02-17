app.factory('productSleeve',function($http,$q){
	var productSleeveFactory = {};
   
    productSleeveFactory.getProductSleeveList = function(){
		return $http.get('/api/ProductsSleeve/List')
		.success(function(data) {
			return data;
		});
	}
    
    productSleeveFactory.getBackProductList = function(){
        return $http.get('/api/ProductsBack/List')
        .success(function(data){
           return data; 
        });
    }
    
    productSleeveFactory.AddSleeveProduct = function(productSleeveData){
		return $http.post('/api/SleeveProductStyle/Add',productSleeveData)
		.success(function(data){
			return data;
		});
	}
    
    return productSleeveFactory;
});