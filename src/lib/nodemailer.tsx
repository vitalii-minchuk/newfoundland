import { TestingEmail } from "@/components/email/testing-email";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import * as React from "react";


const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "my_user",
    pass: "my_password",
  },
});

const emailHtml = render(<TestingEmail url="https://example.com" />);

const options = {
  from: "you@example.com",
  to: "user@gmail.com",
  subject: "hello world",
  html: emailHtml,
};

export const sendEmail = async () => {
  await transporter.sendMail(options);
} 