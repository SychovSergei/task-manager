import nodemailer, { Transporter } from "nodemailer";

import config from "../../config";

class MailService {

  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: (config.smtp as any).host,
      port: (config.smtp as any).port,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendActivationMail(email: string, link: string) {
    try {
      this.transporter.verify((error, success) => { if (error) console.log("VERIFY ERROR"); })
      this.transporter.sendMail({
        from: config.smtp.user,
        to: email,
        subject: `Account activation - ` + config.apiUrl,
        text: "some text",
        html: `
          <div>
            <h1>Click on link for activation account</h1>
            <a href="${link}">${link}</a>
          </div>
        `
      }, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
    } catch (e: any) {
      console.log("SendMail Error", e.code, e.message);
    }

  }
}

const mailService = new MailService();

export default mailService;
