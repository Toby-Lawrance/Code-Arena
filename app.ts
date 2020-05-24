import * as debug from 'debug';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import routes from './routes/index';
import users from './routes/user';

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

app.use('/', routes);
app.use('/users', users);

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
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
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
import { Robot } from "./Robot";
import { BattleRobot } from "./BattleRobot";
import * as components from "./RobotComponents";
//var Robot = require("./Robot.js");
//var BattleRobotTest = require("./BattleRobot.js");
//var components = require("./RobotComponents.js");

var rob = new Robot("robo", components.chassis.find((c) => c.name == "Rounded"), components.armours.find((c) => c.name == "Rounded"), components.weapons.find((c) => c.name == "Medium"), `let x = 0; function main() {x=x+1;log(x);Robot.move(5*x);}`);
var brob = new BattleRobot(rob);
brob.runTick();
brob.runTick();
brob.runTick();
console.log(JSON.stringify(brob));