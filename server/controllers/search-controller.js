"use strict";

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 5;

module.exports = function(data) {
    return {
        search: (req, res) => {
            let pattern = req.query.val || "";
            let page = Number(req.body.page || DEFAULT_PAGE);

            return Promise.all([data.news.search({ pattern, count: PAGE_SIZE, page }),
                data.guides.search({ pattern, count: PAGE_SIZE, page }),
                data.reviews.search({ pattern, count: PAGE_SIZE, page })])
                .then(([news, guides, reviews]) => {
                    return res.render("../views/search.pug", {
                        model: {
                            news,
                            guides,
                            reviews
                        },
                        params: { pattern }
                    });
                });

        }
    };
};
