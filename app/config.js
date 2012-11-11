// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ['main'],

  paths: {
    // Libraries
    jquery: '../js/libs/jquery',
    lodash: '../js/libs/lodash',
    backbone: '../js/libs/backbone',
    i18n: '../js/libs/i18next.amd-1.5.8',
    handlebars: '../js/libs/handlebars.runtime',
    templates: '../js/build/templates'
  },

  shim: {
    backbone: {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    templates: {
      deps: ['handlebars']
    }
  }
});
