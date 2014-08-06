

#work11_1を起点に、p5, p17にコピーする (html以外)


# JADE_FILE_PATH = 
#     "build/work11_1/work11_1.html" : "jade/work11_1.jade"

CSS_DIR = 'css/'

JS_DIR = 'javascripts/'





module.exports = (grunt) ->

    conf =

        pkg: grunt.file.readJSON('package.json')


        jade:
            compile:
                options:
                    pretty: true
                # files: JADE_FILE_PATH

        coffee:
            compile:
                options:
                    bare: true
                files: [
                    expand: true
                    cwd: 'coffee'
                    src: ['**/*.coffee']
                    dest: JS_DIR
                    ext: '.js'
                ]

        compass:
            dist:
                options:
                    sassDir: "sass"
                    cssDir: CSS_DIR


        connect:
            server:
                options:
                    port: 3000
                    hostname: "*"
                    livereload: 35729

        esteWatch:
            options:
                dirs: [
                    "jade/**"
                    "coffee/**"
                    "sass/**"
                    "./*"
                    JS_DIR
                    CSS_DIR
                ]
                livereload:
                    enabled: true
                    extensions: ['js', 'html', 'css']
                    port: 35729
            coffee: (path) -> ['newer:coffee']
            jade: (path) -> ['jade']
            sass: (path) -> ['compass']

    grunt.initConfig conf





    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-contrib-jade'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-este-watch'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    grunt.loadNpmTasks 'grunt-ftp-deploy'
    grunt.loadNpmTasks 'grunt-contrib-compass'
    grunt.loadNpmTasks 'grunt-newer'


    grunt.registerTask 'make', ['newer:coffee', 'newer:jade', 'newer:compass']
    grunt.registerTask 'default', ['make', 'connect', 'esteWatch']


    return
