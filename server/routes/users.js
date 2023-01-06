
const { login_schema, registration_schema, reset_password_schema, User } = require("../models/users");
const { follow_validation_schema } = require("../models/follow");
const { hash_password, compare_password } = require("../utils/hash");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const _ = require("lodash");
const express = require("express");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send({ error: "user not found." });

    res.status(200).send({
        data: _.pick(user, ['name', 'username', 'followers', 'following' ]),
        error: null
    });
});

router.get("/suggestion", auth, async (req, res) => {
    const users = await User.find();
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send({ error: "bad request!" });

    const suggestions = [];
    // loop through all the users queried from the database,
    for(let i = 0; i < users.length; i++){
        // check if the current user in the loop is not the user who sends the request,
        // of the the user is not following the current user
        if(!user.following.find(following => following._id.equals(users[i]._id)) && !user._id.equals(users[i]._id)){
            suggestions.push({
                _id: users[i]._id,
                avatar: users[i].avatar,
                username: users[i].username
            });
        }
    }
    res.status(200).send({
        data: suggestions,
        error: null
    });
});

router.post("/register", validate(registration_schema), async (req, res) => {
    let user = await User.findOne({ email: req.body.email, username: req.body.username });
    if(user) return res.status(400).send({ error: "user already exist with the email or username." });

    user = new User({...req.body});
    user.password = await hash_password(user.password);
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).status(201).send({
        data: _.pick(user, ['name', 'username', 'avatar']),
        error: null,
        message: "registration successful."
    });
});

router.post("/login", validate(login_schema), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send({ error: "invalid email or password" });

    const is_valid_password = await compare_password(req.body.password, user.password);
    if(!is_valid_password) return res.status(400).send({ error: "incorrect email or password" });

    const token = user.generateAuthToken();

    res.status(201).send({
        data: token,
        error: null,
        message: "login successful."
    });
});

router.put("/resetpassword", validate(reset_password_schema), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send({ error: "invalid email or passowrd" });

    user.password = await hash_password(req.body.password);
    await user.save();

    res.status(200).send({
        error: null,
        message: "password reset successful."
    });
});

router.put("/follow", [ auth, validate(follow_validation_schema)], async (req, res) => {
    // First find the user who's trying to consume this API - user1,
    // if user1 does not exist, return an error message,
    const user1 = await User.findById(req.user._id);
    if(!user1) return res.status(400).send({ error: "Invalid Request - User does not exist." });
    if(user1._id.equals(req.body.userId)) return res.status(400).send({ error: "Invalid Request: you cannot follow yourself." });

    // Then find the account to be followed - user2,
    // if user2 does not exist, return an error message.
    const user2 = await User.findById(req.body.userId)
    if(!user2) return res.status(404).send({ error: "user does not exist." })

    // verify if user1 is already following user2,
    // if user1 is already following user2, return an error
    const is_following = user1.following.find(following => following.userId.equals(req.body.userId));
    if(is_following) return res.status(400).send({ error: "Invalid request - user already follows this account" });

    user1.following.push({ userId: user2._id });
    user2.followers.push({ userId: user1._id });
    await user1.save();
    await user2.save();

    res.status(200).send({
        data: _.pick(user1, ['usernmae', 'following']),
        error: null,
        message: `You are now following ${user2.username}`
    });
});

router.put("/unfollow", [ auth, validate(follow_validation_schema)], async (req, res) => {
    // First find the user who's trying to consume this API - user1,
    // if user1 does not exist, terminate the request,
    const user1 = await User.findById(req.user._id);
    if(!user1) return res.status(400).send({ error: "Invalid Request - User does not exist." });
    if(user1._id.equals(req.body.userId)) return res.status(400).send({ error: "Invalid Request: you cannot follow yourself." });

    // Then find the account to be followed - user2,
    // if the user2 does not exist, terminate the request.
    const user2 = await User.findById(req.body.userId)
    if(!user2) return res.status(404).send({ error: "user does not exist." })

    // verify if user1 is following user2,
    // if user1 is not following user2, stop the request with no action to be carried out
    const is_following = user1.following.find(following => following.userId.equals(req.body.userId));
    if(!is_following) return res.status(400).send({ error: ""});

    // 
    const follower = user2.followers.find(follower => follower.userId.equals(user2._id)); 
    if(!follower) return res.status(400).send({ error: ""});

    user1.following.splice(user1.following.indexOf(is_following), 1);
    user2.followers.splice(user2.followers.indexOf(follower), 1);
    await user1.save();
    await user2.save();

    res.status(200).send({
        data: _.pick(user1, ['usernmae', 'following']),
        error: null,
        message: `You unfollowed ${user2.username}`
    });
});

module.exports = router;