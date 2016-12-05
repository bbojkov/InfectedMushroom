module.exports = function (data) {
    return {
        index: (req, res) => {
            let result = {};
            data.news.findFirstThree()
                .then(firstThreeNews => {
                    result.firstThreeNews = firstThreeNews;

                    return data.reviews.findFirstThree();
                })
                .then(firstThreeReviews => {
                    result.firstThreeReviews = firstThreeReviews;

                    return data.guides.findFirstThree();
                })
                .then(firstThreeGuides => {
                    result.firstThreeGuides = firstThreeGuides;

                    res.render("../views/portal.pug", result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
};