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
  async signup(user, res, transaction) {
    const email = encodeURIComponent(user.email);
    const usernm = user.usernm;
    const passwd = encodeURIComponent(user.passwd);
    const verifypin = user.verifypin;

    try {
      // 수신 메일 주소
      let toeMail = "1z3803@naver.com";
      let subject = "회원가입 메일 발송";
      let contents = `<a href=http://localhost:8000/auth/verity/${verifypin} >메일 인증 하기</a>`;

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
        to: toeMail,
        subject: subject,
        //text: contents,
        html: contents,
      };

      await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          throw Error(err);
        } else {
          console.log("Email sent: " + info.response);
          res.json({ message: info.envelope });
          transaction.commit();
        }
      });
    } catch (err) {
      throw Error(err);
      //next(err);
    }
  },
};
