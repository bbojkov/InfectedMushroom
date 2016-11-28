/* globals module */
module.exports = {
    connectionString: {
        development: "mongodb://localhost:27017/infshroom",
        production: "mongodb://commodore:pass1@ds159377.mlab.com:59377/infected_mushroom"
    },
    port: process.env.PORT || 3001
};