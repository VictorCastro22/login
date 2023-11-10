const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // Usando a variável de ambiente PORT ou padrão 3000

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/users', (req, res) => {
    // Certifique-se de que o conteúdo retornado é um JSON válido
    const users = {
        "usuario": {
            "password": "senha",
            "dashboard": "/dashboard/usuario"
        },
        "annacaroline": {
            "password": "10012005",
            "dashboard": "/dashboard/annacaroline"
        }
        // Adicione outros usuários conforme necessário
    };

    console.log('Users:', users);
    res.json(users);
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    if (users[username] && users[username].password === password) {
        res.json({ success: true, redirect: `/dashboard/${username}` });
    } else {
        res.json({ success: false });
    }
});

app.get('/dashboard/:username', (req, res) => {
    const username = req.params.username;
    res.sendFile(path.join(__dirname, `views/dashboard/${username}.html`));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
