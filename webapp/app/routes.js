module.exports = function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/home",
      template: require("./layouts/home-layout.html")
    });

  $urlRouterProvider.otherwise("/home");
}