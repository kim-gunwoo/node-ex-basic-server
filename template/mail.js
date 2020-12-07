const nodemailer = require("nodemailer");
const {
  NODEMAILER_SERVICE,
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_USER,
  NODEMAILER_PASS,
} = require("../config/config");

module.exports = {
  async test(req, res, next) {
    try {
      // 수신 메일 주소
      let email = "1z3803@naver.com";
      let subject = "테스트";
      let text = "테스트메일 발송.";

      let transporter = nodemailer.createTransport({
        service: NODEMAILER_SERVICE,
        host: NODEMAILER_HOST,
        port: NODEMAILER_PORT,
        auth: {
          user: NODEMAILER_USER,
          pass: NODEMAILER_PASS,
        },
      });

      let mailOptions = {
        from: NODEMAILER_USER,
        to: email, // 수신 메일 주소
        subject: subject,
        text: text,
      };

      await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          console.log("Email sent: " + info.response);
          res.json({ message: info.envelope });
        }
      });
    } catch (err) {
      next(err);
    }
  },
};
