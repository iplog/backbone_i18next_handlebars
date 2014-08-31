'use strict';

var Backbone = require('backbone');

var homeViews = require('./views');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  home: function() {
    var view = new homeViews.Home();
    return view.render();
  }
});
