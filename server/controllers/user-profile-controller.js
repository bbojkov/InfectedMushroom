module.exports = (data) => {
    return {
        profile: (req, res) => {
            let username = req.params.currentUser;

            console.log(data.users.findByUsername(username));

            data.users.findByUsername(username)
                .then(loadedUsername => {
                    console.log(loadedUsername);
                    let options = {
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