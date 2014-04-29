"use strict";

var _ = require("lodash");

// Common Directories
var distDir = "webapp/dist";
var sassDir = "webapp/sass";
var appDir  = "webapp/app";

module.exports = function (grunt) {
  
  var commonShim = {
    "jquery": {
      path: "./node_modules/jquery/dist/jquery.js",
      exports: "$"
    },
    "angular": {
      path: "./node_modules/angular/angular.js",
      exports: "angular"
    },
    "angular-resource": {
      path: "./node_modules/angular-resource/angular-resource.js",
      depends: ["angular"]
    },
    "angular-animate": {
      path: "./node_modules/angular-animate/angular-animate.js",
      depends: ["angular"]
    },
    "angular-strap": {
      path: "./node_modules/angular-strap/dist/angular-strap.js",
      depends: ["angular", "angular-animate", "angular-strap-tpl"]
    },
    "angular-strap-tpl": {
      path: "./node_modules/angular-strap/dist/angular-strap.tpl.js",
    },
    "angular-ui-router": {
      path: "./node_modules/angular-ui-router/release/angular-ui-router.js",
      depends: ["angular"]
    },
    "moment": {
      path: "./node_modules/moment/moment.js",
      exports: "moment"
    },
    "angular-moment": {
      path: "./node_modules/angular-moment/angular-moment.js",
      depends: ["moment", "angular"]
    }
  };

  var libSource    = _.pluck(commonShim, 'path');
  var libAlias     = _.map(commonShim, function (shim, key) { return shim.path + ":" + key; });

  console.log("Common Shims:");
  _.map(libAlias, function (lib) { console.log(lib); });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    distDir: distDir,

    browserify: {

      libs: {
        src: libSource,
        dest: "<%= distDir %>/main-libs.js",
        options: {
          alias: libAlias,
          shim: commonShim
        }
      },

      app: {
        src: ["<%= appDir %>/**/*.js"],
        dest: "<%= distDir %>/main-app.js",
        options: {
          alias: libAlias,
          external: libSource,
          transform: ["partialify"],
          bundleOptions: {
            debug: true
          }
        }
      },

      all: {
        options: {
          shim: commonShim,
          alias: libAlias,
          transform: ["partialify"]
        },
        src: ["<%= appDir %>/**/*.js"],
        dest: "<%= distDir %>/main-bundle.js"
      }
    },
    sass: {
      dist: {
        options: {                       // Target options
          style: 'compressed'
        },
        files: {
          '<%= distDir %>/main.css' : '<%= sassDir %>/main.scss'
        }
      }
    },
    watch: {
      script: {
        files: ['<%= appDir %>/**/*.js', '<%= appDir %>/**/*.html'],
        tasks: ['browserify:app'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: '<%= sassDir %>/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['browserify']);
}