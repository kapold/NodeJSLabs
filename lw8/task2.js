const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

const secretKey = 'mySecretKey';
const users = JSON.parse(fs.readFileSync('usersJWT.json', 'utf8'));

function createAccessToken(user) {
    return jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '10m' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).send('Требуется авторизация');

    jwt.verify(token, secretKey, (err, user) => {
        if (err)
            return res.status(403).send('Невалидный токен');
        req.user = user;
        next();
    });
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(users);
    const user = users.find(u => u.username === username && u.password === password);
    console.log("User: " + user);
    if (user) {
        const accessToken = createAccessToken(user);
        res.json({ accessToken });
    } else {
        res.status(401).send('Неправильный логин или пароль');
    }
});

app.get('/profile', authenticateToken, (req, res) => {
    res.json(req.user);
});

app.use((req, res) => {
    res.status(404).send('Страница не найдена [404]');
});

app.listen(port, () => {
    console.log(`Приложение запущено на порту ${port}`);
});