/** @param {!Object} config */
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../app/**/*_test.ts',
      {
        pattern: '../app/**/!(*_test).ts',
        included: false
      }
    ],
    preprocessors: {
      '../typings/jasmine/jasmine.d.ts': ['typescript'],
      '../app/**/*.ts': ['typescript']
    },
    typescriptPreprocessor: {
      options: {
        sourceMap: true,
        target: 'ES5',
        noResolve: false
      },
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
    },
    //reporters: ['progress', 'growl'],
    colors: true
  });
};
