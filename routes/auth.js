const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Config = require("../config/config");

const User = require("../models/").user_tb;

router.post("/signin", async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        res.status(400).json({ message: info.message });
        return;
      }

      req.login(user, { session: false }, (loginErr) => {
        if (loginErr) {
          res.send(loginErr);
          return;
        }

        // JWT생성 후 반환
        const token = jwt.sign(
          { email: user.email, name: user.usernm },
          Config.SECREAT_KEY
        );
        res.json({ token });
      });
    })(req, res);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  const signUser = req.body;

  const email = signUser.email;
  const usernm = signUser.usernm;
  const passwd = signUser.passwd;
  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      res.json({ message: "등록된 사용자가 존재합니다." });
      return;
    }

    await bcrypt.hash(passwd, Config.SALT_ROUND, async (err, hash) => {
      if (err) return res.status(500).json({ err: err.message });

      const user = await User.create({
        usernm: usernm,
        email: email,
        passwd: hash,
      });

      res.json(user);
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      res.json({ result: true });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
