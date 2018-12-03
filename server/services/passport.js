const 

passport    = require('passport'),
passportJWT = require("passport-jwt"),
mongoose = require('mongoose'),
User = mongoose.model("users"),
{enCrypt} = require('../helpers'),

keys = require('../config/keys'),

ExtractJWT = passportJWT.ExtractJwt,

LocalStrategy = require('passport-local').Strategy,
JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy(
     async (email, password, cb) => {
        const user = await User.findOne({email,password:enCrypt(password)});

        if (user) return cb(null, user);

        return cb(null, false);
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : keys.jwtKey
    },
    (jwtPayload, cb) => {
        return cb(null, jwtPayload);
    }
));