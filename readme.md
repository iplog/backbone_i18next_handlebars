# Backbone Boilerplate

This boilerplate has been mainly inspired by [tbranyen](https://github.com/tbranyen/) projects ([backbone-boilerplate](https://github.com/tbranyen/backbone-boilerplate) and [grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb))

## Installation

    $ cd <path_to_project>
    $ npm install
    $ npm install -g grunt

## Run project

    $ grunt server
    
This command start an express server on port 8000. You can access the app at `http://127.0.0.1:8000`.


## Build process 

The build process also uses grunt. 

1- compile template

    $ grunt handlebars
    
In order to avoid to run this command each time you modify a template file, you can use the following command

    $ grunt watch

2- compile and minify javascript files for release ([almond](https://github.com/jrburke/almond) replaces requirejs after the build). 

    $ grunt release    
    
The output file is `js/build/app.js`. You need to modify the src path in index.html.

3- concat css in one single file

    $ grunt mincss

The output file is `css/build/index.css`. You need to modify the href path in index.html.

Other grunt available commands are described in `grunt.js` file.

## What's next

Add automated test unit using the great [testem](https://github.com/airportyh/testem) tool.