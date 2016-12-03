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
            getCategoryById(id, projection) {
                return new Promise((resolve, reject) => {
                    categoryModel
                        .findById(id, projection, (err, category) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(category);
                        });
                });
            },
            getAllCategoriesByType(type) {
                return new Promise((resolve, reject) => {
                    categoryModel
                        .find({ type }, "_id name", (err, categoriesNames) => {
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