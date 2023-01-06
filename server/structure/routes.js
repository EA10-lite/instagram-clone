

const express = require("express");
const posts = require("../routes/posts");
const users = require("../routes/users");

module.exports = (app) => {
    app.use(express.json());
    app.use("/api/posts", posts);
    app.use("/api/users", users);
}