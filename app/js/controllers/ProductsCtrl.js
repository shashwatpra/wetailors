
'use strict';
app.controller('ProductsController',function($rootScope,$scope,$location,$timeout,product){
    var productsCtrl = this;
    productsCtrl.listProduct=function(){
        product.getProducts()
		.success(function(data) {
			productsCtrl.productdtls = data;
            for(var i = 0;i<data.length;i++){
                if(data[i].ForGender == 'M'){
                    data[i].ForGender = 'Male';
                }
                else{
                    data[i].ForGender = 'Female';
                }
            }
		});    
    }
    
    productsCtrl.listProduct();
    productsCtrl.AddProduct = function(){
        product.addProducts(productsCtrl.productdata)
		.success(function(data){
			alert(data.message);
            productsCtrl.productdata.ProductName = "";
            productsCtrl.productdata.ForGender = "";
            productsCtrl.productdata.Price = "";
            productsCtrl.listProduct();
		});
    }
    
    productsCtrl.keyChange = function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        //$("#errmsg").html("Digits Only").show().fadeOut("slow");
               return false;
    }
   }
    
     $timeout(
         function () { 
             $("#example2").DataTable({
                              "paging": true,
                              "lengthChange": false,
                              "searching": false,
                              "ordering": true,
                              "info": true,
                              "autoWidth": false
                                }); }, 100);
    
    //$scope.assignmentsLoaded = function (data, status) {
    //    $scope.assignments = data;
    //}
});