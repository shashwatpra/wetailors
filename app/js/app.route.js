'use strict';
app.config(['$stateProvider','$locationProvider', function($stateProvider, $locationProvider){
	$stateProvider
      .state('home', {
        url : '/home',
        templateUrl : 'views/home.html',
        controller : 'HomeController',
        controllerAs: 'home'
      })
      .state('login', {
        url : '/login',
        templateUrl : 'views/login.html',
        controller : 'AuthController',
        controllerAs: 'login'
      })
      .state('AddUsers', {
        url : '/AddUsers',
        templateUrl : 'views/Users/InternalUsers/AddUsers.html',
        controller : 'AddUserController',
        controllerAs: 'Addusers'
      })
      .state('AllUsers', {
        url : '/AllUsers',
        templateUrl : 'views/Users/InternalUsers/deleteUsers.html',
        controller : 'DeleteUserController',
        controllerAs:'deleteUser'
      })
      .state('UpdateUsers', {
        url : '/UpdateUsers',
        templateUrl : 'views/Users/InternalUsers/updateUser.html',
        controller : 'UpdateUsersController',
        controllerAs:'updateUser'
      })
      .state('AllProducts',{
        url:'/AllProducts',
        templateUrl: 'views/Products/MainProducts/productsList.html',
        controller: 'ProductsController',
        controllerAs: 'products'
    })
    .state('AddProduct',{
        url:'/ProductsCategoryAdd',
        templateUrl:'views/Products/MainProducts/productsAdd.html',
        controller: 'ProductsController',
        controllerAs:'products'
    })
    .state('UpdateProduct',{
        url:'/ProductsCategoryUpdate',
        templateUrl:'views/Products/MainProducts/productUpdate.html',
        controller:'ProductsController',
        controllerAs: 'products'
    })
    .state('ProductFrontStyle',{
        url:'/ProductFrontStyle',
        templateUrl:'views/Products/FrontStyle/productFrontStyleList.html',
        controller:'ProductsFrontController',
        controllerAs: 'productsFront'
    })
    .state('ProductFrontStyleAdd',{
        url:'/ProductFrontStyleAdd',
        templateUrl:'views/Products/FrontStyle/ProductFrontStyleAdd.html',
        controller: 'ProductsFrontController',
        controllerAs: 'productsFront'
    })
    .state('ProductBackStyle',{
        url:'/ProductBackStyleList',
        templateUrl:'views/Products/BackStyle/productBackStyleList.html',
        controller:'ProductsBackController',
        controllerAs: 'productsBack'
    })
    .state('ProductBackStyleAdd',{
        url:'/ProductBackStyleAdd',
        templateUrl:'views/Products/BackStyle/ProductBackStyleAdd.html',
        controller: 'ProductsBackController',
        controllerAs: 'productsBack'
    })
    .state('ProductSleeveStyleAdd',{
        url:'/ProductSleeveStyleAdd',
        templateUrl:'views/Products/SleeveStyle/ProductSleeveStyleAdd.html',
        controller: 'ProductsSleeveController',
        controllerAs: 'productsSleeve'
    })
      // .state('dashboard',{
      //   url : '/dashboard',
      //   templateUrl : 'views/dashboard.html',
      //   controller : 'DashboardController',
      //   controllerAs:'dashboard'
      // })
      .state('dashboard', {
        url: '/dashboard',
        views:{
          '':{templateUrl:'views/dashboard.html'},
          'home@dashboard':{
            templateUrl : 'views/home.html',
            controller : 'HomeController',
            controllerAs: 'home'
          },
            'products@dashboard':{
            templateUrl : 'views/Products/MainProducts/products.html',
            controller : 'ProductsController',
            controllerAs: 'products'
          }
        }
      });
      $locationProvider.html5Mode({enabled: true, requireBase: false});
}]);
// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
// 	$routeProvider
// 	.when('/home',{
// 		templateUrl:'views/home.html',
// 		controller: 'HomeController',
// 		controllerAs: 'home'
// 	})
// 	.when('/login',
// 	{
// 		templateUrl: 'views/login.html',
// 		controller: 'AuthController',
// 		controllerAs: 'login'
// 	})
// 	.when('/AddUsers',
// 	{
// 		templateUrl: 'views/Addusers.html',
// 		controller: 'AddUserController',
// 		controllerAs: 'Addusers'
// 	})
// 	.when('/AllUsers',{
// 		templateUrl:'views/deleteUsers.html',
// 		controller:'DeleteUserController',
// 		controllerAs:'deleteUser'
// 	})
// 	.when('/UpdateUsers',{
// 		templateUrl:'views/updateUser.html',
// 		controller: 'UpdateUsersController',
// 		controllerAs:'updateUser'
// 	})
// 	.when('/dashboard',{
// 		templateUrl:'views/dashboard.html',
// 		controller:'DashboardController',
// 		controllerAs:'dashboard'
// 	})
// 	.otherwise({
//         redirectTo:'/login'
//     });
// 	$locationProvider.html5Mode({enabled: true, requireBase: false});
// }]);
