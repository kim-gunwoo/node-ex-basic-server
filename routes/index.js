const express = require("express");
const router = express.Router();
const testmail = require("../template/mail");

router.get("/health", function (req, res) {
  res.send("node express server");
});

router.get("/testmail", async function (req, res, next) {
  try {
    await testmail.test(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.use("/auth", require("./auth"));

module.exports = router;
