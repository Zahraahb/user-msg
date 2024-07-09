import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zahraahb55@gmail.com",
      pass: "nuekuhouvanennrz",
    },
  });

  const info = await transporter.sendMail({
    from: '"zahraa ☺️" <zahraahb55@gmail.com>', // sender address
    to: to ? to : "",
    subject: subject ? subject : "hi👋🏻",
    html: html ? html : "<h1>hello</h1>",
  });

  console.log(info);
  if (info.accepted.length) {
    return true;
  }
  return false;
};
