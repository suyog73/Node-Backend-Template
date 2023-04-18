const express = require("express");
const {login, signUp, getUser, updateUser} = require("../controller/userController");

Router = express.Router();
 
// Signup user
Router.route("/signup").post(signUp);

// Login user
Router.route("/login").post(login);

// Get user by id
Router.route("/:id").get(getUser);

// Update(patch) user by id
Router.route("/update/:id").patch(updateUser);

module.exports = Router;