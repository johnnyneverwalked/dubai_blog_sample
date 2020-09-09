const express = require("express");
const router = require("express").Router();
const Parse = require("parse/node");
Parse._initialize(process.env.APP_ID, "", process.env.MASTER_KEY)

const Session = Parse.Object.extend("_Session")

// ? log in
router.get("/login", async (req, res) => {
  try {

  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

// ? log out
router.get("/logout", async (req, res) => {
  try {

  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

// ? sign up
router.post("/signup", async (req, res) => {
  try {
    const user = new Parse.User();
    user.set("username", req.body.username);
    user.set("password", req.body.password);
    user.set("email", req.body.email);

    const created = await user.signUp();
    res.json({success: true, data: created})
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

module.exports = router;
