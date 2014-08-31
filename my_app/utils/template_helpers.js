'use strict';

var Handlebars = require('handlebars');
var i18n = require('i18next-client');

var helpers = {
  t: function(i18nKey) {
    var result = i18n.t(i18nKey);
    return new Handlebars.SafeString(result);

  },
  tr: function(context, options) {
    var opts = i18n.functions.extend(options.hash, context);
    if (options.fn) {
      opts.defaultValue = options.fn(context);
    }
    var result = i18n.t(opts.key, opts);
    return new Handlebars.SafeString(result);
  }
};

for (var h in helpers) {
  if (helpers.hasOwnProperty(h)) {
    Handlebars.registerHelper(h, helpers[h]);
  }
}

module.exports = helpers;
