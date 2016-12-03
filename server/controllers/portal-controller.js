module.exports = function (data) {
    return {
        index: (req, res) => {
            let result = {};
            data.news.findFirstThreeNews()
                .then(firstThreeNews => {
                    result.firstThreeNews = firstThreeNews;

                     res.render("../views/portal.pug", result);
                });
        }

        // index: (req, res) => {
        //     let result = {};
        //     data.news.findFirstThreeNews()
        //         .then(firstThreeNews => {
        //             result.firstThreeNews = firstThreeNews;

        //             return data.reviews.findFirstThreeReviews();
        //         })
        //         .then(firstThreeReviews => {
        //             result.firstThreeReviews = firstThreeReviews;

        //             return data.guides.findFirstThreeGuides();
        //         })
        //         .then(firstThreeGuides => {
        //             result.firstThreeGuides = findFirstThreeGuides;

        //             res.render("../views/portal.pug", result);
        //         })
        //         .catch(() => { });
        // }
    }
};