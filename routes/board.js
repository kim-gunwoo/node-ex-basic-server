const express = require("express");
const router = express.Router();

const models = require("../models/");
const Board = models.board_tb;
const sequelize = models.sequelize;

router.get("/", async (req, res, next) => {
  //let transaction;

  try {
    //transaction = await sequelize.transaction();
    const board = await Board.findAll({});

    res.json(board);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  let transaction;
  const board = req.body;
  const title = board.title;
  const content = board.content;
  const writeid = board.writeid;
  const passwd = board.passwd;
  const priv_yn = board.priv_yn;

  try {
    transaction = await sequelize.transaction();

    const board = await Board.create(
      {
        title,
        content,
        writeid,
        passwd,
        priv_yn,
      },
      { transaction }
    );

    transaction.commit();
    res.json(board);
  } catch (error) {
    transaction.rollback();
    next(error);
  }
});

module.exports = router;
