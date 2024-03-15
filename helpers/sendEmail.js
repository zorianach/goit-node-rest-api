import "dotenv/config";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export default transport;

// const message = {
//   to: "zoryanamirchuk@gmail.com",
//   from: "zoryanamirchuk@gmail.com",
//   subject: "Hello from Node.js",
//   html: "<h1 style='color: green;'>Node.js is awesome platform</h1>",
//   text: "Node.js is awesome platform",
// };

// transport.sendMail(message).then(console.log).catch(console.error);