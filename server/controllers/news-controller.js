
module.exports = function (data) {
    //console.log("in ctrlr "+ data.news.createNews);
    return {
        load: (req, res) => {
            data.news.loadLatestNews(20, 1) //TODO: page should be taken dynamically, 20 should be in config
                .then(news => {
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


            data.news.createNews(news)
                .then(() => {
                    //console.log(news);
                    res.redirect("/news")
                });
        },
        getNewsById: (req, res) => {
            let id = req.params.id
            console.log(id);
            data.news.findNewsById(id)
                .then(loadedNews => {
                    console.log(loadedNews);
                    res.render("../views/single-article.pug", loadedNews);
                });
        }
    };
};