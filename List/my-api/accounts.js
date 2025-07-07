const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');


const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('❌ Lỗi đọc file:', err);
        return [];
    }
};

const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: '❌Tài khoản đã tồn tại!' });
    }

    users.push({ username, password });
    writeUsers(users);

    res.json({ message: '✅Đăng ký thành công!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});