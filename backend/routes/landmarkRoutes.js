const express = require("express");
const router = require("express").Router();
const checkSuperUser = require("./auth").isSuperUser;
const Parse = require("parse/node");
Parse._initialize(process.env.APP_ID, "", process.env.MASTER_KEY)

const Landark = Parse.Object.extend("Landmark")


// ? retrieve
router.get("/", async (req, res) => {
  try {
    const results = await new Parse.Query(Landark)
      .ascending("order")
      // .select("order")
      .find();
    res.json({success: true, data: results || [], total: (results || []).length})
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

// ? find by id
router.get("/findById/:_id", async (req, res) => {
  try {
    const result = await new Parse.Query(Landark)
      .equalTo("objectId", req.params._id)
      .first()

    res.json({success: true, data: result || null})
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

// ? update
router.put("/update/:_id", async (req, res) => {
  try {
    // TODO validate user is admin

    const result = await new Parse.Query(Landark)
      .equalTo("objectId", req.params._id)
      .first()

    if (!result) {
      res.json({success: false, error: {message: `Landmark with id [${req.params._id}] not found.`, code: 404}})
      return;
    }

    for (let key in (req.body || {})) {
      // TODO prevent update from adding new columns to the schema (?????????????)
      result.set(key, req.body[key]);
    }

    const updated = await result.save();

    res.json({success: true, data: updated || null});
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

module.exports = router;
