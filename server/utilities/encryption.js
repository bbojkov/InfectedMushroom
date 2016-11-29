"use strict";

const crypto = require("crypto");

module.exports = {
    generateSalt() {
        return crypto.randomBytes(128).toString("base64");
    },
    generateHashedPassword(salt, password) {
        const hmac = crypto.createHmac("sha256", salt);
        return hmac.update(password).digest("hex");
    }
};