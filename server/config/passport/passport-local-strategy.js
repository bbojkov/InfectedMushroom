"use strict";

const LocalStrategy = require("passport-local").Strategy;
const User = require("mongoose").model("User");


module.exports = function (passport) {
    const authStrategy = new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password"
        },
        (username, password, done) => {
            User
                .findOne({ username })
                .then(user => {

                    if (user && user.authenticate(password, user)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                })
                .catch(error => done(error, false));
        });

    passport.use(authStrategy);
};