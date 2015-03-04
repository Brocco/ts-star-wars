/// <reference path="../config/config.ts"/>
/// <reference path="./movie-controller.ts"/>
/// <reference path="./movie-data-service.ts"/>

module app {
  export class Movie {
    private static _module:ng.IModule;

    public static get module():ng.IModule {
      if (this._module) {
        return this._module;
      }

      this._module = angular.module('allergies-level-a', [
          app.Config.module.name
      ]);

      this._module.controller('MovieCtrl', movie.MovieController);
      this._module.controller('MoviesCtrl', movie.MoviesController);
      this._module.service('movieData', movie.MovieDataService);

      this._module.config(function($routeProvider){
        $routeProvider.when('/movie/:id', {
          templateUrl: 'views/movie.html',
          controller: 'MovieCtrl',
          controllerAs: 'movie'
        }).when('/movies', {
          templateUrl: 'views/movies.html',
          controller: 'MoviesCtrl',
          controllerAs: 'movies'
        })
      });

      return this._module;
    }
  }
}