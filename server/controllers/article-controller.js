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




    return {
        showForm(req, res) {
            let articleType = req.params.article;
            console.log(articleType);
            return articleShowForm(req, res, articleType);
        },
        load(req, res) {
            let type = req.path.slice(1);
            return loadArticle(req, res, type);
        }
    };
};