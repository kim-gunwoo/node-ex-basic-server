const express = require("express");
const router = express.Router();
const mail = require("../template/mail");
const passport = require("passport");

router.get("/health", function (req, res) {
  res.send("node express server");
});

router.get("/testmail", async function (req, res, next) {
  try {
    await mail.test(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.use("/auth", require("./auth"));

router.use(
  "/board",
  passport.authenticate("jwt", { session: false }),
  require("./board")
);

module.exports = router;
