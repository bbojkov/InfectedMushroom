module.exports = (data) => {
    return {
        profile: (req, res) => {
            let username = req.params.currentUser;
            let options = [];

            data.users.findByUsername(username)
                .then(loadedUsername => {
                    options = { loadedUsername };
                    res.render("../views/user-profile.pug", options);
                });

        },
        settings: (req, res) => {
            res.render("../views/user-settings.pug");
        },
        getAllArticlesByAuthor: (req, res) => {
            let author = req.params.currentUser;

            let promises = [];
            promises.push(data.news.findByAuthor(author));
            promises.push(data.reviews.findByAuthor(author));
            promises.push(data.guides.findByAuthor(author));

            Promise.all(promises)
                .then(loadedArticles => {
                    let result = { loadedArticles };
                    res.render("../views/user-profile-article-posts.pug", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });
        }
    };
};
