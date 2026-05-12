// ==========================================
// CONFIGURAÇÕES GERAIS (AGRÔNOMO DIGITAL)
// ==========================================
const CICLOS_CULTURA = {
    "ALFACE": 45,
    "TOMATE": 90,
    "CENOURA": 100,
    "COUVE": 70
};

function formatarDataBR(objetoData) {
    const dia = String(objetoData.getDate()).padStart(2, '0');
    const mes = String(objetoData.getMonth() + 1).padStart(2, '0');
    const ano = objetoData.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function gerenciarFoco(novaTela) {
    const titulo = novaTela.querySelector('h1, h2');
    if (titulo) {
        titulo.setAttribute('tabindex', '-1');
        titulo.focus();
    }
}

// ==========================================
// ESCOPO: TELA PRINCIPAL / DASHBOARD (index.html)
// ==========================================
const formLogin = document.getElementById('form-login');
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');

if (formLogin && loginScreen && dashboardScreen) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Alterna visibilidade e acessibilidade das telas
        loginScreen.classList.add('hidden');
        loginScreen.setAttribute('aria-hidden', 'true');
        dashboardScreen.classList.remove('hidden');
        dashboardScreen.removeAttribute('aria-hidden');

        // 2. Carrega listagem dinâmica do LocalStorage
        if (typeof carregarPlantiosNoDash === 'function') {
            carregarPlantiosNoDash();
        }

        // 3. Gerencia acessibilidade do leitor de tela para o Seu João
        gerenciarFoco(dashboardScreen);
    });
}

// ==========================================
// ESCOPO: CADASTRO DE PLANTIO (novo-plantio.html)
// ==========================================
const formPlantio = document.getElementById('formPlantio');

if (formPlantio) {
    formPlantio.addEventListener('submit', function(event) {
        event.preventDefault();

        const culturaSelect = document.getElementById('cultura').value;
        const areaInput = document.getElementById('area').value;
        const dataInput = document.getElementById('data_plantio').value;

        // Tratamento da data para evitar quebras por fuso horário local
        const partesData = dataInput.split('-');
        const dataPlantio = new Date(partesData[0], partesData[1] - 1, partesData[2]);
        const dataColheita = new Date(dataPlantio);

        // Resgata o ciclo específico da planta selecionada
        const diasAteColheita = CICLOS_CULTURA[culturaSelect.toUpperCase()] || 0;
        dataColheita.setDate(dataPlantio.getDate() + diasAteColheita);

        const dataPlantioBR = formatarDataBR(dataPlantio);
        const dataColheitaBR = formatarDataBR(dataColheita);

        // Cria o objeto estruturado com todos os parâmetros exigidos pelas Sprints 1 e 2
        const novoPlantio = {
            cultura: culturaSelect.toUpperCase(),
            area: areaInput,
            data: dataPlantioBR,
            colheita: dataColheitaBR
        };

        // Salva preservando o histórico existente no banco do navegador
        const listaAtual = JSON.parse(localStorage.getItem('meusPlantios')) || [];
        listaAtual.push(novoPlantio);
        localStorage.setItem('meusPlantios', JSON.stringify(listaAtual));

        alert("Plantio cadastrado com sucesso!");
        window.location.href = "index.html?logado=true"; 
    });
}
