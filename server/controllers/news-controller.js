
module.exports = function (data) {
    //console.log("in ctrlr "+ data.news.createNews);
    return {
        load: (req, res) => {
            data.news.loadLatestNews(20,1) //TODO: page should be taken dynamically, 20 should be in config
                .then(news => {
                    res.render("../views/news", {result: news});
                })
            
        },
        showForm: (req, res) => {
            res.render("../views/news-create");
        },
        create: (req, res) => {
            let news = req.body;
            let author = {
                username: 'Admin', //TODO: once the user is attached to req/res, use it
                _id: '58317cf7acb2ba3f7c34dddd'
            }
            news.author = author;
            news.tags = news.tags.split(',').map(tag => tag.trim());
            console.log(news)

            data.news.createNews(news)
                .then(() => res.redirect("/news"));

        },
        test: (req, res) => {
            res.render("../views/test.pug")
        }
    }
};