/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="./app-controller.ts"/>
/// <reference path="./movie/movie.ts"/>

module app {
    export class App {
        private static _module:ng.IModule;

        public static createModule(ng:ng.IAngularStatic):ng.IModule {
            if (this._module) {
                return this._module;
            }
            this._module = ng.module('app', [
                app.Movie.module.name
            ]);
            this._module.controller('AppCtrl', app.AppController);
        }
    }
}

var ng: ng.IAngularStatic = angular;

app.App.createModule(ng);