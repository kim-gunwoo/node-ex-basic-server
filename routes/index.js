const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/health", function (req, res) {
  res.send("node express server");
});

router.use("/auth", require("./auth"));

module.exports = router;
