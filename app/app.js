// add this file in each module that contains a dependency with a shim
// just load the main shims. Thei dependencies will be loaded at the same
// time => no need to load lodash or jquery if you load Backbone ;) and
// templates has Handlebars has dependency
define([
  // shims
  'backbone',
  'templates',
  // utils
  'utils/helpers'
], function() {
  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: '/',
    views: {},
    models: {},
    collections: {}
  };

  return app;
});
