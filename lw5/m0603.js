const nodemailer = require('nodemailer');

function send(from, password, to, message) {
    let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: from,
            pass: password
        }
    });

    let mailOptions = {
        from: from,
        to: to,
        subject: 'Message from m0603 module',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: %s', info.messageId);
        }
    });
}

module.exports = { send };