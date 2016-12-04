module.exports = function (models) {
    let { categoryModel, tagModel } = models;

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
            addArticleToCategory(id, articleId, articleName, tags) {
                return new Promise((resolve, reject) => {
                    categoryModel
                        .findById(id, (findErr, category) => {
                            if (findErr) {
                                return reject(findErr);
                            }
                            category.relatedArticles.push({
                                _id: articleId,
                                title: articleName
                            });
                            tags.forEach(tag => category.relatedTags.push(tag));
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
        },
        tags: {
            getOrCreateTagByName(name) {
                return new Promise((resolve, reject) => {
                    tagModel
                        .findOne({ name: name })
                        .exec((errFind, foundTag) => {
                            if (errFind) {
                                return reject(errFind);
                            } else if (foundTag === null) {
                                tagModel
                                    .create({ name: name },
                                    (errCreate, createdTag) => {
                                        if (errCreate) {
                                            return reject(errCreate);
                                        }
                                        return resolve(createdTag);
                                    });
                            } else {
                                return resolve(foundTag);
                            }
                        });
                });
            },
            addArticleToTags(tags, articleId, articleName) {
                let tagIds = tags.map(tag => tag._id);
                return new Promise((resolve, reject) => {
                    tagModel
                        .find({ _id: { $in: tagIds } })
                        .exec((err, foundTags) => {
                            if (err) {
                                return reject(err);
                            }
                            foundTags.forEach(tag => {
                                tag.relatedArticles.push(
                                    {
                                        _id: articleId,
                                        title: articleName
                                    }
                                );
                                tag.save((errSave) => {
                                    if (err) {
                                        return reject(errSave);
                                    }
                                });
                            });
                            return resolve(foundTags);
                        });
                });
            }
        }
    };
};