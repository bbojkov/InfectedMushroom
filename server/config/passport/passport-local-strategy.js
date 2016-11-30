"use strict";

const LocalStrategy = require("passport-local").Strategy;
// const hashing = require("../../utilities/encryption");
const User = require("mongoose").model("User");

// function comparePasswords(requestPassword, user) {
//     return hashing.generateHashedPassword(user.salt, requestPassword === user.hashedPass);
// }

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
                     //let aut =  user.authenticate(password, user);
                     //console.log(aut);
                     
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