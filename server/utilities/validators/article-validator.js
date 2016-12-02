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
        return validateLength(body, 5, 600);
    },
    validateImageLink: (imgLink) => {
        return validateSymbols(imgLink, "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)");
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