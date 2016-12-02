module.exports = (data) => {
    return {
        profile: (req, res) => {
            let username = req.params.currentUser;
            let options = [];

            data.users.findByUsername(username)
                .then(loadedUsername => {
                    options = {
                        loadedUsername
                    };
                    res.render("../views/user-profile.pug", options);
                });

        },
        settings: (req, res) => {
            res.render("../views/user-settings.pug");
        }
    };
};