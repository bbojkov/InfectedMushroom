"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local");
const userModel = require("mongoose").model("User");  //TODO: think a way to make this dependency and pass with with function


passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",

    },
    function (username, password, done) {
        userModel
            .findOne({ username: username })
            .then(user => {
                if (user &&
                    user.authenticate(password)) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, false));
    }));

passport.serializeUser((user, done) => {
    // if a valid user is passed
    // serialize user information in the session
    if(user) return done(null, user._id);
});

passport.deserializeUser((id, done) => {
    // user the id from the serialized session
    userModel.findById(id)
        .then(user => {
            if (user)
                return done(null, user);

            done(null, false)
        })
        .catch(error => done(error, false));
});