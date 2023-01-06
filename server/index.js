require("express-async-errors");
const express = require("express");
const error = require("./middlewares/error");
const app = express();

require("./structure/config")();
require("./structure/db")();
require("./structure/validation")();
require("./structure/routes")(app);
app.use(error);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("listening for requests at port", port);
});