/*
 * Grunt Task File
 * ---------------
 *
 * Task: Server
 * Description: Serve the web application.
 * Dependencies: express
 *
 */

module.exports = function(grunt) {

  var _ = grunt.utils._;
  // Shorthand Grunt functions
  var log = grunt.log;

  grunt.registerTask("server", "Run development server.", function(prop) {
    var options, done;
    var props = ["server"];
    var args = this.args;

    // Only keep alive if watch is not set.
    done = args[args.length-1] === "watch" ? function() {} : this.async();

    // If a prop was passed as the argument, use that sub-property of server.
    if (prop) { props.push(prop); }

    // Defaults set for server values
    options = _.defaults(grunt.config(props) || {}, {
      favicon: "./favicon.ico",
      index: "./index.html",

      port: process.env.PORT || 8000,
      host: process.env.HOST || "127.0.0.1"
    });

    options.folders = options.folders || {};

    // Ensure folders have correct defaults
    options.folders = _.defaults(options.folders, {
      app: "./app",
      assets: "./assets",
      dist: "./dist"
    });

    options.files = options.files || {};

    // Ensure files have correct defaults
    options.files = _.defaults(options.files, {
      "app/config.js": "app/config.js"
    });

    // Run the server
    grunt.helper("server", options);

    // Fail task if errors were logged
    if (grunt.errors) { return false; }
  });

  grunt.registerHelper("server", function(options) {
    // Require libraries.
    var http = require('http');
    var fs = require("fs");
    var path = require("path");
    var express = require("express");

    // If the server is already available use it.
    var app = options.server ? options.server() : express();

    // Allow users to override the root.
    var root = _.isString(options.root) ? options.root : "/";

    // Some basic conf
    app.configure(function() {
      app.set('port', options.port);
      app.use(express.logger('dev'));
      app.use(express.favicon(options.favicon));
    });


    // Process stylus stylesheets.
    app.get(/.styl$/, function(req, res) {
      var url = req.url.split("css/")[1];
      var file = path.join("css", url);

      fs.readFile(file, function(err, contents) {
        grunt.helper("stylus", contents.toString(), {
          paths: ["assets/css/", require("nib").path]
        }, function(css) {
          res.header("Content-type", "text/css");
          res.send(css);
        });
      });
    });

    // Process LESS stylesheets.
    app.get(/.less$/, function(req, res) {
      var url = req.url.split("css/")[1];
      var file = path.join("css", url);

      fs.readFile(file, function(err, contents) {
        grunt.helper("less", contents.toString(), {
          paths: ["css/"]
        }, function(css) {
          res.header("Content-type", "text/css");
          res.send(css);
        });
      });
    });

    // Process json files .
    app.get(/.json$/, function(req, res) {
      var url = req.url.split("locales/")[1];
      url = url.split('?')[0];
      var file = path.join("locales", url);

      fs.readFile(file, function(err, contents) {
        res.header("Content-type", "application/json");
        res.send(contents);
      });
    });

    // Map static folders.
    Object.keys(options.folders).sort().reverse().forEach(function(key) {
      app.get(root + key + "/*", function(req, res, next) {
        // Find filename.
        var filename = req.url.slice((root + key).length);

        res.sendfile(path.join(options.folders[key] + filename));
      });
    });

    // Map static files.
    if (_.isObject(options.files)) {
      Object.keys(options.files).sort().reverse().forEach(function(key) {
        app.get(root + key, function(req, res) {
          return res.sendfile(options.files[key]);
        });
      });
    }

    // Ensure all routes go home, client side app..
    app.all("*", function(req, res) {
      fs.createReadStream(options.index).pipe(res);
    });

    http.createServer(app).listen(app.get('port'), function(){
      log.writeln("Listening on http://" + options.host + ":" + options.port);
    });
  });

};
