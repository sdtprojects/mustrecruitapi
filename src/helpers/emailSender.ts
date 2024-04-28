import nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  scope: "https://mail.google.com/",
});

// Create a Nodemailer transporter object
export const sendEmail = async (
  email: string,
  subject: string,
  email_content: string,
  attachments?: object[]
) => {
  try {
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        type: process.env.TYPE,
        user: "mustrecruit10@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: email_content,
      attachments: attachments ?? attachments,
    });

    console.log("Email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
