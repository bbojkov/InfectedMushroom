
module.exports = function (data) {
    //console.log("in ctrlr "+ data.news.createNews);
    return {
        load: (req, res) => {
            data.news.loadLatestNews(20, 1) //TODO: page should be taken dynamically, 20 should be in config
                .then(news => {
                    console.log(req.user)
                    console.log(news)                    
                    res.render("../views/news", { result: news });
                });
        },
        showForm: (req, res) => {
            res.render("../views/news-create");
        },
        create: (req, res) => {
            let news = req.body;
            let author = {
                username: req.user.username,
                _id: req.user._id
            };
            news.author = author;
            news.tags = news.tags.split(",").map(tag => tag.trim());
            console.log(news);

            data.news.createNews(news)
                .then(() => res.redirect("/news"));

        },
        test: (req, res) => {
            res.render("../views/test.pug")
        }
    };
};