const router = require("express").Router();
const Parse = require("parse/node");
Parse._initialize(process.env.APP_ID, "", process.env.MASTER_KEY)


// ? MIDDLEWARES ---
const authenticate = async (req, res, next) => {
  try {
    delete req._user;

    const token = (req.headers.authorization || "").replace("Bearer ", "");
    const session = await new Parse.Query(Parse.Object.extend("_Session"))
        .equalTo("sessionToken", token)
        .first({useMasterKey: true});

    if (!session) {
      console.log("Invalid Token");
      res.sendStatus(401);
      return;
    }

    req._user = session.get("user").id;

    next()
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e});
  }
}


const _superAccess = async (_user) => {
  const role = await new Parse.Query(Parse.Object.extend("_Role"))
    .equalTo("name", "Superuser")
    .first({useMasterKey: true});

  if (!role) {
    return false;
  }

  const user = await new Parse.Relation(role, "users")
    .query()
    .equalTo("objectId", _user)
    .first({useMasterKey: true});

  if (!user) {
    return false;
  }
  return true;
}
const isSuperUser = async (req, res, next) => {
  try {
    if (!req._user) {
      res.sendStatus(401);
      return;
    }
    const superAccess = await _superAccess(req._user);

    if (!superAccess) {
      res.sendStatus(401);
      return;
    }

    next();
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e});
  }

}
// ? ---

// ? log in
router.post("/login", async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password);

    if (!user) {
      res.json({success: false, error: {code: 401, message: "Login failed."}});
      return;
    }
    const superAccess = await _superAccess(user.id);
    res.json({success: true, data: user, superAccess})
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

// ? log status
router.get("/status", authenticate, async (req, res) => {
  try {
    const user = await new Parse.Query(Parse.Object.extend("_User"))
      .equalTo("objectId", req._user)
      .first({useMasterKey: true});

    if (!user) {
      res.sendStatus(401);
      return;
    }
    const superAccess = await _superAccess(req._user);
    res.json({success: true, data: user, superAccess})
  } catch (e) {
    console.error(e);
    res.json({success: false, error: e})
  }
})

// ? log out
router.get("/logout", authenticate, async (req, res) => {
  try {
    // TODO configure mongo atlas to not prevent session destruction
    // const token = (req.headers.authorization || "").replace("Bearer ", "");
    // const session = await new Parse.Query(Parse.Object.extend("_Session"))
    //   .equalTo("sessionToken", token)
    //   .first({useMasterKey: true});
    // if (session) {
    //   await session.destroy({useMasterKey: token});
    // }
    res.json({success: true})
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

module.exports = {
  router,
  isSuperUser,
  authenticate
};
