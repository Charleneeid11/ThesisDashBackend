import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.user_email,
        pass: process.env.user_pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (email: string, msubject: string, mtext: string): Promise<void> => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: msubject,
        text: mtext
    });
};

export default sendEmail;