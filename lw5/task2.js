const express = require('express');
const nodemailer = require('nodemailer');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/task2.html');
});

app.post('/send', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: 'example@mail',
            // пароль нужно генерить в почте отдельно для сторонних приложений
            pass: 'some password'
        }
    });

    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error: Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
}).listen(3000, () => {
    console.log('Server started on port http://localhost:3000');
});
