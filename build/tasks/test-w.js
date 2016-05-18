var gulp = require('gulp');
var Server = require('karma').Server;
var isVerbose = true;

/**
 * Run tests and watch
 */
gulp.task('test-w', function (done) {
    new Server({
        configFile: __dirname + '/../../karma.conf.js',
        client: { captureConsole: isVerbose },
        browsers: ['Chrome'],
        singleRun: false
    }, done).start();
});