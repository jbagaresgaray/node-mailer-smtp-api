require("dotenv").config();

const express = require("express");
const mailer = require("./mailer");
const mailgun = require("./mailgun");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-html", (req, res) => {
    console.log("SEND email in HTML format");
    const { to, subject, message } = req.body;

    mailer.sendHTML(to, subject, message, res);
});

app.post("/send-text", (req, res) => {
    console.log("SEND email in TEXT format");
    const { to, subject, message } = req.body;

    mailer.sendPlainText(to, subject, message, res);
});

app.post("/mailgun-html", (req, res) => {
    console.log("SEND mailgun email in HTML format");
    const { to, subject, message } = req.body;

    mailgun.sendHTML(to, subject, message, res);
});

app.post("/mailgun-text", async(req, res) => {
    console.log("SEND mailgun email in TEXT format");
    const { to, subject, message } = req.body;
    mailgun.sendPlainText(to, subject, message, res);
});

app.listen(process.env.NODE_PORT || 3000, () => {
    console.log("Server running on port 3000");
});