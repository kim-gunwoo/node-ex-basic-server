const app = require("./app");

const PORT = process.env.PORT | 8000;

const sequelize = require("./models").sequelize;

// force : true 테이블이 존재할 경우 삭제후 재생성
// .sync({ force: true })
sequelize
  .sync()
  .then(() => {
    console.log("db connection success");
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

app.listen(PORT, () => {
  console.log(`server run localhost:${PORT}`);
});
