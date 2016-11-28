
module.exports = function(data) {
    return {
        signUp: (req, res) => {
            let { username, passHash } = req.body;
            data.users.createUser(username, passHash, "aaa", "aaa", "aaa", "aaa", "user")
                .then(user => {
                    res.redirect("/sign-in");
                });
        },
        signOut: (req, res) => {
            req.logout();
            res.redirect("/");
        },
        getSignUpForm: (req, res) => {
            res.render("../views/authentication/sign-up");
        },
        getSignInForm: (req, res) => {
            res.render("../views/authentication/sign-in");
        }
    };
};