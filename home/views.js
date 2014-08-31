'use strict';

var Backbone = require('backbone');

var template = require('./templates/home');

exports.Home = Backbone.View.extend({
  el: '#app-container',
  template: template,
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
