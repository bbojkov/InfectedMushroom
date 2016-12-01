module.exports = {
    profile: (req, res) => {
        res.render("../views/user-profile.pug");
    },
    settings: (req, res) => {
        res.render("../views/user-settings.pug");
    }
};