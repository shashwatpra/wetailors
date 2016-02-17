app.factory('productBack',function($http,$q){
	var productBackFactory = {};
   
    productBackFactory.getProductBackList = function(){
		return $http.get('/api/ProductsBack/List')
		.success(function(data) {
			return data;
		});
	}
    
    productBackFactory.getFrontProductList = function(){
        return $http.post('/api/getFrontProductList')
        .success(function(data){
           return data; 
        });
    }
    
    productBackFactory.AddBackProduct = function(productBackData){
		return $http.post('/api/BackProductStyle/Add',productBackData)
		.success(function(data){
			return data;
		});
	}
    
    return productBackFactory;
});