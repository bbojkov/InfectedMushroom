"use strict";

function validateLength(string, minLength, maxLength) {
    if (string.length < minLength || string.length > maxLength) {
        return false;
    }
    return true;
}

function validateSymbols(string, regexString) {
    if (string.match(regexString)) {
        return true;
    }
    return false;
}

module.exports = {
    validateTitle: (title) => {
        return validateLength(title, 5, 60);
    },
    validateBody: (body) => {
        return validateLength(body, 5, 5000);
    },
    validateImageLink: (imgLink) => {
        return validateSymbols(imgLink, "([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))");
    },
    validateTags: (tags) => {
        if (tags.length < 2) {
            return false;
        }

        for (let tag of tags) {
            if (!(validateLength(tag, 3, 15) && validateSymbols(tag, "([a-zA-Z0-9])+"))) {
                return false;
            }
        }
        return true;
    },
    validateCategory: (name) => {
        return validateLength(name, 3, 30);
    }
};