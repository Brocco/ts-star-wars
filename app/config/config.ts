module app {
  export class Config {
    private static _module: ng.IModule;

    public static get module(): ng.IModule {
      if (this._module) {
        return this._module;
      }

      this._module = angular.module('app-config', []);

      this._module.value('rootUrl', '');

      return this._module;
    }
  }
}