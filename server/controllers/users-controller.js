"use strict";

const passport = require("passport");

module.exports = (data) => {
    return {
        register: (req, res) => {
            let user = req.body;
            if (user.password !== user.confirmPassword) {
                req.session.error = "Passwords do not match! Please try again!";
                res.redirect("/");
            } else if (user.password.length < 6) {
                req.session.error = "Password should be at least 6 characters long! Please try again!";
                res.redirect("/");
            } else {
                data.users.createUser(user, (createError, createdUser) => {
                    if (createError) {
                        req.session.error = `Username: "${user.username}" already exists! Please try different name.`; // "Failed to create new user, please try again!";
                        res.redirect("/");
                        return;
                    }

                    req.logIn(createdUser, (loginError) => {
                        if (loginError) {
                            res.status(400);
                            return res.send({ reason: loginError.toString() });
                        } else {
                            req.session.info = `${createdUser.username} registered and logged in successfully.`;
                            res.redirect("/");
                        }
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
                    return res({
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
            });
            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.redirect("/");
        },
        isAuthenticated(req, res, next) {
            if (!req.isAuthenticated()) {
                req.session.error = "You should be logged in to view this page!";
                res.redirect("/");
            } else {
                return next();
            }
        }
    };
};