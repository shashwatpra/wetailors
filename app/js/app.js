'use strict';
var app = angular.module('SampleApp',['ui.router'])
.config(function($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');
});