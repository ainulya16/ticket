import nodemailer from 'nodemailer';

export default {
  async send(subject, text, html, to) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "pat.haiai.id",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'no-reply@pat.haiai.id', // generated ethereal user
        pass: 'rahasia@', // generated ethereal password
      }
    });

    try {
      let info = await transporter.sendMail({
        from: 'no-reply@pat.haiai.id', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });
      return Promise.resolve(info);
    } catch (error) {
      return Promise.reject(error)
    }
  }
};
