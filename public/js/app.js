var app = angular.module('toDo',['ngMaterial']);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[{');
  $interpolateProvider.endSymbol('}]');
});