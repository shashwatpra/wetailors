'use strict';
app.controller('ProductsFrontController',function($rootScope,$scope,$location,$timeout,productFront){
    var productFrontCtrl = this;
    productFrontCtrl.productFrontdtls = {};
     productFrontCtrl.listProductFront=function(){
        productFront.getProductFront()
		.success(function(data) {
            productFrontCtrl.productFrontdtls = {};
			productFrontCtrl.productFrontdtls = data;
		});
    }
         
     productFrontCtrl.listProductFront();
      productFront.getProductList()
        .success(function(data){
        productFrontCtrl.productdata = data.collectionProducts;
        $scope.ProductselectedVal = productFrontCtrl.productdata[0]._id;
        //addUserCtrl.userdata[0].CountryID._id=$scope.CountryselectedVal;
        //productFrontCtrl.gerStatesByID($scope.CountryselectedVal);  
    });
    
    productFrontCtrl.onProductChange = function(result){
        $scope.ProductselectedVal = result;
    }
    
    productFrontCtrl.AddFrontProduct = function(){
        productFrontCtrl.productFrontData = {};
        productFrontCtrl.productFrontData.FrontStyleType = {};
        productFrontCtrl.productFrontData.ImagePath = {};
        productFrontCtrl.productFrontData.ProductID = {};
        productFrontCtrl.productFrontData.FrontStyleType = productFrontCtrl.productFrontdtls.FrontStyleType;
        productFrontCtrl.productFrontData.ImagePath = productFrontCtrl.productFrontdtls.ImagePath;
        
        productFrontCtrl.productFrontData.ProductID['_id']=$scope.ProductselectedVal;
        productFront.AddFrontProduct(productFrontCtrl.productFrontData)
        .success(function(data){
            alert(data.message);
            $scope.ProductselectedVal = productFrontCtrl.productdata[0]._id;
            productFrontCtrl.productFrontdtls.FrontStyleType = "";
            productFrontCtrl.productFrontdtls.ImagePath = "";
            productFrontCtrl.listProductFront();
        });
    }
    
    $timeout(
         function () { 
             $("#productFrontStyle").DataTable({
                              "paging": true,
                              "lengthChange": false,
                              "searching": false,
                              "ordering": true,
                              "info": true,
                              "autoWidth": false
                                }); }, 100);
});