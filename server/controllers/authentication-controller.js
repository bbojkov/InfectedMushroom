"use strict";

const passport = require("passport");

module.exports = (data) => {
    return {
        register: (req, res) => {
            let user = req.body;
            if (user.password !== user.confirmPassword) {
                res.render("../views/portal.pug", { globalError: "Pass not matching" });
            } else {
                data.users.createUser(user)
                    .then(returnUser => {
                        req.logIn(returnUser, (err) => {
                            if (err) {
                                console.log("Cant create user!!!");
                                console.log(err);
                            }
                            res.redirect("/");
                        });
                    });
            }
        },
        login(req, res, next) {
            const auth = passport.authenticate("local", (error, user) => {
                if (error) {
                    return next(error);
                }

                if (!user) {
                    res({
                        success: false,
                        message: "Invalid name or password"
                    });
                }

                let userCredentials = req.body;

                data.users.findByUsername(userCredentials.username)
                    .then(foundUser => {
                        req.logIn(foundUser, (err) => {
                            if (err) {
                                console.log("Cant login");
                                return err;
                            }
                            res.redirect("/");
                        });
                    });
                res.redirect("/");
            });
            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.redirect("/");
        }
    };
};