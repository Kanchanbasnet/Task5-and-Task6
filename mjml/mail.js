const nodemailer = require("nodemailer");
const dotenv = require('dotenv');


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dimitri.gleason@ethereal.email',
        pass: 'h1xwRhhBrKZ6KzgCVs'
    }
});

module.exports = transporter


