define([
  'app'
], function(
  app
) {
  return Backbone.View.extend({
    el: '#appContainer',
    template: Handlebars.templates.home,
    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
});

