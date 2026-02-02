async function buscarClima() {
    const cidade = document.getElementById('cidadeInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;

    // Elementos da tela
    const elementoErro = document.getElementById('mensagemErro');
    const elementoResultado = document.getElementById('resultado');

    // 1. RESET: Esconde tudo antes de começar a busca
    elementoErro.classList.add('escondido');
    elementoResultado.classList.add('escondido');

    try {
        const resposta = await fetch(url);
        
        // Se a API retornar erro (ex: 404), forçamos o erro aqui
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }

        const dados = await resposta.json();
        exibirClima(dados); // Se deu tudo certo, mostra o clima
        
    } catch (erro) {
        // 2. ERRO: Se falhar, mostra a mensagem vermelha
        elementoErro.classList.remove('escondido');
        console.error("Erro na busca:", erro.message);
    }
}

function exibirClima(dados) {
    document.getElementById('nomeCidade').innerText = dados.name;
    document.getElementById('temperatura').innerText = `${Math.round(dados.main.temp)}°C`;
    document.getElementById('descricao').innerText = dados.weather[0].description;
    document.getElementById('umidade').innerText = `${dados.main.humidity}%`;
    
    const iconCode = dados.weather[0].icon;
    document.getElementById('iconeClima').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Mostra o cartão de resultado
    document.getElementById('resultado').classList.remove('escondido');
}

// Faz o "Enter" funcionar
document.getElementById('cidadeInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        buscarClima();
    }
});