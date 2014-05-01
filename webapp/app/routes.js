module.exports = function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/home",
      template: require("./layouts/application.html")
    });

  $urlRouterProvider.otherwise("/home");
}