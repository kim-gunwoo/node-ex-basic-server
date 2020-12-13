const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Config = require("../config/config");
const mail = require("../template/mail");
const models = require("../models/");
const User = models.user_tb;
const sequelize = models.sequelize;

const createrandom = require("../template/random-generate");
const htmltemplate = require("../template/htmltemplate");

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
          Config.SECRET_KEY
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
  let transaction;
  const signUser = req.body;

  const email = signUser.email;
  const usernm = signUser.usernm;
  const passwd = signUser.passwd;
  try {
    transaction = await sequelize.transaction();

    const user = await User.findOne({ where: { email: email }, transaction });

    if (user) {
      res.json({ message: "등록된 사용자가 존재합니다." });
      return;
    }

    await bcrypt.hash(passwd, Config.SALT_ROUND, async (err, hash) => {
      if (err) return res.status(500).json({ err: err.message });

      const user = await User.create(
        {
          usernm: usernm,
          email: email,
          passwd: hash,
          verifyid: createrandom.generate(),
          verifypin: createrandom.generate(),
        },
        { transaction }
      );

      await mail.signup(user.dataValues, res, transaction).catch((err) => {
        transaction.rollback();
        next(err);
      });
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
});

router.get("/verify/:id/pin/:pin", async (req, res, next) => {
  const id = req.params.id;
  const pin = req.params.pin;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const user = await User.findOne({ where: { verifyid: id }, transaction });

    if (!user) {
      res.send(htmltemplate.sendHtml("인증정보가 잘못되었습니다."));
      return;
    }

    if (pin !== user.verifypin) {
      res.send(htmltemplate.sendHtml("인증키가 바르지 않습니다."));
      return;
    }

    await User.update(
      {
        useyn: "Y",
        verifyid: "",
        verifypin: "",
      },
      { where: { email: user.dataValues.email }, transaction }
    );
    transaction.commit();
    res.send(htmltemplate.sendHtml("인증이 완료되었습니다."));
  } catch (err) {
    await transaction.rollback();
    res.send(htmltemplate.sendHtml(err));
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
