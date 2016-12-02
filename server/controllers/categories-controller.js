module.exports = function (data, validator) {
    return {
        showForm: (req, res) => {
            let articleType = req.params.article;
            if (articleType !== "categories") {
                res.redirect("/err");
            }
            let result = { articleType };
            res.render("../views/category-form.pug", result);
        },
        create: (req, res) => {
            // Validation
            data.categories.createCategory(req.body.name, "news")
                .then(createdCategory => {
                    res.redirect("/category/" + createdCategory._id);
                });
        },
        show: (req, res) => {
            let id = req.params.id;
            data.categories.getCategoryById(id)
                .then(foundCategory => {
                    let result = {
                        foundCategory
                    };
                    res.render("../views/categories.pug", result);
                });
        }
    };
};