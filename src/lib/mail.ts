"use server"

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

export const sendEmail = async ({to, subject, body}: {to: string, subject: string, body: string}) => {
    try {
        await transporter.verify()
    } catch (error) {
        console.log(error)
        return null
    }

    const options = {
        from: process.env.SMTP_EMAIL,
        to,
        subject,
        html: body,
    };

    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.log(error)
    }
} 