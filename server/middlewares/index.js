cookieParser = require('cookie-parser'),
bodyParser = require('body-parser');

module.exports = app=>{
    app.use(bodyParser.json({limit:"5mb"}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use((req, res, next)=> {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
}