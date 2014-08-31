'use strict';

var Backbone = require('backbone');
var i18n = require('i18next-client');
var $ = require('jquery');

Backbone.$ = $;

require('./my_app/utils/template_helpers');
var HomeRouter = require('./home/router');

new HomeRouter();

i18n.init({}, function() { // t
  // Trigger the initial route and enable HTML5 History API support, set
  // the root folder to '/' by default.
  Backbone.history.start({
    pushState: true,
    root: '/'
  });
});
