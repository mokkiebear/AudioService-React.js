const winston = require('winston');
var createError = require('http-errors');
require('winston-mongodb');
require('express-async-errors');


module.exports = function(){
    const logger = winston.createLogger({
        transports: [ new winston.transports.File({ filename: 'logfile.log' }),
                      new winston.transports.MongoDB({ db: 'mongodb://localhost/scrumController' }),
                      new winston.transports.Console({ colorize: true, prettyPrint: true })
                    ]
    });


    /*process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });*/

    winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
    winston.exceptions.handle(new winston.transports.Console({ colorize: true, prettyPrint: true }));

    process.on('unhandledRejection', (ex) => {
    /*logger.error(ex.message, ex);
    process.exit(1);*/
        throw ex;
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
    
    // error handler
    app.use(function(err, req, res, next) {
        logger.log('error', err.message, err);
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};