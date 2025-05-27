const nodemailer = require("nodemailler");

class Mail {

  async sendMailLerSimple(
    hst,
    port,
    secure,
    user,
    pass,
    mailTo,
    titulo,
    msgHTML,
    msgText
  ) {
    const transporter = nodemailer.createTransport({
      host: hst,
      port: port,
      secure: secure,
      auth: {
        user: user,
        pass: pass,
      },
    });

    try {
      const response = await transporter.sendMail({
        from: user,
        to: mailTo,
        subject: titulo,
        html: msgHTML,
        text: msgText,
      });

      console.log(`Disparo realizado com suceosso : ${response.messageId}`);
      return { mesage: `Disparo realizado com sucesso` };

    } catch (er) {

      console.error(`Erro ${er} ao disparar email com ${user}`);
      return { mesage: `Erro: ${er.message}` };

    }
  }

}

module.exports = Mail;
