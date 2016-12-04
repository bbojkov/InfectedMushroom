module.exports = function (data) {
    return {
        create: (req, res) => {
            let commentsArray;
            data[req.params.article].findById(req.params.id)
                .then(foundArticle => {
                    let commentToCreate = {
                        relatedArticle: { _id: foundArticle.id, title: foundArticle.title },
                        responses: [],
                        commentBody: req.body.comments,
                        author: req.user.username
                    };
                    commentsArray = foundArticle.comments;
                    return data.post.addComment(commentToCreate);
                })
                .then(createdComment => {
                    let commentToPush = createdComment;
                    commentsArray.push(commentToPush);
                    let updateOptions = { comments: commentsArray };
                    data.news.update(req.params.id, updateOptions);
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