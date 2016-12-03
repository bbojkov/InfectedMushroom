module.exports = function (data) {
    return {
        create: (req, res) => {
            data.news.findNewsById(req.params.id)
                .then(foundArticle => {
                    let commentToCreate = {
                        relatedArticle: { _id: foundArticle.id, title: foundArticle.title },
                        responses: [],
                        commentBody: req.body.comments,
                        author: req.user.username
                    };
                    return data.post.addComment(commentToCreate);
                })
                .then(createdComment => {
                    let commentToPush = createdComment;
                    data.news.updateNews(req.params.id, commentToPush);
                })
                .then(() => {
                    res.redirect(`/news/${req.params.id}`);
                })
                .catch(() => {
                    res.redirect("/err");
                });
        }
    };
};