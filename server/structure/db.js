
const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb://localhost/instagram")
        .then(()=> console.log("connecting to mongodb"))
        .catch(err=> console.log("failed to connect to mongodb", err))
}