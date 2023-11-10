const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Rota para fornecer dados de usuários
app.get('/users', (req, res) => {
    res.json({
        "usuario": {
            "password": "senha",
            "dashboard": "/dashboard/usuario"
        },
        "annacaroline": {
            "password": "10012005",
            "dashboard": "/dashboard/annacaroline"
        }
        // Adicione outros usuários conforme necessário
    });
});

// Rota para lidar com a tentativa de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulação da autenticação, substitua por uma lógica segura no ambiente de produção
    const users = {
        "usuario": { "password": "senha", "dashboard": "/dashboard/usuario" },
        "annacaroline": { "password": "10012005", "dashboard": "/dashboard/annacaroline" }
        // Adicione outros usuários conforme necessário
    };

    if (users[username] && users[username].password === password) {
        res.json({ success: true, redirect: users[username].dashboard });
    } else {
        res.json({ success: false });
    }
});

// Rota para lidar com o redirecionamento para o dashboard
app.get('/dashboard/:username', (req, res) => {
    const username = req.params.username;
    res.sendFile(path.join(__dirname, `views/dashboard/${username}.html`));
});

// Rota padrão, envia o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

