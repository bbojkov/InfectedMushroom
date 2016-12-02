module.exports = function (models) {
    let { categoryModel } = models;

    return {
        categories: {
            createCategory(name, type) {
                return new Promise((resolve, reject) => {
                    categoryModel.create({
                        name,
                        type
                    }, (err, category) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(category);
                    });
                });
            },
            addArticleToCategory(id, articleId, articleName) {
                return new Promise((resolve, reject) => {
                    categoryModel
                        .findById(id, (findErr, category) => {
                            if (findErr) {
                                return reject(findErr);
                            }
                            category.articles.push({
                                _id: articleId,
                                title: articleName
                            });
                            category.save((saveErr, updatedCategory) => {
                                if (saveErr) {
                                    return reject(saveErr);
                                }
                                return resolve(updatedCategory);
                            });
                        });
                });
            },
            getCategoryById(id) {
                return new Promise((resolve, reject) => {
                    categoryModel
                        .findById(id, (err, category) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(category);
                        });
                });
            },
            getAllCategoryName() {
                return new Promise((resolve, reject) => {
                    categoryModel
                        .find({}, "name", (err, categoriesNames) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(categoriesNames);
                        });
                });
            }
        }
    };
};