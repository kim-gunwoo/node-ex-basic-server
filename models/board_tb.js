module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    // 연결하려는 테이블
    "board_tb",
    {
      // 테이블 컬럼
      bno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "순번",
      },
      title: {
        type: DataTypes.STRING(100),
        comment: "제목",
      },
      content: {
        type: DataTypes.TEXT,
        comment: "내용",
      },
      writeid: {
        type: DataTypes.STRING(100),
        comment: "작성자아이디",
      },
      viewcnt: {
        type: DataTypes.STRING(100),
        comment: "횟수",
      },
      passwd: {
        type: DataTypes.STRING(100),
        comment: "암호",
      },
      priv_yn: {
        type: DataTypes.STRING(100),
        comment: "숨김여부",
      },
    }
  );
};
