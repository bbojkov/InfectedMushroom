/* globals module require Promise */

module.exports = function(models) {
    let { User } = models;

    return {
        findUserByCredentials(username, passHash) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, passHash }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};