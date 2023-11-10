const mode = document.getElementById('mode_icon');

mode.addEventListener('click', () => {
    const form = document.getElementById('login_form');

    if(mode.classList.contains('fa-moon')) {
        mode.classList.remove('fa-moon');
        mode.classList.add('fa-sun');

        form.classList.add('dark');
        return ;
    }
    
    mode.classList.remove('fa-sun');
    mode.classList.add('fa-moon');

    form.classList.remove('dark');
});


document.getElementById('login_form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    try {
        // Realize uma solicitação assíncrona ao servidor para obter os dados dos usuários
        const response = await fetch('/users'); // Modifique a rota conforme necessário
        const users = await response.json();

        // Aqui, você precisaria fazer uma solicitação ao servidor para verificar o nome de usuário e senha.
        // Vou simular isso com um exemplo simples.
        if (users[username] && users[username].password === password) {
            // Login bem-sucedido, redirecione para a página do usuário.
            window.location.href = `views/dashboard/${username}.html`;
        } else {
            // Login falhou, você pode mostrar uma mensagem de erro aqui.
            alert('Login falhou. Verifique seu nome de usuário e senha.');
        }
    } catch (error) {
        console.error('Erro ao obter dados de usuários:', error);
    }
});
