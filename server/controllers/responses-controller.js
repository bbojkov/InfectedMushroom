module.exports = function (data) {
    return {
        create: (req, res) => {
            let articleToUpdate;
            let responseToCreate;
            let elementPos;
            data[req.params.article].findById(req.params.id)
                .then(foundArticle => {
                    articleToUpdate = foundArticle;
                    elementPos = foundArticle.comments.map((x) => {
                        return x._id.toString();
                    }).indexOf(req.params.comment);

                    responseToCreate = {
                        author: req.user.username,
                        responseBody: req.body.response,
                        relatedArticle: { _id: foundArticle.id, title: foundArticle.title },
                        relatedComment: { _id: foundArticle.comments[elementPos]._id }
                    };
                    return data.post.addResponse(responseToCreate);
                })
                .then(createdResponse => {
                    articleToUpdate.comments[elementPos].responses.push(createdResponse);
                    data[req.params.article].update(req.params.id, articleToUpdate);
                })
                .then(() => {
                    res.redirect(`/${req.params.article}/${req.params.id}`);
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/err");
                });
        }
    };
};