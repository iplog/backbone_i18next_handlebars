define([
  'app',
  'views/home_view'
], function(
  app,
  HomeView
) {
  return Backbone.Router.extend({
    routes: {
      '': 'home'
    },
    home: function() {
      app.views.home = new HomeView();
      return app.views.home.render();
    }
  });
});
