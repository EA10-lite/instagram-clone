
const { login_schema, registration_schema, reset_password_schema, User } = require("../models/users");
const { follow_validation_schema } = require("../models/follow");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const _ = require("lodash");
const express = require("express");
const { 
    follow_user,
    get_user_details,
    login, 
    register_user, 
    reset_password,
    suggest_friends, 
    unfollow_user,
} = require("../controllers/user");
const router = express.Router();

router.get("/me", auth, get_user_details);
router.get("/suggestion", auth, suggest_friends);
router.put("/follow", [ auth, validate(follow_validation_schema)], follow_user);
router.post("/login", validate(login_schema), login);
router.post("/register", validate(registration_schema), register_user);
router.put("/resetpassword", validate(reset_password_schema),reset_password);
router.put("/unfollow", [ auth, validate(follow_validation_schema)], unfollow_user);

module.exports = router;