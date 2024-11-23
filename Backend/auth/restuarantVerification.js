import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const sendVerificationEmailForRestuarant = async (email, token) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,  // use your ethereal username directly
            pass: process.env.SMTP_PASSWORD,           // use your ethereal password directly
        },
    });

    const verificationLink = `http://localhost:3000/api/restuarant/verify-email/${token}`;

    const info = {
        from: process.env.SMTP_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Email Verification", // Subject line
        text: `Click on the link to verify your email: <a href="${verificationLink} ">Verify</a>`, // plain text body
    };
    await transporter.sendMail(info);
}