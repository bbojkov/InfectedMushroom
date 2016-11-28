module.exports = function(data) {
    return {
        register: (req, res) => {
            let user = req.body;
            if (user.password !== user.confirmPassword) {

                res.render('../views/portal.pug', { globalError: 'Pass not matching' });

            } else {
                //encrypt the pass
                //other user like this ? with the same mail ? with the same username
                data.users.createUser(user)
                then(user => {
                    req.logIn(user, (err, user) => {
                        if (err) {
                            console.log('Cant create user!!!');
                            return
                        }
                        res.redirect("/");
                    });
                });
            }
        },
        login: (req, res) => {
            let usersCredentials = req.body;
            data.users.findByUsername(usersCredentials.username)
                .then(user => {
                    if (!user) {
                        console.log("Invalid username and pass");
                        return;
                    }
                    if (user.authenticate(usersCredentials.password)) {
                        req.logIn(user, (err, user) => {
                            if (err) {
                                console.log('Cant login user!!!');
                                return
                            }
                            res.redirect("/");
                        });
                    }
                    else{
                        console.log('Treshti qko pls')
                    }
                });
        },
        logout: (req, res) => {
            res.logout();
            res.redirect("/")
        },
    }
};