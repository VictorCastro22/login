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

const loginForm = document.getElementById('login_form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    // Fazer a solicitação POST para o servidor
    fetch('https://login-pearl-chi.vercel.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Lógica de tratamento da resposta
        if (data.success) {
            // Redirecionar para a página do usuário
            window.location.href = data.redirect;
        } else {
            console.error('Erro ao fazer login:', data);
            // Adicionar lógica para lidar com falha no login
        }
    })
    .catch(error => console.error('Erro ao enviar solicitação de login:', error));
});

