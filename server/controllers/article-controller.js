module.exports = function (data, validator) {
    function articleShowForm(req, res, articleType) {
        data.categories.getAllCategoriesByType(articleType)
            .then(availableCategories => {
                // if (articleType !== "news") {
                //     res.redirect("/err");
                // }
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

    function loadArticle(req, res, type) {
        let currentPage = Number(req.query.page) || 1;
        let pagesCount;
        data[type].getTotalCount()
            .then(articleCount => {

                if (articleCount % 7 === 0) {
                    pagesCount = articleCount / 7;
                } else {
                    pagesCount = ((articleCount / 7) + 1) | 0;
                }

                return data[type].loadPage(7, currentPage);
            })
            .then(articles => {
                let result = {
                    articles: articles,
                    type,
                    pagesCount: pagesCount
                };
                let pugUrl = "../views/" + type;
                res.render(pugUrl, result);
            })
            .catch(() => {
                res.redirect("/err");
            });
    }

    function createArticle(req, res, articleType) {
        // Validation part
        data.categories.getAllCategoriesByType(articleType)
            .then(availableCategories => {
                let options = {
                    articleType,
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


                let articleToCreate = {
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

                return data[articleType].create(articleToCreate);

            })
            .then(createdArticle => {
                let promises = [];
                // Add article and tags to the category
                promises.push(data.categories.addArticleToCategory(
                    createdArticle.category._id,
                    createdArticle._id,
                    createdArticle.title,
                    createdArticle.meta.tags));

                // Add article -and category- to the tags
                promises.push(data.tags.addArticleToTags(
                    createdArticle.meta.tags,
                    createdArticle._id,
                    createdArticle.title));

                return Promise.all(promises);
            })
            .then(() => {
                res.redirect("/" + articleType);
            })
            .catch((err) => {
                console.log(err);
                res.redirect("/err");
            });
    }




    return {
        showForm(req, res) {
            let articleType = req.params.article;
            return articleShowForm(req, res, articleType);
        },
        load(req, res) {
            let articleType = req.path.slice(1);
            return loadArticle(req, res, articleType);
        },
        create(req, res) {
            let articleType = req.params.article;
            return createArticle(req, res, articleType);
        }
    };
};