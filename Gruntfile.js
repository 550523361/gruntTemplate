/**
 * Created by Administrator on 2017/8/29.
 */


module.exports=function (grunt) {

    grunt.initConfig({
        clean:{
            before:{
                src:["build"]
            },
            after:{
                src:["build/{css,js}/*.*","!build/{css,js}/*.min.*.*"]
            }
        },
        copy:{
            cssFile:{
                expand:true,
                src:["**"],
                dest:"build",
                cwd:"src",
                exd:".*"
            }
        },
        autoprefixer:{
            css:{
                expand:true,
                src:["**/*.css"],
                dest:"build",
                cwd:"build"
            }
        },
        concat:{
            generated:{
                    files:{
                        "build/css/all.concat.css":["build/**/*.css","!build/**/all.min.css","!build/**/all.concat.css"],
                        "build/js/all.concat.js":["build/**/*.js","!build/**/all.min.js","!build/**/all.concat.js"]
                    }
            }
        },
        uglify:{
            generated:{
                files:{
                    "build/js/all.min.js":"build/js/all.concat.js",
                }
            }
        },
        cssmin:{
            generated:{
                    files:{
                        "build/css/all.min.css":["build/css/all.concat.css"]
                    }
            }
        },
        htmlmin:{
            options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
            },
            html:{
                expand:true,
                src:["**/*.html"],
                dest:"build",
                cwd:"build"
            }
        },
        useminPrepare:{
            html:"index.html"
        },
        filerev:{
            images:{
                expand:true,
                cwd:"build",
                src:["images/**"],
                dest:"build"
            },
            minjs:{
                src:["build/js/all.min.js"]
            },
            mincss:{
                src:["build/css/all.min.css"]
            },
        },
        usemin:{
            html:"build/index.html",
            css:"build/css/*.css",
            options:{

            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-usemin");
    grunt.loadNpmTasks("grunt-filerev");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");

    grunt.registerTask("default",["clean","copy","autoprefixer","useminPrepare","concat:generated","cssmin:generated","uglify:generated","filerev","usemin","htmlmin"])
    grunt.registerTask("product",["clean","copy","autoprefixer","useminPrepare","concat:generated","cssmin:generated","uglify:generated","filerev","usemin","htmlmin","clean:after"])
};