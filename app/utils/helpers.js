define([
  'i18n',
  'templates'
], function(
  i18n
) {
  var helpers = {
    t: function(i18n_key) {
      var result = i18n.t(i18n_key);
      return new Handlebars.SafeString(result);
    },
    tr: function(context, options) {
      var opts = i18n.functions.extend(options.hash, context);
      if (options.fn) opts.defaultValue = options.fn(context);
      var result = i18next.t(opts.key, opts);
      return new Handlebars.SafeString(result);
    }
  };

  for (var h in helpers) {
    Handlebars.registerHelper(h, helpers[h]);
  }
  return helpers;
});
