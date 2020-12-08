module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    // 연결하려는 테이블
    "user_tb",
    {
      // 테이블 컬럼
      userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "사용자아이디",
      },
      usernm: {
        type: DataTypes.STRING(100),
        comment: "사용자이름",
      },
      loginid: {
        type: DataTypes.STRING(20),
        comment: "로그인아이디",
      },
      email: {
        type: DataTypes.STRING(200),
        comment: "이메일주소",
      },
      passwd: {
        type: DataTypes.STRING(200),
        comment: "암호",
      },
      useyn: {
        type: DataTypes.CHAR(1),
        default: "N",
        comment: "사용여부",
      },
    }
  );
};
