const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/health", function (req, res) {
  res.send("node express server");
});

module.exports = router;
