const Mailgun = require("mailgun-js");
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const mailgun = Mailgun({ apiKey, domain });

const sendPlainText = async(to, subject, text, res) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
    };
    console.log("mailOptions: ", mailOptions);

    mailgun.messages().send(mailOptions, (error, body) => {
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
            response: body.message,
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

    return mailgun.messages().send(mailOptions, (error, body) => {
        if (error) {
            console.log("Error: ", error);
            return res.status(400).json({
                message: "Email successfully sent!",
                success: true,
            });
        }

        return res.status(200).json({
            message: "Email successfully sent!",
            response: body.message,
            success: true,
        });
    });
};

exports.sendPlainText = sendPlainText;
exports.sendHTML = sendHTML;