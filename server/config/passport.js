const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const tokenKey = require("../config/dev").secretOrKey;
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenKey;

module.exports = function(passport){
    passport.use('login',
        new LocalStrategy({ usernameField: 'username'}, (username, password, done) => {
            User.findOne({ username }).then(user => {
                if(!user){
                    return done(null, false, {message: 'This email is not registered' })
                }
                bcryptjs.compare(password, user.password, (err, isMatch) => {
                    if(err)
                        throw err
                    if(isMatch){
                        return done(null, user)
                    }
                    else{
                        return done(null, false, {message: 'Wrong email or Password!'})
                    }
                });
            }).catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user)
        });
    });
    
    passport.use('userAuth',new JwtStrategy(opts, async (jwtPayload, done) => {
        const currentUser = await User.findById(jwtPayload._id)
        if(currentUser) return done(null,currentUser)
            return done(null,false)
    }));
}