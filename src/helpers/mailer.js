import ejs from 'ejs';
import Mailer from 'nodemailer';
import path from 'path';
import { env } from '../config/env';

const mailer = async (type, emailToSend) => {
  // define a transporter for emails
  try {
    const transporter = Mailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
    let pathToEjs = '';
    switch (type) {
      case 'verifyEmail':
        pathToEjs = path.resolve('src/public/verifyEmail.ejs');
        break;
      case 'forgotPassword':
        pathToEjs = path.resolve('src/public/forgotPassword.ejs');
        break;
      case 'notification':
        pathToEjs = path.resolve('src/public/notification.ejs');
        break;
      default:
        throw new Error('No template provided');
    }
    return ejs.renderFile(pathToEjs, emailToSend.data, (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        const emailOptions = {
          from: '"WorkHaus support"<alainchristian87@gmail.com>',
          to: emailToSend.to,
          subject: emailToSend.subject,
          html: data,
        };
        transporter
          .sendMail(emailOptions)
          .then((success) => {
            console.log(success);
          })
          .catch((transPorterError) => {
            console.log(transPorterError);
          });
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default mailer;