module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // ### clean
    // grunt-contrib-clean npm task
    // Deletes the <string> paths in the array
    // Deleting the deploy directory and the .html files in the docs directory (must leave css)
    clean: {
      clean: [ "dist", "docs/*.html" ]
    },

    // ### compass
    // grunt-contrib-compass npm task
    compass: {
      dist: {
        options: {
          sassDir: "dist/app/sass",
          cssDir: "dist/app/css",
          imagesDir: "dist/app/img",
          javascriptsDir: "dist/app",
          environment: "production"
        }
      },
      dev: {
        options: {
          sassDir: "src/app/sass",
          cssDir: "src/app/css",
          imagesDir: "src/app/img",
          javascriptsDir: "src/app",
          environment: "development"
        }
      }
    },

    // ### copy
    // grunt-contrib-copy npm task
    // Copy all source files to destination directory
    // We will do all further processing on the destination directory
    copy: {
      dist: {
        files: {
          "dist/": ["src/**/*", "src/.htaccess"]
        }
      }
    },

    // ### jshint
    // grunt-contrib-jshint npm task
    // Validates files with JSHint
    // Only using the beforeconcat target because not using grunt-contrib-concat
    // Lints listed files before optimization
    jshint: {
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        eqnull: true
      },
      beforeconcat: [
        "Gruntfile.js",
        "src/app/domain/*.js",
        "src/app/framework/*.js",
        "src/app/widgets/*.js",
        "src/app/*.js"
      ]
    },

    // ### requirejs
    // grunt-requirejs npm task
    // Many options are identical to the r.js options
    // r.js will remove combined files, so only run this on the destination directory
    // TODO: Programmatically determine modules
    requirejs: {
      compile: {
        options: {
          dir: "dist/",
          appDir: "dist/",
          baseUrl: 'app/',
          mainConfigFile: 'dist/app/main.js',
          keepBuildDir: true,
          optimize: 'uglify2',
          skipDirOptimize: true,
          optimizeCss: 'standard',
          inlineText: true,
          useStrict: true,
          removeCombined: true,
          modules: (function(moduleDirs) {

            // Set our main module
            var modules = [
              {
                name: 'main',
                include: ['text', 'framework/BaseView']
              }
            ];

            // This is node - require the fs module
            var fs = require('fs');

            fs.readdir('./src/app/pages/', function(err, files) {
              // If we encounter an error, throw it
              if (err) {
                throw err;
              }
              // Loop through each file/dir and add it to our modules array
              files.forEach(addPage);
            });

            fs.readdir('./src/app/widgets/', function(err, files) {
              // If we encounter an error, throw it
              if (err) {
                throw err;
              }
              // Loop through each file/dir and add it to our modules array
              files.forEach(addWidget);
            });

            function addPage(file) {
              // We only want directories. This ignores dot files
              if (!/\..*/.test(file)) {
                // Add the module to our array
                // This assumes each module has been added to our require config's path property as <modulename>Main
                modules.push({
                  name: 'pages/' + file + '/' + file + 'Page',
                  exclude: ['main']
                });
              }
            }

            function addWidget(file) {
              // We only want directories. This ignores dot files
              if (!/\..*/.test(file)) {
                // Add the module to our array
                // This assumes each module has been added to our require config's path property as <modulename>Main
                modules.push({
                  name: 'widgets/' + file + '/' + file + 'Widget',
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

  // Default task.
  grunt.registerTask( "default", [ "clean", "jshint", "compass:dev", "copy", "requirejs", "compass:dist" ] );

};
