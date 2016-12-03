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
            data.categories.getAllCategoriesByType("news")
                .then(availableCategories => {
                    let options = {
                        articleType: req.params.article,
                        availableCategories,
                        formInput: req.body
                    };
                    return options;
                })
                .then(options => {
                    return new Promise((resolve, reject) => {
                        if (!validator.validateTitle(req.body.title)) {
                            options.errorMessage = "Title must be 5-60 characters long and must contain latin symbols , standard symbols and digits";
                            reject(options);
                        }

                        if (!validator.validateBody(req.body.body)) {
                            options.errorMessage = "Body must be 5-600 characters long and must contain latin symbols , standard symbols and digits";
                            reject(options);
                        }

                        if (req.body.imgLink.length > 0 && !validator.validateImageLink(req.body.imgLink)) {
                            options.errorMessage = "Not a valid link is provided";
                            reject(options);
                        }

                        let tags = req.body.tags.split(/[,\s]+/g).map(tag => tag.trim());
                        if (!validator.validateTags(tags)) {
                            options.errorMessage = "Minimum two tags required, letters and digits only!";
                            reject(options);
                        }
                        resolve(tags);
                    });

                })
                .catch(options => {
                    res.render("../views/create-form", options);
                })
                .then((tags) => {
                    let promises = [];
                    promises.push(data.categories.getCategoryById(req.body.category, "_id name"));
                    tags.forEach(tagName => {
                        promises.push(data.tags.getOrCreateTagByName(tagName));
                    });
                    return Promise.all(promises);
                })
                .then(resolvedCategoryAndTags => {
                    let category = resolvedCategoryAndTags.splice(0, 1)[0];
                    let tags = resolvedCategoryAndTags.map(tag => {
                        return {
                            _id: tag._id,
                            name: tag.name
                        };
                    });


                    let newsToCreate = {
                        title: req.body.title,
                        body: req.body.body,
                        category: {
                            _id: category._id,
                            name: category.name
                        },
                        author: {
                            username: req.user.username,
                            _id: req.user._id
                        },
                        imgLink: req.body.imgLink,
                        meta: {
                            tags: tags
                        }
                    };

                    return data.news.createNews(newsToCreate);

                })
                .then(createdNews => {
                    let promises = [];
                    // Add article and tags to the category
                    promises.push(data.categories.addArticleToCategory(
                        createdNews.category._id,
                        createdNews._id,
                        createdNews.title,
                        createdNews.meta.tags));

                    // Add article -and category- to the tags
                    promises.push(data.tags.addArticleToTags(
                        createdNews.meta.tags,
                        createdNews._id,
                        createdNews.title));

                    return Promise.all(promises);
                })
                .then(() => {
                    res.redirect("/news");
                })
                .catch((err) => {
                    console.log(err);
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
            data.categories.getAllCategoriesByType("news")
                .then(availableCategories => {
                    let articleType = req.params.article;
                    if (articleType !== "news") {
                        res.redirect("/err");
                    }
                    let result = {
                        articleType,
                        availableCategories
                    };
                    res.render("../views/create-form", result);
                })
                .catch(() => {
                    res.redirect("/err");
                });
        }
    };
};