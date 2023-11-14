const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://login-pearl-chi.vercel.app',
    optionsSuccessStatus: 200
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cors(corsOptions));
app.options('*', cors());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = {
        "usuario": {
            "password": "senha",
            "dashboard": "views/dashboard/usuario.html"
        },
        "annacaroline": {
            "password": "10012005",
            "dashboard": "/dashboard/annacaroline"
        }
    };
    if (users[username] && users[username].password === password) {
        res.json({ success: true, redirect: users[username].dashboard });
    } else {
        res.status(999).json({ success: false, req: req });
    }
});

// Ajuste da rota /dashboard/:username
app.get('/dashboard/:username', (req, res) => {
    const username = req.params.username;
    const filePath = path.join(__dirname, `views/dashboard/${username}.html`);

    // Verifica se o arquivo HTML existe
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Página não encontrada');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running onhttps://login-pearl-chi.vercel.app:${port}`);
});
