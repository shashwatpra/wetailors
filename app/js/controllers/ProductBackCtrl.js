'use strict';
app.controller('ProductsBackController',function($rootScope,$scope,$location,$timeout,productBack){
    var productBackCtrl = this;
    productBackCtrl.productBackdtls = {};
    
    productBackCtrl.listProductBack=function(){
        productBack.getProductBackList()
            .success(function(data) {
            productBackCtrl.productBackdtls = {};
            productBackCtrl.productBackdtls = data;
        });
    }
    
    productBackCtrl.listProductBack();
    productBack.getFrontProductList()
        .success(function(data)
                 {
                    productBackCtrl.frontproductdata = data.collectionFrontProducts;
                    $scope.FrontProductselectedVal = productBackCtrl.frontproductdata[0]._id;
                });
    
    productBackCtrl.onFrontProductChange = function(result){
        $scope.FrontProductselectedVal = result;
    }
     
    productBackCtrl.AddBackProduct = function(){
        productBackCtrl.productBackData = {};
        productBackCtrl.productBackData.BackStyleType = {};
        productBackCtrl.productBackData.ImagePath = {};
        productBackCtrl.productBackData.FrontProductID = {};
        productBackCtrl.productBackData.BackStyleType = productBackCtrl.productBackdtls.BackStyleType;
        productBackCtrl.productBackData.ImagePath = productBackCtrl.productBackdtls.ImagePath;
        
        productBackCtrl.productBackData.FrontProductID['_id']=$scope.FrontProductselectedVal;
        productBack.AddBackProduct(productBackCtrl.productBackData)
        .success(function(data){
            alert(data.message);
            //$scope.FrontProductselectedVal = productBackCtrl.frontproductdata[0]._id;
            productBackCtrl.productBackdtls.FrontStyleType = "";
            productBackCtrl.productBackdtls.ImagePath = "";
            productBackCtrl.listProductBack();
    });
    }
    
    $timeout(
         function () { 
             $("#BackStyleProductList").DataTable({
                              "paging": true,
                              "lengthChange": false,
                              "searching": false,
                              "ordering": true,
                              "info": true,
                              "autoWidth": false
                                }); }, 100);
});