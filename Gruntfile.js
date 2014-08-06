(function() {
  var CSS_DIR, JADE_FILE_PATH, JS_DIR, STYLUS_FILE_PATH;

  STYLUS_FILE_PATH = {
    "build/work11_1/css/style.css": "sass/style.styl"
  };

  JADE_FILE_PATH = {
    "build/work11_1/work11_1.html": "jade/work11_1.jade"
  };

  CSS_DIR = 'build/work11_1/css/';

  JS_DIR = 'build/work11_1/js/';

  module.exports = function(grunt) {
    var conf;
    conf = {
      pkg: grunt.file.readJSON('package.json'),
      jade: {
        compile: {
          options: {
            pretty: true
          },
          files: JADE_FILE_PATH
        }
      },
      coffee: {
        compile: {
          options: {
            bare: true
          },
          files: [
            {
              expand: true,
              cwd: 'coffee',
              src: ['**/*.coffee'],
              dest: JS_DIR,
              ext: '.js'
            }
          ]
        }
      },
      compass: {
        dist: {
          options: {
            sassDir: "sass",
            cssDir: CSS_DIR
          }
        }
      },
      stylus: {
        compile: {
          options: {
            compress: false
          },
          files: STYLUS_FILE_PATH
        }
      },
      connect: {
        server: {
          options: {
            port: 3000,
            hostname: "*",
            livereload: 35729
          }
        }
      },
      esteWatch: {
        options: {
          dirs: ["jade/**", "coffee/**", "sass/**", "build/work11_1/**"],
          livereload: {
            enabled: true,
            extensions: ['js', 'html', 'css'],
            port: 35729
          }
        },
        coffee: function(path) {
          return ['newer:coffee'];
        },
        jade: function(path) {
          return ['jade'];
        },
        sass: function(path) {
          return ['compass'];
        },
        stylus: function(filepath) {
          return ['stylus'];
        },
        styl: '<%= esteWatch.stylus %>'
      }
    };
    grunt.initConfig(conf);
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('make', ['newer:coffee', 'newer:jade', 'newer:compass', 'stylus']);
    grunt.registerTask('default', ['make', 'connect', 'esteWatch']);
  };

}).call(this);
