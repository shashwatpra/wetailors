'use strict';
app.controller('ProductsSleeveController',function($rootScope,$scope,$location,$timeout,productSleeve){
    var productSleeveCtrl = this;
    productSleeveCtrl.productSleevedtls = {};
    
    productSleeveCtrl.listProductSleeve=function(){
        productSleeve.getProductSleeveList()
            .success(function(data) {
            productSleeveCtrl.productSleevedtls = {};
            productSleeveCtrl.productSleevedtls = data;
        });
    }
    
    productSleeveCtrl.listProductSleeve();
    $("#FrontProductselectedVal").val($("#BackProductselectedVal option:selected").attr("newval"));
    productSleeve.getBackProductList()
        .success(function(data)
                 {
                    productSleeveCtrl.backproductdata = data;
                    $scope.BackProductselectedVal = productSleeveCtrl.backproductdata[0]._id;
                    $scope.FrontProductselectedVal = productSleeveCtrl.backproductdata[0].FrontStyleID.FrontStyleType;
                });
    
    productSleeveCtrl.onBackProductChange = function(result){
        $scope.BackProductselectedVal = result;
        $scope.FrontProductselectedVal = $("#BackProductselectedVal option:selected").attr("newval");
    }
     
    productSleeveCtrl.AddSleeveProduct = function(){
        productSleeveCtrl.productSleeveData = {};
        productSleeveCtrl.productSleeveData.SleeveStyleType = {};
        productSleeveCtrl.productSleeveData.ImagePath = {};
        productSleeveCtrl.productSleeveData.BackProductID = {};
        productSleeveCtrl.productSleeveData.SleeveStyleType = productSleeveCtrl.productSleevedtls.SleeveStyleType;
        productSleeveCtrl.productSleeveData.ImagePath = productSleeveCtrl.productSleevedtls.ImagePath;
        
        productSleeveCtrl.productSleeveData.BackProductID['_id']=$scope.BackProductselectedVal;
        productSleeve.AddSleeveProduct(productSleeveCtrl.productSleeveData)
        .success(function(data){
            alert(data.message);
            //$scope.FrontProductselectedVal = productBackCtrl.frontproductdata[0]._id;
            productSleeveCtrl.productSleevedtls.FrontStyleType = "";
            productSleeveCtrl.productSleevedtls.ImagePath = "";
            productSleeveCtrl.listProductSleeve();
    });
    }
    
    $timeout(
         function () { 
             $("#SleeveStyleProductList").DataTable({
                              "paging": true,
                              "lengthChange": false,
                              "searching": false,
                              "ordering": true,
                              "info": true,
                              "autoWidth": false
                                }); }, 100);
    
    
});