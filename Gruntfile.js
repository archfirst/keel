/*global module:true */
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // ### clean
    // grunt-contrib-clean npm task
    // Deletes the <string> paths in the array
    // Deleting the deploy directory and the .html files in the docs directory (must leave css)
    clean: {
      clean: [ 'dist', 'docs/*.html' ]
    },

    // ### compass
    // grunt-contrib-compass npm task
    compass: {
      dist: {
        options: {
          sassDir: 'dist/app/sass',
          cssDir: 'dist/app/css',
          imagesDir: 'dist/app/img',
          javascriptsDir: 'dist/app',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'src/app/sass',
          cssDir: 'src/app/css',
          imagesDir: 'src/app/img',
          javascriptsDir: 'src/app',
          environment: 'development'
        }
      }
    },

    // ### copy
    // grunt-contrib-copy npm task
    // Copy all source files to destination directory
    // We will do all further processing on the destination directory
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**'],
            dest: 'dist/'
          }
        ]
        // files: {
        //   'dist/': ['src/**/*', 'src/.htaccess']
        // }
      }
    },

    // ### jshint
    // grunt-contrib-jshint npm task
    // Validates files with JSHint
    // Only using the beforeconcat target because not using grunt-contrib-concat
    // Lints listed files before optimization
    jshint: {
      src: {
        options: {
          // Enforcing Options
          bitwise       : true,
          camelcase     : true,
          curly         : true,
          eqeqeq        : true,
          forin         : true,
          immed         : true,
          indent        : 4,
          latedef       : true,
          newcap        : true,
          noarg         : true,
          noempty       : true,
          nonew         : true,
          plusplus      : false,
          quotmark      : 'single',
          regexp        : true,
          undef         : true,
          unused        : true,
          strict        : true,
          trailing      : true,
          maxparams     : 10,
          maxdepth      : 2,
          maxstatements : 30,
          maxcomplexity : 10,
          maxlen        : 150,

          // Relaxing Options
          asi           : false,
          boss          : false,
          debug         : false,
          eqnull        : true,
          es5           : false,
          esnext        : false,
          evil          : false,
          expr          : false,
          funcscope     : false,
          globalstrict  : false,
          iterator      : false,
          lastsemic     : false,
          laxbreak      : false,
          laxcomma      : false,
          loopfunc      : false,
          multistr      : false,
          onecase       : false,
          proto         : false,
          regexdash     : false,
          scripturl     : false,
          smarttabs     : false,
          shadow        : false,
          sub           : false,
          supernew      : false,
          validthis     : false,

          // Environments
          browser       : true,
          couch         : false,
          devel         : false,
          dojo          : false,
          jquery        : false,
          mootools      : false,
          node          : false,
          nonstandard   : false,
          prototypejs   : false,
          rhino         : false,
          worker        : false,
          wsh           : false,
          yui           : false,

          // Legacy
          nomen         : false,
          onevar        : false,
          passfail      : false,
          white         : false,
          globals: {
            require: true,
            define: true
          }
        },
        files:{
          src: [
            'Gruntfile.js',
            'src/framework/*.js',
            'src/app/domain/**/*.js',
            'src/app/pages/**/*.js',
            'src/app/widgets/**/*.js',
            'src/app/app.js',
            'src/app/main.js'
          ]
        }
      },
      tests: {
        options: {
          // Enforcing Options
          bitwise       : true,
          camelcase     : true,
          curly         : true,
          eqeqeq        : true,
          forin         : true,
          immed         : true,
          indent        : 4,
          latedef       : true,
          newcap        : true,
          noarg         : true,
          noempty       : true,
          nonew         : true,
          plusplus      : false,
          quotmark      : 'single',
          regexp        : true,
          undef         : true,
          unused        : true,
          strict        : true,
          trailing      : true,
          maxparams     : 10,
          maxdepth      : 2,
          maxstatements : 30,
          maxcomplexity : 10,
          maxlen        : 150,

          // Relaxing Options
          asi           : false,
          boss          : false,
          debug         : false,
          eqnull        : true,
          es5           : false,
          esnext        : false,
          evil          : false,
          expr          : false,
          funcscope     : false,
          globalstrict  : false,
          iterator      : false,
          lastsemic     : false,
          laxbreak      : false,
          laxcomma      : false,
          loopfunc      : false,
          multistr      : false,
          onecase       : false,
          proto         : false,
          regexdash     : false,
          scripturl     : false,
          smarttabs     : false,
          shadow        : false,
          sub           : false,
          supernew      : false,
          validthis     : false,

          // Environments
          browser       : true,
          couch         : false,
          devel         : false,
          dojo          : false,
          jquery        : false,
          mootools      : false,
          node          : false,
          nonstandard   : false,
          prototypejs   : false,
          rhino         : false,
          worker        : false,
          wsh           : false,
          yui           : false,

          // Legacy
          nomen         : false,
          onevar        : false,
          passfail      : false,
          white         : false,
          globals: {
            after: true,
            afterEach: true,
            before: true,
            beforeEach: true,
            define: true,
            describe: true,
            expect: true,
            it: true,
            require: true,
            sinon: true
          }
        },
        files: {
          src: [
            'tests/specs/**/*.js'
          ]
        }
      }
    },

    mocha: {
      all: [ 'tests/runner.html' ]
    },

    // ### requirejs
    // grunt-requirejs npm task
    // Many options are identical to the r.js options
    // r.js will remove combined files, so only run this on the destination directory
    // TODO: Programmatically determine modules
    requirejs: {
      compile: {
        options: {
          dir: 'dist/',
          appDir: 'dist/',
          baseUrl: 'app/',
          mainConfigFile: 'dist/config.js',
          keepBuildDir: true,
          optimize: 'uglify2',
          skipDirOptimize: true,
          optimizeCss: 'standard',
          inlineText: true,
          useStrict: true,
          removeCombined: true,
          modules: (function() {

            // Set our main module
            var modules = [
              {
                name: 'main',
                include: ['text', 'BaseView']
              }
            ];

            var pageExclusions = ['main'];

            // This is node - require the fs module
            var fs = require('fs');

            fs.readdir('./src/app/widgets/', function(err, files) {
              // If we encounter an error, throw it
              if (err) {
                throw err;
              }
              // Loop through each file/dir and add it to our modules array
              files.forEach(addWidget);
            });

            fs.readdir('./src/app/pages/', function(err, files) {
              // If we encounter an error, throw it
              if (err) {
                throw err;
              }
              // Loop through each file/dir and add it to our modules array
              files.forEach(addPage);
            });

            function addPage(file) {
              // We only want directories. This ignores dot files
              if (!/^\.[^\n]*/.test(file)) {
                // Add the module to our array
                // This assumes each module has been added to our require config's path property as <modulename>Main
                modules.push({
                  name: 'pages/' + file + '/' + file + 'Page',
                  exclude: pageExclusions
                });
              }
            }

            function addWidget(file) {
              // We only want directories. This ignores dot files
              if (!/^\.[^\n]*/.test(file)) {

                var widgetName = 'widgets/' + file + '/' + file + 'Widget';

                pageExclusions.push(widgetName);

                // Add the module to our array
                // This assumes each module has been added to our require config's path property as <modulename>Main
                modules.push({
                  name: widgetName,
                  exclude: ['main']
                });

              }
            }

            return modules;

          // Pass in module directories from package.json
          }()),

          wrap: true,
          onBuildWrite: function(moduleName, path, contents) {
            return contents.replace(/\/src/g, '/dist');
          }
        }
      }
    },

    // ### watch
    // built-in task
    // Start with `grunt watch`
    // Will execute the listed targets on file save
    watch: {
      lint: {
        files: '<%= jshint.beforeconcat %>',
        tasks: ['jshint'],
        options: {
          interrupt: true
        }
      },
      compass: {
        files: 'src/sass/*',
        tasks: ['compass:dev'],
        options: {
          interrupt: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');

  // Default task.
  grunt.registerTask( 'default', [ 'clean', 'jshint', 'mocha', 'compass:dev', 'copy', 'requirejs', 'compass:dist' ] );

};
