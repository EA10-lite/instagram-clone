require("express-async-errors");
const cors = require("cors");
const express = require("express");
const error = require("./middlewares/error");
const app = express();

const cors_options = {
    origin: ["http://localhost:3000"],
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': true,
    credentials: true 
}

app.use(cors(cors_options));

require("./structure/config")();
require("./structure/db")();
require("./structure/validation")();
require("./structure/routes")(app);
app.use(error);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("listening for requests at port", port);
});