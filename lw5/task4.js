// 1. Регаемся на  http://npmjs.com
// 2. После создания модуля пишем 'npm init' и заполняем данные о пакете
// 3. Пишем 'npm login <nickname>' и входим в учетку
// 4. Пишем 'npm publish' и вуаля, пакет в npm
// 5. npm install
// 6. npm uninstall
// 7. To install the m0603 package to the global repository, you can run the npm install -g
//    command in the terminal from the package's root directory. This will install the package globally
//    and make it available for use in any application.

const m0603 = require('m0603_adam');

const fromEmail = 'from email';
const toEmail = 'to email';
const password = 'password';

m0603.send(fromEmail, password, toEmail,  'Hello!');