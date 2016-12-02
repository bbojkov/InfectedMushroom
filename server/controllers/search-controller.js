"use strict";

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 5;

module.exports = function(data) {
    return {
        search: (req, res) => {
            let pattern = req.query.val || "";
            let page = Number(req.body.page || DEFAULT_PAGE);

            return Promise.all([data.news.searchNews({ pattern, count: PAGE_SIZE, page }), data.guides.searchGuides({ pattern, count: PAGE_SIZE, page })])
                .then(([news, guides]) => {
                    return res.render("../views/search.pug", {
                        model: {
                            news,
                            guides
                        },
                        params: { pattern },
                        user: req.user
                    });
                });

        }
    };
};
