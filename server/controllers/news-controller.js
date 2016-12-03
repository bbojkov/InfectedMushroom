module.exports = function (data, validator) {
    return {
        load: (req, res) => {
            let currentPage = Number(req.query.page) || 1;
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
                    };
                    res.render("../views/news", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });

        },
        edit: (req, res) => {
            let id = req.params.id;
            let mainPath = req.path.substring(req.path.indexOf("/", 1), (req.path.indexOf("/", req.path.indexOf("/", 1) + 1)));
            data.news.findNewsById(id)
                .then(newsToEdit => {
                    let result = {
                        article: newsToEdit,
                        type: mainPath
                    };
                    res.render("../views/edit-form", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });
        },
        create: (req, res) => {
            // Validation part
            let articleType = req.params.article;
            let options = {
                articleType,
                formInput: req.body
            };

            if (!validator.validateTitle(req.body.title)) {
                options.errorMessage = "Title must be 5-60 characters long and must contain latin symbols , standard symbols and digits";
                res.render("../views/create-form", options);
                return;
            }

            if (!validator.validateBody(req.body.body)) {
                options.errorMessage = "Body must be 5-600 characters long and must contain latin symbols , standard symbols and digits";
                res.render("../views/create-form", options);
                return;
            }

            if (req.body.imgLink.length > 0 && !validator.validateImageLink(req.body.imgLink)) {
                options.errorMessage = "Not a valid link is provided";
                res.render("../views/create-form", options);
                return;
            }

            let tags = req.body.tags.split(/[,\s]+/g).map(tag => tag.trim());
            if (!validator.validateTags(tags)) {
                options.errorMessage = "Minimum two tags required, letters and digits only!";
                res.render("../views/create-form", options);
                return;
            }

            let newsToCreate = {
                title: req.body.title,
                category: req.body.category,
                body: req.body.body,
                author: {
                    username: req.user.username,
                    _id: req.user._id
                },
                imgLink: req.body.imgLink,
                meta: {
                    tags: tags
                }
            };

            data.news.createNews(newsToCreate)
                .then(() => {
                    res.redirect("/news");

                })
                .catch(() => {
                    res.redirect("/err");
                });
            // Create tags
            // Add news to category
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
                });
        },
        getNewsById: (req, res) => {
            let id = req.params.id;
            let mainPath = req.path.substring(0, req.path.indexOf("/", 1));
            data.news.findNewsById(id)
                .then(loadedNews => {
                    let result = {
                        article: loadedNews,
                        type: mainPath
                    };
                    res.render("../views/single-article", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });

        },
        getNewsByAuthor: (req, res) => {
            let author = req.params.currentUser;
            data.news.findNewsByAuthor(author)
                .then(loadedNews => {
                    let result = { loadedNews };
                    res.render("../views/user-profile-news-posts.pug", result);
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
            let result = { articleType };
            res.render("../views/create-form", result);
        }
    };
};