const router = require("express").Router();
const checkSuperUser = require("./auth").isSuperUser;
const authenticate = require("./auth").authenticate;
const Parse = require("parse/node");
const multer = require("multer");
const sharp = require("sharp");
Parse._initialize(process.env.APP_ID, "", process.env.MASTER_KEY)

const Landark = Parse.Object.extend("Landmark")

const editable = [
  "title",
  "short_info",
  "description",
  "url"
]

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: fileFilter
});


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
router.put("/update/:_id", authenticate, checkSuperUser, upload.single("photo"), async (req, res) => {
  try {
    const token = (req.header("authorization") || "").replace("Bearer ", "");
    const result = await new Parse.Query(Landark)
      .equalTo("objectId", req.params._id)
      .first()

    if (!result) {
      res.json({success: false, error: {message: `Landmark with id [${req.params._id}] not found.`, code: 404}})
      return;
    }

    for (let key in (req.body || {})) {
      if (!editable.includes(key)) {
        continue;
      }
      result.set(key, req.body[key]);
    }

    if (req.file) {
      const photo = new Parse.File(req.file.originalname, {base64: req.file.buffer.toString("base64")});
      await photo.save({sessionToken: token});

      const minimizedPhoto = await sharp(req.file.buffer)
        .resize({
          width: parseInt(process.env.PHOTO_WIDTH || "250"),
          height: parseInt(process.env.PHOTO_HEIGHT || "250"),
          fit: "fill"
        }).toBuffer();
      const photoThumb = new Parse.File(req.file.originalname + "_thumb", {base64: minimizedPhoto.toString("base64")});
      await photoThumb.save({sessionToken: token});

      result.set("photo", photo);
      result.set("photo_thumb", photoThumb);
    }

    const updated = await result.save(null, {sessionToken: token});

    res.json({success: true, data: updated || null});
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

module.exports = router;
