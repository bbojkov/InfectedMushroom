module.exports = function(data, validator) {
    return {
        showForm: (req, res) => {
            let type = req.params.type;
            if (!["news", "review", "guide"].includes(type)) {
                res.redirect("/err");
            }
            let result = { type };
            res.render("../views/category-form", result);
        },
        create: (req, res) => {
            // Validation
            let type = req.params.type;
            if (!validator.validateCategory(req.body.name)) {
                let options = {
                    type,
                    formInput: req.body
                };
                options.errorMessage = "Category must be 3-300 characters long and must contain latin symbols , standard symbols and digits";
                res.render("../views/category-form", options);
                return;
            }

            data.categories.createCategory(req.body.name, type)
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