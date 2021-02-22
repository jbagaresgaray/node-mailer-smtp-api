const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = {
    host: process.env.EMAIL_SMTP_PROVIDER,
    port: process.env.EMAIL_SMTP_PORT,
    auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(smtpTransport(transport));

const sendPlainText = (to, subject, text, res) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, body) => {
        if (error) {
            console.log("Error: ", error);
            return res.status(400).json({
                message: "Email successfully sent!",
                success: true,
            });
        }

        console.log("Email success: ", body);
        return res.status(200).json({
            message: "Email successfully sent!",
            response: body.response,
            success: true,
        });
    });
};

const sendHTML = (to, subject, html, res) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    };

    transporter.sendMail(mailOptions, (error, body) => {
        if (error) {
            console.log("Error: ", error);
            return res.status(400).json({
                message: "Email successfully sent!",
                success: true,
            });
        }

        console.log("Email success: ", body);
        return res.status(200).json({
            message: "Email successfully sent!",
            response: body.response,
            success: true,
        });
    });
};

exports.sendPlainText = sendPlainText;
exports.sendHTML = sendHTML;