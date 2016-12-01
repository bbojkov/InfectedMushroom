module.exports = function (data) {
    return {
        load: (req, res) => {
            let currentPage = +req.query.page || 1;
            let pagesCount;
            data.news.getTotalNewsCount()
                .then(newsCount => {

                    if (newsCount % 7 === 0) {
                        pagesCount = newsCount / 7;
                    } else {
                        pagesCount = ((newsCount / 7) + 1) | 0;
                    }

                    return data.news.loadNewsPage(7, currentPage);
                })
                .then(news => {
                 
                    let path = req.path;
                    let result = {
                        articles: news,
                        type: path,
                        pagesCount: pagesCount
                    }
                    res.render("../views/news", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });;


        },
        edit: (req, res) => {
            let id = req.params.id
            let mainPath = req.path.substring(req.path.indexOf('/', 1), (req.path.indexOf('/', req.path.indexOf('/', 1) + 1)));
            data.news.findNewsById(id)
                .then(newsToEdit => {
                    let result = {
                        article: newsToEdit,
                        type: mainPath
                    }
                    res.render("../views/edit-form", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });;
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
                    res.redirect("/news");
                })
                .catch(() => {
                    res.redirect("/err");
                });
        },
        update: (req, res) => {
            let id = req.params.id;
            let body = req.body;
            data.news.updateNews(id, body)
                .then(() => {
                    res.redirect("/news/" + id);
                })
                .catch(() => {
                    res.redirect("/err");
                });;
        },
        getNewsById: (req, res) => {
            let id = req.params.id;
            let mainPath = req.path.substring(0, req.path.indexOf('/', 1));
            data.news.findNewsById(id)
                .then(loadedNews => {
                    let result = {
                        article: loadedNews,
                        type: mainPath
                    }
                    res.render("../views/single-article", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });

        },
        showForm: (req, res) => {
            let articleType = req.params.article;
            if (articleType !== "news") {
                res.redirect("/err");
            }
            res.render("../views/create-form", { result: articleType });
        }
    };
};