"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const user_1 = require("./routes/user");
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/users', user_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 42075);
const server = app.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
});
//Testing
const Robot_1 = require("./Robot");
const BattleRobot_1 = require("./BattleRobot");
const components = require("./RobotComponents");
//var Robot = require("./Robot.js");
//var BattleRobotTest = require("./BattleRobot.js");
//var components = require("./RobotComponents.js");
var rob = new Robot_1.Robot("robo", components.chassis.find((c) => c.name == "Rounded"), components.armours.find((c) => c.name == "Rounded"), components.weapons.find((c) => c.name == "Medium"), `let x = 0; function main() {x=x+1;log(x);Robot.move(5*x);}`);
var brob = new BattleRobot_1.BattleRobot(rob, 0, 0);
brob.runTick();
brob.runTick();
brob.runTick();
console.log(JSON.stringify(brob));
//# sourceMappingURL=app.js.map