const m0603 = require('./m0603');

const fromEmail = 'your email';
const toEmail = 'to email';
const password = 'password from your email';

m0603.send(fromEmail, password, toEmail,  'Hello from m0603 module!');