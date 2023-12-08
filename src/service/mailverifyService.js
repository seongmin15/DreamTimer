const nodemailer = require("nodemailer");
const crypto = require("crypto");

class MailverifyService {
  constructor(userRepository) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 456,
      secure: true,
      auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_PW },
    });
    this.userRepository = userRepository;
  }

  async sendMail(id, email) {
    try {
      const user = await this.userRepository.getUserByIdAndEmail(id, email);
      if (!user) return { result: false, err: "no user" };
      const salt = crypto.randomBytes(3).toString("HEX");
      const mailOptions = {
        from: "tjdalsdl19@gmail.com",
        to: email,
        subject: "DreamTimer 인증 메일",
        html: "<h1>인증코드를 입력해주세요 \n\n\n\n\n\n</h1>" + salt,
      };
      await this.transporter.sendMail(mailOptions);
      const emailcode = crypto
        .pbkdf2Sync(email, salt, 97, 66, "sha512")
        .toString("base64");
      return { result: true, emailcode: emailcode };
    } catch (err) {
      console.log(err);
      return { result: false, err: err };
    }
  }

  async verify(emailcode, email, code) {
    const challenge = crypto
      .pbkdf2Sync(email, code, 97, 66, "sha512")
      .toString("base64");
    if (emailcode !== challenge) return { result: false, err: "not match" };
    const id = await this.userRepository.getIdByEmail(email);
    if (!id) {
      return { result: false, err: "no data" };
    }
    return { result: true, id: id };
  }
}

module.exports = MailverifyService;
