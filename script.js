// Seleção de Elementos
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // 1. Esconde a tela de login
    loginScreen.classList.add('hidden');
    loginScreen.setAttribute('aria-hidden', 'true');

    // 2. Mostra a tela de Dashboard
    dashboardScreen.classList.remove('hidden');
    dashboardScreen.setAttribute('aria-hidden', 'false');

    console.log("Login realizado com sucesso! Bem-vindo, Seu João.");
});

function gerenciarFoco(novaTela) {
    const titulo = novaTela.querySelector('h1, h2');
    if (titulo) {
        titulo.setAttribute('tabindex', '-1');
        titulo.focus();
    }
}

// Chamar a função de foco após o login
formLogin.addEventListener('submit', () => gerenciarFoco(dashboardScreen));

const form = document.getElementById('formPlantio');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Pega os valores
    const cultura = document.getElementById('cultura').value;
    const area = document.getElementById('area').value;
    const data = document.getElementById('data_plantio').value;

    // 2. Cria o objeto do novo plantio
    const novoPlantio = {
        cultura: cultura.toUpperCase(),
        area: area,
        data: data.split('-').reverse().join('/')
    };

    // 3. Salva no LocalStorage (pega o que já tem ou cria lista vazia)
    const listaAtual = JSON.parse(localStorage.getItem('meusPlantios')) || [];
    listaAtual.push(novoPlantio);
    localStorage.setItem('meusPlantios', JSON.stringify(listaAtual));

    // 4. Redireciona para o index para ver o resultado
    alert("Plantio cadastrado com sucesso!");
    window.location.href = "index.html"; 
});
